#!/usr/bin/env node
/**
 * Récupère la note, le nombre d'avis et les derniers avis Google des deux agences
 * via l'API Google Places (New) et écrit src/data/avis-google.json.
 *
 * - Clé API : variable GOOGLE_PLACES_API_KEY (fichier .env local, jamais commité, ou variable
 *   d'environnement du projet Vercel). La clé n'est utilisée qu'au build : elle n'atteint jamais le navigateur.
 * - Identifiants des fiches (Place ID) et liens « laisser un avis » : src/data/google-fiches.json.
 * - Google ne renvoie que 5 avis par fiche par ce canal ; les autres verbatims se recopient dans
 *   `avisManuels` (src/data/avis.ts).
 * - Sans clé ou en cas d'erreur, le JSON déjà présent est conservé : le build n'échoue jamais.
 *
 * Usage :
 *   npm run avis                                     → met à jour src/data/avis-google.json
 *   node scripts/fetch-avis.mjs --find "LUZ Jonzac"  → cherche le Place ID d'une fiche
 *   (lancé automatiquement avant `npm run build` par le script npm "prebuild")
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const SITE = dirname(dirname(fileURLToPath(import.meta.url)));
const CONFIG_FILE = join(SITE, 'src/data/google-fiches.json');
const OUT_FILE = join(SITE, 'src/data/avis-google.json');
const API = 'https://places.googleapis.com/v1';
const DETAILS_MASK = 'id,displayName,rating,userRatingCount,googleMapsUri,googleMapsLinks,reviews';
const TIMEOUT_MS = 15_000;

/** Charge un fichier .env minimal (KEY=value, guillemets optionnels) sans écraser l'environnement existant. */
export function loadDotEnv(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!m) continue;
    let value = m[2];
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = value;
  }
}

/** Transforme la réponse « Place Details » de l'API en données prêtes pour le site. */
export function normalizePlace(slug, place) {
  const avis = (place.reviews ?? [])
    .filter((r) => typeof r.text?.text === 'string' && r.text.text.trim() !== '')
    .map((r) => ({
      id: r.name ?? null,
      auteur: r.authorAttribution?.displayName?.trim() || 'Client Google',
      note: Math.min(5, Math.max(1, Math.round(Number(r.rating) || 5))),
      date: r.publishTime ?? null,
      texte: r.text.text.trim(),
      agence: slug,
      source: 'google',
      url: r.googleMapsUri ?? null,
    }))
    .filter((a) => a.date)
    .sort((a, b) => b.date.localeCompare(a.date));

  return {
    placeId: place.id ?? null,
    nom: place.displayName?.text ?? null,
    note: typeof place.rating === 'number' ? place.rating : null,
    nombre: typeof place.userRatingCount === 'number' ? place.userRatingCount : null,
    url: place.googleMapsUri ?? null,
    writeAReviewUrl: place.googleMapsLinks?.writeAReviewUri ?? null,
    avis,
  };
}

async function callApi(path, { key, mask, body }) {
  const res = await fetch(`${API}${path}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': mask,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json?.error?.message ?? res.statusText;
    throw new Error(`HTTP ${res.status} — ${msg}`);
  }
  return json;
}

async function findPlaces(key, query) {
  const json = await callApi('/places:searchText', {
    key,
    mask: 'places.id,places.displayName,places.formattedAddress',
    body: { textQuery: query, languageCode: 'fr', regionCode: 'FR', pageSize: 5 },
  });
  const places = json.places ?? [];
  if (places.length === 0) {
    console.log(`Aucune fiche trouvée pour « ${query} ».`);
    return;
  }
  console.log(`Fiches trouvées pour « ${query} » :\n`);
  for (const p of places) {
    console.log(`  ${p.displayName?.text ?? '(sans nom)'}\n  ${p.formattedAddress ?? ''}\n  placeId : ${p.id}\n`);
  }
  console.log('→ Copier le placeId de la bonne fiche dans src/data/google-fiches.json');
}

async function fetchAll(key) {
  const config = JSON.parse(readFileSync(CONFIG_FILE, 'utf8'));
  const previous = existsSync(OUT_FILE) ? JSON.parse(readFileSync(OUT_FILE, 'utf8')) : { fiches: {} };
  const slugs = ['jonzac', 'royan'].filter((s) => config[s]?.placeId);
  if (slugs.length === 0) {
    console.log('[avis] Aucun placeId renseigné dans src/data/google-fiches.json : rien à récupérer.');
    return { ok: true, changed: false };
  }

  const fiches = { ...(previous.fiches ?? {}) };
  let failures = 0;
  for (const slug of slugs) {
    const placeId = config[slug].placeId;
    try {
      const place = await callApi(`/places/${encodeURIComponent(placeId)}?languageCode=fr&regionCode=FR`, {
        key,
        mask: DETAILS_MASK,
      });
      fiches[slug] = normalizePlace(slug, place);
      console.log(
        `[avis] ${slug} : ${fiches[slug].nom ?? placeId} — ${fiches[slug].note ?? '?'}/5, ${fiches[slug].nombre ?? '?'} avis, ${fiches[slug].avis.length} verbatims`,
      );
    } catch (err) {
      failures++;
      console.warn(`[avis] ${slug} : échec (${err.message}) — données précédentes conservées.`);
    }
  }

  const out = {
    _doc: previous._doc ?? 'Fichier GÉNÉRÉ par `npm run avis` (scripts/fetch-avis.mjs) : ne pas éditer à la main.',
    fetchedAt: failures === slugs.length ? (previous.fetchedAt ?? null) : new Date().toISOString(),
    fiches,
  };
  writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + '\n');
  console.log(`[avis] Écrit ${OUT_FILE.replace(SITE + '/', '')}`);
  return { ok: failures === 0, changed: true };
}

async function main() {
  loadDotEnv(join(SITE, '.env'));
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const isBuildHook = process.env.npm_lifecycle_event === 'prebuild';
  const findIdx = process.argv.indexOf('--find');

  if (findIdx !== -1) {
    const query = process.argv.slice(findIdx + 1).join(' ').trim();
    if (!key) throw new Error('GOOGLE_PLACES_API_KEY manquante (fichier site/.env).');
    if (!query) throw new Error('Usage : node scripts/fetch-avis.mjs --find "nom de la fiche"');
    await findPlaces(key, query);
    return;
  }

  if (!key) {
    console.log('[avis] GOOGLE_PLACES_API_KEY absente : avis Google non actualisés (JSON existant conservé).');
    return;
  }

  const { ok } = await fetchAll(key);
  if (!ok && !isBuildHook) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(`[avis] ${err.message}`);
    // En prebuild, on ne fait jamais échouer le build : le site garde les avis déjà présents.
    if (process.env.npm_lifecycle_event !== 'prebuild') process.exitCode = 1;
  });
}

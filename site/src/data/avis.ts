/**
 * Avis clients — uniquement des avis Google réels, jamais d'avis inventé.
 *
 * Deux sources fusionnées ici :
 *  1. `avis-google.json` (GÉNÉRÉ par `npm run avis`, voir scripts/fetch-avis.mjs) : note, nombre d'avis
 *     et jusqu'à 5 avis par agence renvoyés par l'API Google Places. Regénéré avant chaque build
 *     si GOOGLE_PLACES_API_KEY est définie (fichier .env local ou variable d'environnement Vercel).
 *  2. `avisManuels` ci-dessous : verbatims recopiés à la main depuis les fiches Google (au-delà des 5 de l'API).
 *
 * Les Place ID et les liens courts « laisser un avis » se renseignent dans `google-fiches.json`.
 */
import google from './avis-google.json';
import config from './google-fiches.json';

export type AgenceSlug = 'jonzac' | 'royan';

export type Avis = {
  auteur: string;
  note: 1 | 2 | 3 | 4 | 5;
  date: string; // ISO
  texte: string;
  agence: AgenceSlug;
  source: 'google' | 'guest-suite';
  url?: string | null; // lien vers l'avis sur Google Maps
};

type FicheGeneree = {
  placeId: string | null;
  nom: string | null;
  note: number | null;
  nombre: number | null;
  url: string | null;
  writeAReviewUrl: string | null;
  avis: (Omit<Avis, 'note'> & { id: string | null; note: number })[];
};

const generees = (google as { fetchedAt: string | null; fiches: Partial<Record<AgenceSlug, FicheGeneree>> }).fiches;

const labels: Record<AgenceSlug, string> = { jonzac: 'Agence de Jonzac', royan: 'Agence de Royan' };

function fiche(slug: AgenceSlug) {
  const g = generees[slug];
  const c = config[slug];
  return {
    label: labels[slug],
    url: g?.url ?? '', // lien de la fiche Google Maps (« Voir les avis »)
    reviewUrl: c.reviewUrl || g?.writeAReviewUrl || '', // lien « laisser un avis » (boutons, QR codes)
    note: g?.note ?? null, // ex. 4.8
    nombre: g?.nombre ?? null, // ex. 57
  };
}

export const fichesGoogle: Record<AgenceSlug, ReturnType<typeof fiche>> = {
  jonzac: fiche('jonzac'),
  royan: fiche('royan'),
};

/** Date de la dernière récupération réussie (ISO) ou null. */
export const avisMisAJourLe: string | null = google.fetchedAt;

/**
 * Verbatims recopiés à la main depuis les fiches Google (auteur, note, date, texte, agence).
 * Utile pour mettre en avant des avis que l'API ne renvoie pas (elle se limite à 5 par fiche).
 */
export const avisManuels: Avis[] = [];

const avisGoogle: Avis[] = (['jonzac', 'royan'] as AgenceSlug[]).flatMap((slug) =>
  (generees[slug]?.avis ?? []).map((a) => ({
    auteur: a.auteur,
    note: Math.min(5, Math.max(1, Math.round(a.note))) as Avis['note'],
    date: a.date,
    texte: a.texte,
    agence: slug,
    source: 'google' as const,
    url: a.url ?? null,
  })),
);

// Fusion : un avis déjà renvoyé par l'API n'est pas dupliqué s'il est aussi recopié à la main (même auteur, même mois).
const cle = (a: Avis) => `${a.agence}|${a.auteur.toLowerCase()}|${a.date.slice(0, 7)}`;
const vus = new Set(avisGoogle.map(cle));
export const avis: Avis[] = [...avisGoogle, ...avisManuels.filter((a) => !vus.has(cle(a)))].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const guestSuiteWidgetId = ''; // identifiant du widget Guest-Suite si conservé

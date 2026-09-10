/**
 * Réception des demandes de devis / contact / dépannage.
 * - JSON (fetch depuis le site) → réponse JSON.
 * - Formulaire classique (sans JS) → redirection vers /devis/merci/.
 * Envoi par e-mail via SMTP si configuré (voir .env.example), sinon journalisation serveur.
 */
import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

const env = (key: string) => process.env[key] ?? (import.meta.env as Record<string, string | undefined>)[key];

const LABELS: Record<string, string> = {
  'fenetres-portes': 'Fenêtres & portes',
  'veranda-extension': 'Véranda / extension',
  'pergola-carport': 'Pergola / carport',
  'portail-cloture': 'Portail / clôture',
  'volets-garage': 'Volets / porte de garage',
  stores: 'Stores',
  'motorisation-alarme': 'Motorisation / alarme',
  depannage: 'Dépannage',
  autre: 'Autre',
  jonzac: 'Jonzac / Haute-Saintonge',
  royan: 'Royan / littoral / Oléron',
};

const clean = (v: unknown, max = 2000) => String(v ?? '').trim().slice(0, max);

export const POST: APIRoute = async ({ request, redirect, clientAddress }) => {
  const ct = request.headers.get('content-type') ?? '';
  const wantsJson = ct.includes('application/json') || request.headers.get('accept')?.includes('application/json');

  let raw: Record<string, unknown> = {};
  try {
    raw = ct.includes('application/json')
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());
  } catch {
    return wantsJson ? json({ ok: false, error: 'Requête invalide' }, 400) : redirect('/devis/', 303);
  }

  // Piège à robots : champ caché rempli → on fait semblant d'accepter.
  if (clean(raw.site_web)) return wantsJson ? json({ ok: true }) : redirect('/devis/merci/', 303);

  const data = {
    projet: LABELS[clean(raw.projet)] ?? clean(raw.projet) ?? 'Non précisé',
    secteur: LABELS[clean(raw.secteur)] ?? clean(raw.secteur) ?? 'Non précisé',
    nom: clean(raw.nom, 120),
    telephone: clean(raw.telephone, 40),
    email: clean(raw.email, 160),
    ville: clean(raw.ville, 120),
    message: clean(raw.message, 4000),
    consent: clean(raw.consent) === 'oui',
    page: clean(raw.page, 200) || request.headers.get('referer') || '',
  };

  const errors: string[] = [];
  if (data.nom.length < 2) errors.push('nom');
  if (!/^[+\d][\d\s().-]{6,}$/.test(data.telephone)) errors.push('telephone');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.push('email');
  if (!data.ville) errors.push('ville');
  if (!data.consent) errors.push('consent');
  if (errors.length) {
    return wantsJson ? json({ ok: false, error: `Champs invalides : ${errors.join(', ')}` }, 422) : redirect('/devis/?erreur=1', 303);
  }

  const subject = `[fenetresluz.com] ${data.projet} — ${data.nom} (${data.secteur})`;
  const text = [
    `Nouvelle demande depuis le site (${data.page || 'page inconnue'})`,
    '',
    `Projet     : ${data.projet}`,
    `Secteur    : ${data.secteur}`,
    `Nom        : ${data.nom}`,
    `Téléphone  : ${data.telephone}`,
    `E-mail     : ${data.email}`,
    `Commune    : ${data.ville}`,
    '',
    'Message :',
    data.message || '(vide)',
    '',
    `IP : ${clientAddress ?? 'n/a'} — ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`,
  ].join('\n');

  const host = env('SMTP_HOST');
  if (host) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port: Number(env('SMTP_PORT') ?? 587),
        secure: Number(env('SMTP_PORT') ?? 587) === 465,
        auth: env('SMTP_USER') ? { user: env('SMTP_USER')!, pass: env('SMTP_PASS') ?? '' } : undefined,
      });
      await transporter.sendMail({
        from: env('DEVIS_FROM') ?? env('SMTP_USER'),
        to: (env('DEVIS_TO') ?? 'contact@fenetresluz.com').split(',').map((s) => s.trim()),
        replyTo: `${data.nom} <${data.email}>`,
        subject,
        text,
      });
    } catch (err) {
      console.error('[devis] envoi SMTP impossible :', err);
      return wantsJson ? json({ ok: false, error: 'Envoi impossible pour le moment' }, 500) : redirect('/devis/?erreur=1', 303);
    }
  } else {
    console.log(`[devis] SMTP non configuré — demande journalisée :\n${text}`);
  }

  return wantsJson ? json({ ok: true }) : redirect('/devis/merci/', 303);
};

export const GET: APIRoute = () => json({ ok: false, error: 'Méthode non autorisée' }, 405);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });
}

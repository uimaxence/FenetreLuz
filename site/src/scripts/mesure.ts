/**
 * Consentement et mesure (Google Analytics + Google Ads, par la balise Google).
 * Rien n'est chargé ni transmis tant que le visiteur n'a pas accepté ; son choix est gardé dans le navigateur (localStorage).
 * La configuration vient de components/Consent.astro (script JSON #mesure-config).
 */

type Config = {
  tag: string;
  devis: string;
  depannage: string;
  tel: Record<string, string>;
  jours: number;
  cookie: number;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CLE = 'luz-consentement';
const REFUS = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' };
// Pas de reciblage publicitaire : ad_personalization reste refusé même après accord.
const ACCORD = { ...REFUS, ad_storage: 'granted', ad_user_data: 'granted', analytics_storage: 'granted' };

let config: Config | null = null;
let chargee = false; // balise injectée dans la page
let active = false; // le visiteur a donné son accord
let clicsSuivis = false;

function lireConfig(): Config | null {
  try {
    return JSON.parse(document.getElementById('mesure-config')?.textContent || 'null');
  } catch {
    return null;
  }
}

function lireChoix(jours: number): boolean | null {
  try {
    const c = JSON.parse(localStorage.getItem(CLE) || 'null');
    if (!c || typeof c.ok !== 'boolean' || Date.now() - c.t > jours * 864e5) return null;
    return c.ok;
  } catch {
    return null;
  }
}

function ecrireChoix(ok: boolean) {
  try {
    localStorage.setItem(CLE, JSON.stringify({ ok, t: Date.now() }));
  } catch {
    /* navigation privée : le bandeau reviendra à la page suivante */
  }
}

function gtag(...args: unknown[]) {
  window.gtag?.(...args);
}

function charger(c: Config) {
  if (active) return;
  active = true;
  if (chargee) {
    gtag('consent', 'update', ACCORD);
    return;
  }
  chargee = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // La balise Google attend l'objet `arguments`, pas un tableau.
    window.dataLayer!.push(arguments);
  };
  gtag('consent', 'default', ACCORD);
  gtag('js', new Date());
  gtag('config', c.tag, { cookie_expires: c.cookie });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(c.tag)}`;
  document.head.appendChild(s);
}

function retirer() {
  active = false;
  if (!chargee) return;
  gtag('consent', 'update', REFUS);
  // Efface les cookies déjà posés par Google sur ce domaine.
  const domaine = location.hostname.replace(/^www\./, '');
  document.cookie.split(';').forEach((c) => {
    const nom = c.split('=')[0].trim();
    if (!/^(_ga|_gcl_|_gac_)/.test(nom)) return;
    ['', `; domain=${location.hostname}`, `; domain=.${domaine}`].forEach((d) => {
      document.cookie = `${nom}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`;
    });
  });
}

/** Demande envoyée par un formulaire : `depannage` ou `devis`. */
export function suivreDemande(type: 'devis' | 'depannage') {
  if (!active || !config) return;
  gtag('event', 'conversion', { send_to: config[type] });
  gtag('event', 'generate_lead', { send_to: config.tag, type_demande: type });
}

function suivreClics() {
  if (clicsSuivis) return;
  clicsSuivis = true;
  document.addEventListener('click', (e) => {
    if (!active || !config) return;
    const a = (e.target as Element | null)?.closest?.('a[href^="tel:"]');
    if (!a) return;
    const numero = (a.getAttribute('href') || '').slice(4).replace(/\s/g, '');
    const libelle = config.tel[numero];
    if (libelle) gtag('event', 'conversion', { send_to: libelle });
    gtag('event', 'clic_telephone', { send_to: config.tag, numero });
  });
}

/** À appeler à chaque page (astro:page-load) : le bandeau et le pied de page sont redessinés à chaque navigation. */
export function initMesure() {
  config = lireConfig();
  if (!config) return;
  const c = config;
  const bandeau = document.querySelector<HTMLElement>('[data-consent]');
  const choix = lireChoix(c.jours);
  if (choix) charger(c);
  suivreClics();
  if (!bandeau) return;
  bandeau.hidden = choix !== null;

  const choisir = (ok: boolean) => {
    ecrireChoix(ok);
    if (ok) charger(c);
    else retirer();
    bandeau.hidden = true;
  };
  bandeau.querySelector('[data-consent-accept]')?.addEventListener('click', () => choisir(true));
  bandeau.querySelector('[data-consent-refuse]')?.addEventListener('click', () => choisir(false));
  document.querySelectorAll<HTMLElement>('[data-consent-open]').forEach((b) =>
    b.addEventListener('click', () => {
      bandeau.hidden = false;
      bandeau.querySelector<HTMLElement>('button')?.focus();
    }),
  );
}

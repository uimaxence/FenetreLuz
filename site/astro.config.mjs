// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import vercelRedirects from './src/integrations/vercelRedirects.mjs';

/**
 * Site vitrine Fenêtres & Vérandas LUZ
 * - Rendu statique (HTML généré au build) pour toutes les pages → SEO + performance.
 * - L'adaptateur Vercel ne sert qu'à la route API du formulaire (src/pages/api/devis.ts, prerender=false),
 *   déployée en fonction serverless. Le build écrit dans .vercel/output/ (Build Output API).
 * - `vercelRedirects` corrige les 301 de l'adaptateur incompatibles avec trailingSlash 'always' (voir src/integrations).
 */
export default defineConfig({
  site: 'https://www.fenetresluz.com',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  adapter: vercel(),
  integrations: [
    vercelRedirects(),
    sitemap({
      filter: (page) =>
        !page.includes('/api/') &&
        !page.includes('/mentions-legales/') &&
        !page.includes('/politique-confidentialite/') &&
        !page.includes('/devis/merci/') &&
        !page.includes('/v2/'), // proposition de refonte de l'accueil, non indexée
      changefreq: 'monthly',
      priority: 0.7,
      serialize(item) {
        if (item.url === 'https://www.fenetresluz.com/') item.priority = 1.0;
        else if (item.url.includes('/prestations/') || item.url.includes('/agences/')) item.priority = 0.9;
        else if (/\/(veranda|store|pergola|portail)-royan\//.test(item.url) || item.url.includes('/menuiserie-')) item.priority = 0.85;
        else if (item.url.includes('/realisations/') || item.url.includes('/conseils/')) item.priority = 0.6;
        return item;
      },
    }),
  ],
  // Redirections 301 depuis les URLs de l'ancien site WordPress (voir seo-luz.md §1)
  redirects: {
    '/menuiserie-alu-bois-pvc-royan/': { status: 301, destination: '/agences/royan/' },
    '/fenetres-portes/': { status: 301, destination: '/prestations/fenetres/' },
    '/portail-motorisation-entreprise-menuiserie/': { status: 301, destination: '/prestations/portails-clotures/' },
    '/verandas-pergolas/': { status: 301, destination: '/prestations/verandas-extensions/' },
    '/fermetures-volets/': { status: 301, destination: '/prestations/volets/' },
    '/alarmes-domotique/': { status: 301, destination: '/prestations/motorisation/' },
    '/demande-de-devis/': { status: 301, destination: '/devis/' },
  },
  image: {
    // Formats modernes générés au build par sharp
    responsiveStyles: true,
  },
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    // Préchargement au survol uniquement : la stratégie "viewport" téléchargeait toutes les pages liées visibles (~2 Mo sur l'accueil).
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});

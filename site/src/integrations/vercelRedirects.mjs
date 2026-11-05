/**
 * Ajuste la sortie générée par @astrojs/vercel (deux défauts des routes lorsque `trailingSlash: 'always'`, région de la fonction).
 *
 * 1. Redirections 301 : l'adaptateur émet une source sans slash final (`^/ancienne-url$`) alors que
 *    Vercel applique d'abord sa règle de normalisation 308 (`/ancienne-url` → `/ancienne-url/`) : la 301
 *    ne matche jamais et les anciennes URL WordPress finissent en 404.
 * 2. Cache des fichiers `/_astro/` : l'en-tête `cache-control: immutable` est placé après
 *    `handle: filesystem`, donc jamais appliqué aux fichiers statiques (servis en `max-age=0`).
 *
 * Ici, après l'écriture de `.vercel/output/config.json` par l'adaptateur (qui s'exécute toujours en premier), on :
 *   1. rend le slash final optionnel (`^/ancienne-url/?$`) ;
 *   2. place ces 301 en tête des routes, avant la normalisation 308 (un seul saut) ;
 *   3. remonte les routes d'en-têtes de cache avant `handle: filesystem` ;
 *   4. fait exécuter la fonction serveur (formulaire /api/devis/) à Paris (`cdg1`) au lieu de la région par défaut
 *      (`iad1`, États-Unis) : les demandes restent traitées en France.
 */
import { readFile, writeFile } from 'node:fs/promises';

const REGION = 'cdg1';

export default function vercelRedirects() {
  /** @type {URL} */
  let root;
  return {
    name: 'luz:vercel-redirects',
    hooks: {
      'astro:config:done': ({ config }) => {
        root = config.root;
      },
      'astro:build:done': async ({ logger }) => {
        const file = new URL('.vercel/output/config.json', root);
        let json;
        try {
          json = JSON.parse(await readFile(file, 'utf8'));
        } catch {
          return; // pas de sortie Vercel (autre adaptateur, build partiel…)
        }
        const routes = Array.isArray(json.routes) ? json.routes : [];
        const isRedirect = (r) =>
          r.status === 301 && r.headers?.Location && typeof r.src === 'string' && r.src !== '^/$';
        const isCache = (r) => r.continue === true && !r.dest && !r.status && r.headers?.['cache-control'];
        const redirects = routes.filter(isRedirect).map((r) => ({
          ...r,
          src: r.src.endsWith('/?$') ? r.src : r.src.replace(/\/?\$$/, '/?$'),
        }));
        const fsIndex = routes.findIndex((r) => r.handle === 'filesystem');
        const cache = routes.filter((r, i) => isCache(r) && i > fsIndex && fsIndex !== -1);
        if (redirects.length || cache.length) {
          json.routes = [...redirects, ...cache, ...routes.filter((r) => !isRedirect(r) && !cache.includes(r))];
          await writeFile(file, JSON.stringify(json, null, 2));
        }
        if (redirects.length) logger.info(`${redirects.length} redirection(s) 301 corrigée(s) (slash final optionnel, placées avant la normalisation 308)`);
        if (cache.length) logger.info(`${cache.length} règle(s) de cache remontée(s) avant handle: filesystem`);

        const fnFile = new URL('.vercel/output/functions/_render.func/.vc-config.json', root);
        try {
          const fn = JSON.parse(await readFile(fnFile, 'utf8'));
          fn.regions = [REGION];
          await writeFile(fnFile, JSON.stringify(fn, null, 2));
          logger.info(`fonction serveur déployée en région ${REGION}`);
        } catch {
          // pas de fonction serveur dans ce build
        }
      },
    },
  };
}

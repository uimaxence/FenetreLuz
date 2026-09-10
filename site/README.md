# Site Fenêtres & Vérandas LUZ — v1

Site vitrine SEO local (Jonzac, Royan, Charente-Maritime) construit avec **Astro 7** : HTML généré au build (rendu serveur statique, lisible par Google sans JavaScript), images optimisées par `sharp`, ~10 Ko de JavaScript pour les interactions.

## Démarrer

```bash
cd site
npm install
npm run dev        # http://localhost:4321
npm run build      # génère dist/ (client statique + serveur Node pour l'API du formulaire)
vercel build && vercel deploy --prebuilt   # aperçu déployé (astro preview n'est pas pris en charge par l'adaptateur Vercel)
npm run check      # vérification TypeScript / Astro
npm run photos     # (re)génère src/assets/photos depuis ../assets/PHOTOS SITE LUZ
```

Prérequis : Node ≥ 22.12, Python 3 + Pillow pour `npm run photos`.

## Stack et choix

| Sujet | Choix |
|---|---|
| Framework | Astro 7, `output: 'static'` — toutes les pages sont pré-rendues. Seule `/api/devis/` est servie par Node (`prerender = false`). |
| Adaptateur | `@astrojs/vercel` : pages statiques + `/api/devis/` en fonction serverless. Sur Vercel, régler **Root Directory = `site`** (sinon le `vercel.json` à la racine du dépôt prend le relais). Variables SMTP à déclarer dans le projet Vercel (voir `.env.example`). |
| Images | `astro:assets` (`<Picture>`), WebP + JPEG de secours, `srcset` multi-largeurs, lazy loading sauf LCP (`fetchpriority="high"`). Les sources sont normalisées à 2 200 px max et **sans EXIF** (GPS supprimé) par `scripts/prepare-photos.py`. |
| Polices | Auto-hébergées via Fontsource : Barlow Condensed 700 (titres), Barlow 500/600 (UI), Source Sans 3 variable (texte). Le mot-symbole « LUZ » est un tracé SVG (aucune police de logo à charger). |
| Styles | CSS natif, variables dans `src/styles/global.css`, styles scopés par composant. Palette dérivée du site actuel (vert profond `#154418`, citron `#D4DC3F`, CTA orange `#EE4E28`, logo `#009639`). |
| Navigation | `ClientRouter` (transitions de page), préchargement au survol/viewport. |
| Formulaires | `src/pages/api/devis.ts` : JSON (fetch) ou POST classique sans JS → redirection `/devis/merci/`. Envoi SMTP via `nodemailer` si `.env` renseigné (voir `.env.example`), sinon journalisation. Piège à robots sans cookie. |
| SEO | Titles/descriptions par page (gabarits `seo-luz.md` §6), canonical, Open Graph, JSON-LD (Organization, WebSite, HomeAndConstructionBusiness ×2, Service, FAQPage, BreadcrumbList, Article, ImageGallery), sitemap XML (`@astrojs/sitemap`), `robots.txt`, redirections 301 des anciennes URLs WordPress (`astro.config.mjs`). |

## Arborescence

```
site/
├── astro.config.mjs          site, sitemap, redirections 301, adaptateur
├── scripts/prepare-photos.py pipeline photos (mapping dossiers Élodie → slugs)
├── public/                   favicon, icônes, og-default.jpg, robots.txt
└── src/
    ├── assets/photos/        photos préparées (real/, equipe/, agences/)
    ├── assets/gen/           visuels générés (voir ../IMAGES-A-GENERER.md) — vide au départ
    ├── content/conseils/     articles Markdown (collection `conseils`)
    ├── data/                 contenu structuré : site, agences, prestations, villes, croisees,
    │                         realisations, marques, equipe, aides, avis, photos (accès typé)
    ├── components/           Header (méga-menus), Footer, Logo, Rays, Icon, PageHero, cartes, FAQ,
    │                         formulaire, TrustStrip, Steps, ReviewsBlock, Placeholder…
    ├── layouts/Base.astro    <head> SEO, JSON-LD, polices, scripts
    ├── pages/                routes (voir ci-dessous)
    ├── scripts/main.ts       interactions (reveal, compteurs, menus, filtres, formulaire, galerie)
    ├── integrations/vercelRedirects.mjs  corrige les 301 de l'adaptateur Vercel (slash final optionnel, avant la 308)
    └── styles/global.css     tokens, typographie, boutons, motifs rayons, animations
```

### Routes générées (92 pages)

- `/` — accueil
- `/prestations/` + 10 pages produit (`fenetres`, `portes-entree`, `verandas-extensions`, `pergolas`, `carports-pool-house`, `volets`, `portails-clotures`, `stores`, `motorisation`, `braseros`) ; `terrasses-bois` en brouillon (`draft: true`)
- `/depannage/`
- `/agences/jonzac/`, `/agences/royan/`
- `/menuiserie-saintes/`, `/menuiserie-cognac/`, `/menuiserie-ile-oleron/`
- `/veranda-royan/`, `/pergola-royan/`, `/portail-royan/`, `/store-royan/`
- `/realisations/` (filtres prestation × secteur, état dans l'URL) + 52 fiches chantier
- `/conseils/` + 5 articles
- `/aides-financement/`, `/avis/`, `/a-propos/`, `/marques-partenaires/`, `/partenariats-engagements/`
- `/devis/`, `/devis/merci/`, `/contact/`
- `/mentions-legales/`, `/politique-confidentialite/`, `/plan-du-site/`, `404`

## Modifier le contenu

- **Coordonnées, horaires, tarifs dépannage** : `src/data/site.ts`, `src/data/agences.ts`.
- **Une prestation** (textes, gammes, FAQ, photo de hero) : `src/data/prestations.ts`.
- **Un chantier** : ajouter les photos dans `assets/PHOTOS SITE LUZ/REALISATIONS …`, le mapping dans `scripts/prepare-photos.py`, lancer `npm run photos`, puis décrire le chantier dans `src/data/realisations.ts` (`photos` = nombre de photos).
- **Un article** : nouveau fichier `src/content/conseils/<slug>.md` avec le frontmatter des articles existants.
- **Avis Google** : `src/data/avis.ts` (liens des fiches + verbatims réels uniquement).
- **Visuels générés** : déposer `src/assets/gen/<id>.jpg` (identifiants et prompts dans `../IMAGES-A-GENERER.md`).
- **Logos officiels** : déposer les SVG/PNG dans `src/assets/logos/{certifications,marques,partenaires}/<id>.svg` (liste dans `../LOGOS-A-RECUPERER.md`) ; ils remplacent automatiquement les badges typographiques.

## Avant mise en ligne (rappel roadmap)

- Renseigner `.env` (SMTP) et tester l'envoi du formulaire.
- Compléter `/mentions-legales/` (Kbis, hébergeur, assurance) et `/politique-confidentialite/` (hébergeur).
- Renseigner les fiches Google (`src/data/avis.ts`) et les liens « laisser un avis ».
- Confirmer les horaires des deux agences, la raison sociale (`site.legalName`) et les textes des partenariats.
- Intégrer les logos HD des fabricants (page marques) et la photo d'Olivier Michaud.
- Ajouter GTM/GA4 avec bandeau de consentement si souhaité (non inclus volontairement dans la v1).
- Soumettre `sitemap-index.xml` dans Search Console après DNS.

# Roadmap — Refonte digitale Fenêtres & Vérandas LUZ

> **Instructions pour Claude Code**
> - Ce fichier est la source de vérité de l'avancement du projet.
> - Coche `[x]` une tâche dès qu'elle est terminée, ajoute une courte note en dessous si utile (ex. lien, décision prise, blocage).
> - Ne pas ajouter de dates. L'ordre des sections = ordre de priorité, mais des tâches de sections différentes peuvent avancer en parallèle.
> - Si une tâche fait apparaître une sous-tâche non prévue, l'ajouter à la bonne section plutôt que de créer une nouvelle section.
> - Ne jamais supprimer une tâche cochée : l'historique sert de journal de bord.

---

## 0. Cadrage & réception
- [x] Devis signé
- [x] Offre commerciale finalisée (site + SEO local + ads + budget média, transparence honoraires/média)
- [x] Dossier de contenu reçu de Benoît (zones, prestations, certifications, aides, coordonnées, légal, avis, logos)
- [ ] Virement reçu — confirmer réception du paiement annoncé par Benoît
- [ ] Récupérer et explorer l'ensemble du dossier Drive partagé (tous les sous-dossiers)

## 1. Contenu à finaliser
- [x] Trier les photos chantiers (Élodie) par service et par localisation
  > Fait — 95 photos triées en 52 chantiers (prestation + commune + fabricant) dans `site/scripts/prepare-photos.py` et `site/src/data/realisations.ts`. Photos redimensionnées et débarrassées des EXIF/GPS. 2 photos intérieures trop sombres écartées (coulissants Pons).
- [ ] Rédiger/valider les descriptifs de chantiers (courts textes par réalisation)
  > Rédigés (v1) dans `site/src/data/realisations.ts` à partir des noms de fichiers — à faire relire par Élodie/Benoît (coloris, gammes, communes).
- [x] Sélectionner les photos hero (accueil + pages prestations)
  > Fait — accueil : fondu enchaîné de 3 photos (pergola Oléron, maison charentaise Saint-Genis, double pergola jonzacais — la photo piscine au ciel gris a été écartée) ; fenêtres : longère d'Archiac ; portes : porte verte de Saujon ; pergolas : double pergola jonzacais ; portails : Étaules ; volets : maison de maître EHRET ; stores : store Hermès Royan ; carports : Royan ; motorisation : portail Semussac. Braseros sans photo (visuel à générer, voir `IMAGES-A-GENERER.md`).
- [ ] Récupérer les photos d'équipe
- [ ] Confirmer les horaires définitifs des deux agences avant mise en ligne (Benoît a indiqué qu'ils pouvaient évoluer)
- [x] Extraire les infos légales du Kbis (SIRET, forme juridique, RCS, capital)
  > Fait à partir de l'attestation INPI du 07/09/2026 : SARL FENETRES LUZ, capital 5 000 €, SIREN 533 386 132, SIRET siège …00039 (Saint-Germain-de-Lusignan) et Breuillet …00021, APE 4332A, immatriculation 21/07/2011, TVA FR42533386132. Intégré dans `site/src/data/site.ts`, /mentions-legales/ et le Schema Organization. À confirmer par Benoît : greffe du RCS (Saintes ?) et la mention « plus de 20 ans » (immatriculation en 2011, fonds acheté).
  > Le logo reçu s'écrit « TWIC » (et non TWIK) : le site suit l'orthographe du logo.
- [ ] Récupérer attestation RGE + contrat et logo assureur Generali
- [ ] Vérifier accès aux 2 fiches Google Business (Jonzac + Royan) pour lecture/exploitation des avis
- [ ] Récupérer infos financement ARKEA (conditions à afficher, mentions légales financement)
- [x] Rédiger les 3 à 5 articles /conseils/ avant le lancement (sujets et mots-clés cibles définis dans `seo-luz.md` §4 : aides fenêtres, prix véranda, prix pergola, choix PVC/alu/bois, remplacement fenêtre)
  > Fait — 5 articles rédigés dans `site/src/content/conseils/`. Les fourchettes de prix et les barèmes d'aides 2026 sont à faire valider par Benoît avant mise en ligne.
- [ ] Récupérer logos et contenus des partenariats locaux pour la page /partenariats-engagements/ : UBJ Jonzac-Barbezieux Rugby (photos maillots/panneaux ?), Lion's Club, festival des Eurochestries — demander à Benoît en quoi consiste chaque partenariat (texte court par partenaire)
  > Reçus : logo Eurochestries, photo terrain UBJ, photo Lions Club. Restent les textes de chaque partenariat et les logos UBJ / Lions Club.
- [x] Récupérer les logos fabricants en HD pour la page /marques-partenaires/ (MéO, Janneau, Concept Alu, HORIZAL, Soliso, EHRET, Vulcan, Somfy)
  > Reçus et intégrés (15 logos : 8 certifications/réseaux + 7 marques). Voir `LOGOS-A-RECUPERER.md` pour le statut détaillé et le reste à récupérer (ARKEA, UBJ, Lions Club, logo LUZ vectoriel).

## 2. Zones d'intervention & stratégie géographique
D'après la carte cantonale fournie par Benoît, 3 zones sont identifiées :
- **Zone historique Jonzac** (jaune) : canton de Jonzac + Les Trois Monts (Jonzac, Archiac, Saint-Germain-de-Lusignan, Montendre, Montguyon, Montlieu-la-Garde…)
- **Zone actuelle Royan** (rose) : cantons Royan, Saintonge Estuaire, Marennes, La Tremblade, Île d'Oléron, Saujon
- **Zone en développement** (orange) : cantons Saint-Porchaire, Chaniers, Thénac/Pons, et extension côté Charente (Cognac, Jarnac, Barbezieux-Saint-Hilaire, Châteauneuf-sur-Charente, Rouillac)

Tâches :
- [ ] Faire valider par Benoît la liste précise des communes par zone (la carte donne les cantons, pas la liste commune par commune)
- [ ] Prioriser les communes "cœur de zone" Jonzac pour les pages villes
- [ ] Prioriser les communes "cœur de zone" Royan pour les pages villes
- [ ] Lister les communes de la zone en développement à cibler en SEO (sans agence physique dans un premier temps — vocabulaire "intervient à" plutôt que "agence à")
- [x] Croiser cette liste avec le volume de recherche (DataForSEO) pour décider : pages villes dédiées vs page zone unique par secteur
  > Fait — voir `seo-luz.md` §2. Décision : pages dédiées pour Royan, Jonzac (agences), Saintes, Cognac, Oléron ; pas de pages pour les petites communes (volume nul), couvertes via pages agences + réalisations géolocalisées. Pattern gagnant : « menuiserie + ville ».

## 3. Architecture du site (arborescence)
- [x] Lister toutes les pages nécessaires : accueil, prestations (une par gamme/marque), zones/villes, avis, contact, financement, aides, mentions légales
  > Fait — ~30 pages au lancement, détail dans `seo-luz.md` §4.
- [x] Organiser la hiérarchie des prestations :
  > Fait — organisation **par produit** (pas par marque : aucune marque fournisseur n'a de volume de recherche grand public), marques mises en avant dans les pages comme preuve de qualité. Voir `seo-luz.md` §4.
  - Vérandas & extensions alu (Extanxia), pergolas bioclimatiques, carports, pool houses, auvents (Concept Alu)
  - Portes d'entrée, fenêtres, murs-rideaux bois/alu (MéO — Menuisier d'Excellence MéO)
  - Menuiseries PVC / alu / bois / acier, portes d'entrée, volets roulants et battants alu (Janneau — Menuisier Créateur Janneau)
  - Portails, clôtures, garde-corps, barrières de piscine (HORIZAL — portalier HORIZAL)
  - Stores extérieurs (bannes, pergolas stores, stores verticaux) et stores intérieurs (Soliso Europe — Expert Storiste Soliso Europe)
  - Volets battants alu (EHRET)
  - Braseros (Vulcan)
  - Terrasses bois (TWIK) — à prévoir, arrivée prochaine
  - Motorisations (Somfy, DEA…) pour portails/portes de garage
- [x] Définir le maillage interne zones × prestations
  > Fait — règles de maillage dans `seo-luz.md` §5 (les réalisations font le pont entre l'axe prestations et l'axe villes).
- [x] Préparer un schéma d'arborescence à présenter à Benoît
  > Fait — schéma complet dans `seo-luz.md` §4, avec tableau des choix structurants à faire valider.
- [x] Call de validation avec Benoît sur l'arborescence
  > Validée par e-mail (août 2026). Tous les points OK. Ajouts demandés par Benoît et intégrés dans `seo-luz.md` §4 : page /marques-partenaires/ (MéO, Janneau, Concept Alu) + page /partenariats-engagements/ (UBJ Jonzac-Barbezieux Rugby, Lion's Club, festival des Eurochestries). Benoît confirme le principe d'extension progressive des pages villes et produit × ville.

## 4. Direction artistique
- [x] Produire `direction-artistique-luz.md` (livré, voir fichier séparé)
- [ ] Faire valider la palette / typographie / ton avec Benoît et Élodie
- [x] Wireframes des gabarits clés : accueil, page prestation type, page ville, contact/devis
  > Remplacés par la v1 codée (`site/`) : les gabarits sont directement visibles dans le navigateur (`npm run dev`). DA appliquée : vert profond du site actuel + accent citron + CTA orange, motif rayons du logo revectorisé (fond de sections, puces, animation), mot-symbole LUZ vectorisé.

## 5. Développement du site
- [ ] Setup technique (stack, hébergement, nom de domaine — fenetresluz.com existant à vérifier/migrer)
  > Décision : le domaine fenetresluz.com est conservé (ancienneté + backlinks). Vérifier l'accès au registrar/DNS avec Benoît.
  > Stack livrée : Astro 7 (pages 100 % pré-rendues en HTML, adaptateur Vercel pour l'API du formulaire uniquement), projet dans `site/` (voir `site/README.md`). Hébergement : Vercel (dépôt GitHub `uimaxence/FenetreLuz`, Root Directory `site`). Reste : accès DNS et variables SMTP sur Vercel.
- [ ] Intégration du design validé
  > v1 intégrée (92 pages générées), en attente de validation DA par Benoît/Élodie (section 4). Captures et corrections faites sur desktop 1440 px et mobile 390 px.
- [x] Gabarit pages prestations (répété par marque/gamme)
  > `site/src/pages/prestations/[slug].astro` piloté par `src/data/prestations.ts` (10 pages publiées, terrasses-bois en brouillon).
- [x] Gabarit pages zones/villes
  > Agences (`/agences/[slug]/`, LocalBusiness), villes (`/menuiserie-[ville]/`) et pages croisées (`/[produit]-royan/`).
- [x] Formulaire de contact + demande de devis
  > Formulaire unique (projet + secteur + coordonnées, RGPD, anti-robot) sur /devis/, /contact/, /depannage/ et pages agences. Endpoint `/api/devis/` : envoi SMTP dès que `.env` est renseigné (sinon journalisation).
- [x] Intégration des avis Google (2 fiches)
  > En prod le 22 sept. 2026 : `site/scripts/fetch-avis.mjs` interroge l'API Places (New) (clé `GOOGLE_PLACES_API_KEY`, projet Cloud de Benoît) et écrit `src/data/avis-google.json` (note, nombre, 5 avis max par fiche) ; lancé par `npm run avis` et avant chaque build. Place ID des deux fiches dans `src/data/google-fiches.json` (Jonzac 4,8/153 avis, Royan 4,9/60 au 22 sept.). Reste : liens courts « laisser un avis » (§8) à coller dans `google-fiches.json`, verbatims supplémentaires dans `avisManuels` (`avis.ts`).
  > Bloc et page /avis/ prêts, aucun avis inventé : renseigner `site/src/data/avis.ts` (liens des fiches, note, verbatims réels) une fois l'accès aux fiches confirmé.
- [x] Page financement ARKEA
  > Section dédiée sur /aides-financement/ avec mentions légales crédit — conditions précises et exemple représentatif à récupérer (section 1).
- [x] Page /marques-partenaires/ (fabricants : MéO, Janneau, Concept Alu…)
  > Faite avec badges typographiques ; logos HD à intégrer dès réception.
- [x] Page /partenariats-engagements/ (UBJ Rugby, Lion's Club, Eurochestries)
  > Faite avec textes provisoires marqués « [À préciser] » et visuels à générer/récupérer.
- [x] Page aides (MaPrimeRénov', CEE, TVA réduite, éco-PTZ) avec mention "sous conditions d'éligibilité"
- [ ] Mentions légales / politique de confidentialité / cookies (RGPD)
  > Pages créées avec champs « [à compléter] » (Kbis, hébergeur, assurance). Aucun cookie déposé dans la v1 (pas de GA/GTM) : bandeau de consentement à ajouter seulement si le tracking est activé (section 10).

## 6. SEO technique & on-page
- [x] Collecte des volumes de recherche DataForSEO + stratégie SEO documentée (`seo-luz.md`)
  > Constat clé : le site actuel est quasi invisible (3 mots-clés, page 3) — refonte sans risque de perte, mais 301 à prévoir sur `/menuiserie-alu-bois-pvc-royan/`. Pic saisonnier confirmé en septembre.
- [x] Schema markup : LocalBusiness (x2 établissements), Service/Product, FAQ, Breadcrumb
  > Organization + WebSite (toutes pages), HomeAndConstructionBusiness ×2 (agences, contact), Service (prestations, villes, croisées), FAQPage, BreadcrumbList, Article (conseils), ImageGallery (réalisations).
- [x] Titles/meta descriptions optimisés par page (croisement zone × prestation)
  > Gabarits de `seo-luz.md` §6 appliqués dans les fichiers de données.
- [x] Maillage interne optimisé
  > Règles de `seo-luz.md` §5 : prestations → agences + croisées + réalisations + aides ; réalisations → prestation + page locale ; articles → prestation + CTA local ; fil d'Ariane partout.
- [ ] Audit vitesse / Core Web Vitals (Lighthouse via DataForSEO)
  > Premières mesures locales : accueil ~1 Mo desktop (dont hero 1 400 px), 22 Ko de JS, HTML 20 Ko gzip, polices auto-hébergées 94 Ko. Lighthouse à lancer sur l'URL de préproduction.
- [ ] Sitemap XML + robots.txt + soumission Search Console
  > `sitemap-index.xml` et `robots.txt` générés ; soumission Search Console après mise en ligne.
- [x] Plan de redirections 301 depuis les anciennes URLs (ne pas perdre le SEO existant)
  > 7 redirections dans `site/astro.config.mjs` (menuiserie-alu-bois-pvc-royan → /agences/royan/, fenetres-portes, portail-…, verandas-pergolas, fermetures-volets, alarmes-domotique, demande-de-devis). À compléter après crawl complet de l'ancien site.
- [x] Corriger les points d'audit déjà identifiés (contenu obsolète, contenu dupliqué fournisseur, Schema manquant, NAP incohérent, éléments de contact cassés)
  > Plus aucune mention « Parthenay » hors page À propos (historique), promo MéO 2023 supprimée, textes réécrits (pas de copier-coller fournisseur), NAP unique dans `site/src/data/agences.ts` et réutilisé partout (header, footer, pages, Schema).

## 7. Google Business Profile (2 fiches : Jonzac + Royan)
- [ ] Vérifier/compléter les catégories (principale + secondaires) sur chaque fiche
- [ ] Réécrire les descriptions des fiches (mots-clés locaux + prestations)
- [ ] Compléter tous les attributs pertinents
- [ ] Uniformiser le NAP (Nom / Adresse / Téléphone) avec le site et les annuaires
- [ ] Renseigner l'onglet Produits/Services avec les gammes proposées
- [ ] Définir une cadence de publication de posts GMB (chantiers, avis, actus)
- [ ] Actualiser les photos sur les 2 fiches (chantiers, équipe, locaux)
- [ ] Mettre en place un suivi mensuel des avis + réponse systématique à chaque avis
- [ ] Vérifier que les horaires (dont exceptions/jours fériés) sont à jour sur les 2 fiches

## 8. QR code avis Google
- [ ] Récupérer le lien court "laisser un avis Google" pour l'agence de Jonzac
- [ ] Récupérer le lien court "laisser un avis Google" pour l'agence de Royan
- [ ] Générer 2 QR codes (un par agence)
- [ ] Définir les supports d'affichage (comptoir agence, factures, véhicules, cartes de visite)

## 9. Annuaires & cohérence NAP
- [ ] Auditer la présence sur les annuaires : PagesJaunes, Mappy, Bing Places, Waze, Yelp, 118000, Kompass, Societe.com, Google Maps
- [ ] Lister les incohérences NAP trouvées (ancien nom, ancienne adresse, ancien téléphone, doublons)
- [ ] Mettre à jour/unifier chaque fiche annuaire
- [ ] Fusionner ou faire supprimer les doublons

## 10. Tracking & mesure de conversion
- [ ] Google Analytics 4 + Google Tag Manager
- [ ] Suivi des conversions (formulaire, clic téléphone, clic itinéraire)
- [ ] Google Search Console connectée
- [ ] Connexion des Insights GMB au reporting

## 11. Google Ads
- [ ] Structurer les campagnes par intention (urgence/réparation vs projet de rénovation), campagnes/groupes séparés
- [ ] Exclure/encadrer les mots-clés larges à risque (ex. "devis fenêtre" en requête large)
- [ ] Pages d'atterrissage dédiées par campagne
- [ ] Vérifier la séparation budget média / honoraires de gestion dans le suivi mensuel

## 12. Pré-lancement
- [ ] Relecture complète du contenu
- [ ] Tests des formulaires (devis, contact)
- [ ] Tests mobile / responsive
- [ ] Vérification légale (mentions, CGV, cookies, RGPD)
- [ ] Validation finale par Benoît

## 13. Lancement
- [ ] Mise en ligne — objectif avant le pic de recherche de septembre
- [ ] Soumission sitemap sur Search Console
- [ ] Annonce du lancement (réseaux sociaux, post GMB)

## 14. Suivi post-lancement
- [ ] Suivi mensuel des positions SEO
- [ ] Suivi mensuel de la performance Ads
- [ ] Point mensuel de reporting avec Benoît (offre Croissance)
- [ ] Itérations de contenu (nouveaux chantiers, avis, actualités)

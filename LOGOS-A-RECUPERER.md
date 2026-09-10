# Logos et fichiers à récupérer — Fenêtres & Vérandas LUZ

> Le site affiche aujourd'hui des badges typographiques homogènes. Dès qu'un logo est déposé au bon endroit avec le bon nom, il remplace automatiquement le badge (rebuild nécessaire).
>
> **Format** : SVG de préférence (vectoriel, net partout). Sinon PNG sur fond transparent, **au moins 800 px de large**. Pas de JPEG (fond blanc visible), pas de capture d'écran.
> **Droits** : demander le kit « revendeur / partenaire » du fabricant (les réseaux MéO, Janneau, HORIZAL, Soliso et Concept Alu en fournissent un aux installateurs agréés). Cela garantit la bonne version du logo et l'autorisation d'usage.

## Statut (7 septembre 2026)

**Reçus et intégrés** : certifications RGE, Qualibat, MéO (Menuisiers d'Excellence), Janneau (Menuisier Créateur), HORIZAL (Portaliers), Soliso (Experts Storistes), Concept Alu, Generali · marques EHRET, Soprofen, Gypass, Somfy, DEA, Vulcan, TWIC · partenaire Eurochestries.

**Encore attendus** : logos UBJ Jonzac-Barbezieux Rugby, Lions Club, ARKEA ; logos « produit » MéO, Janneau, Concept Alu, HORIZAL, Soliso (optionnel : la page marques utilise les logos réseau en attendant) ; logo LUZ vectoriel ; photo d'Olivier Michaud ; photos du bureau de Breuillet ; accès fiches Google ; attestations RGE et Generali ; conditions ARKEA ; horaires définitifs.

> Les fichiers se déposent dans `assets/logos/<dossier>/` à la racine (n'importe quel format) puis `npm run assets` dans `site/` les normalise (rognage des marges, PNG/SVG, renommage) vers `site/src/assets/logos/`.

## 1. Certifications et réseaux (bandeau de confiance)

Dossier : `site/src/assets/logos/certifications/`
Affichés sur : accueil, pages prestations, pages villes, page devis, à propos, contact.

| Fichier attendu | Logo | Remarque |
|---|---|---|
| `rge.svg` | RGE — Reconnu Garant de l'Environnement | Version « RGE Qualibat » si disponible (logo combiné officiel). Vérifier le numéro et la validité de la qualification pour les mentions légales. |
| `qualibat.svg` | Qualibat | Logo seul si RGE n'est pas combiné. |
| `meo.svg` | Menuisier d'Excellence MéO | Logo du réseau (pas seulement le logo MéO produit). |
| `janneau.svg` | Menuisier Créateur Janneau (JMC) | Logo du réseau. |
| `horizal.svg` | Portalier agréé HORIZAL | Logo « Portalier » / Les Portaliers. |
| `soliso.svg` | Expert Storiste Soliso Europe | Logo du réseau Experts Storistes. |
| `concept-alu.svg` | Concessionnaire Concept Alu | Logo concessionnaire. |
| `generali.svg` | Generali (assurance décennale) | Avec l'attestation d'assurance pour les mentions légales. |

## 2. Marques fabricants (page /marques-partenaires/ et pages prestations)

Dossier : `site/src/assets/logos/marques/`

| Fichier attendu | Marque | Où |
|---|---|---|
| `meo.svg` | MéO | Fenêtres, portes d'entrée |
| `janneau.svg` | Janneau | Fenêtres, portes, volets |
| `concept-alu.svg` | Concept Alu | Vérandas, pergolas, carports |
| `horizal.svg` | HORIZAL | Portails, clôtures, garde-corps |
| `soliso.svg` | Soliso Europe | Stores, pergolas toile |
| `ehret.svg` | EHRET | Volets battants |
| `soprofen.svg` | Soprofen | Volets roulants |
| `gypass.svg` | Gypass | Portes de garage |
| `somfy.svg` | Somfy | Motorisation, domotique, alarme |
| `dea.svg` | DEA System | Motorisation portails |
| `vulcan.svg` | Vulcan | Braseros |
| `twic.svg` | TWIC (« gentlemen poseurs ») | Terrasses bois (page en attente) — logo reçu, orthographe TWIC confirmée par le logo |

## 3. Partenariats locaux et financement

Dossier : `site/src/assets/logos/partenaires/`

| Fichier attendu | Partenaire | Où |
|---|---|---|
| `ubj-rugby.svg` | UBJ Jonzac-Barbezieux Rugby | Page partenariats |
| `lions-club.svg` | Lions Club (préciser le club) | Page partenariats |
| `eurochestries.svg` | Festival des Eurochestries | Page partenariats |
| `arkea.svg` | ARKEA (financement) | Page aides & financement |

Pour ces trois partenariats, récupérer aussi : une photo (maillots, panneau, affiche, événement) et deux phrases décrivant le partenariat (nature, depuis quand).

## 4. Autres fichiers indispensables

| Élément | Pourquoi |
|---|---|
| **Logo LUZ vectoriel** (PDF/AI/SVG) + version blanche | Remplacer le mot-symbole retracé par le logo officiel exact. |
| **Photo d'Olivier Michaud** (responsable Royan) | Page à propos, page agence de Royan (actuellement « photo à venir »). |
| **Photos intérieur du bureau/showroom de Breuillet** | Page agence de Royan. |
| **Accès aux 2 fiches Google Business** | Afficher les notes et avis réels (`site/src/data/avis.ts`), liens « laisser un avis » pour la page avis et les QR codes. |
| **Extrait Kbis** | Mentions légales (raison sociale, capital, RCS, SIRET, TVA). |
| **Attestation RGE / Qualibat et attestation Generali** | Mentions légales et réassurance. |
| **Conditions ARKEA** | Mentions légales financement et exemple représentatif. |
| **Horaires définitifs** des deux agences | Header, footer, pages agences, Schema LocalBusiness. |

## 5. Comment les intégrer

1. Déposer chaque fichier dans le dossier indiqué, avec le nom exact du tableau.
2. Lancer `npm run build` dans `site/` (ou `npm run dev` pour vérifier).
3. Aucune modification de code : `TrustStrip`, la page marques et la page partenariats détectent les fichiers.

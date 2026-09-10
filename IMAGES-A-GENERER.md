# Visuels à générer (IA) — prompts prêts à copier

> Le site utilise en priorité les **vraies photos de chantiers et d'équipe** (95 photos chantiers, 19 équipe, 2 agences, déjà intégrées).
> Les visuels ci-dessous comblent les manques : produits sans photo, illustrations d'articles, partenariats, ambiances locales.
>
> **Règles**
> - Un visuel généré sert d'ambiance ou d'illustration, **jamais de « réalisation LUZ »** : il n'entre pas dans la galerie /réalisations/.
> - Pas de texte, pas de logo, pas de visage net présenté comme un membre de l'équipe.
> - **Intégration** : déposer le fichier dans `site/src/assets/gen/` avec **exactement le nom indiqué** (`<id>.jpg` ou `.png`), puis rebuild. Le composant `Placeholder` détecte le fichier et remplace le bloc « Visuel à générer · id ». Aucune modification de code.
> - Format : JPEG qualité 85, **2000 px de large minimum**, ratio indiqué.

## Statut (7 septembre 2026)

**Reçus et intégrés (18)** : brasero-terrasse, terrasse-bois, partenariats-hero, partenariat-ubj-rugby, partenariat-lions-club, conseil-aides-fenetres, conseil-prix-veranda, conseil-prix-pergola, conseil-choisir-fenetres, conseil-remplacement-fenetre, volet-roulant-detail, porte-garage-sectionnelle, store-interieur-veranda, moustiquaire-baie, motorisation-portail-telecommande, alarme-domotique-tablette, pool-house-alu. Le fichier « partenariat-eurochestries » était le logo du festival : rangé dans les logos partenaires.

**Restants (optionnels)** : partenariat-eurochestries (photo), cloture-alu-lames, barriere-piscine-alu, mur-rideau-bois-alu, showroom-menuiseries, ambiance-saintes, ambiance-cognac, ambiance-oleron, aides-conseiller-devis, og-default-alt.

> Les fichiers se déposent dans `assets/PHOTOS SITE LUZ/` à la racine (jpg/png/webp, nom = identifiant) puis `npm run assets` dans `site/` les convertit vers `site/src/assets/gen/`.

## Style commun (déjà inclus dans chaque prompt)

Photographie éditoriale réaliste, lumière naturelle de fin d'après-midi, maison charentaise en pierre calcaire claire ou villa contemporaine du littoral atlantique, végétation légèrement désaturée (pour ne pas concurrencer le vert de marque), menuiseries aluminium anthracite (RAL 7016) ou blanches, 35 mm, profondeur de champ naturelle, aucun texte ni logo.

Prompt négatif à ajouter partout (Midjourney `--no`, Stable Diffusion « negative prompt ») :

```
text, letters, logo, watermark, signature, brand name, people faces, deformed hands, cartoon, illustration, oversaturated, HDR, fisheye, blurry
```

Paramètres conseillés : Midjourney `--ar 16:9 --style raw --v 7` (adapter `--ar` au ratio) ; Flux / Imagen / Ideogram : mode photo, ratio identique.

---

## 1. Visuels bloquants (emplacements actuellement en placeholder)

### `brasero-terrasse.jpg` — 16:9 (2400 × 1350) — hero de /prestations/braseros/

```
Editorial photograph of a black steel fire-pit plancha (brasero) in the center of a wooden deck terrace at dusk, warm glowing embers, grilled vegetables and a few glasses on the ring-shaped cooking plate, anthracite aluminium bioclimatic pergola softly out of focus in the background, limestone Charentaise house, golden hour light, no people in focus (silhouettes from behind acceptable), 35mm, shallow depth of field, realistic, no text, no logo --ar 16:9 --style raw
```

### `terrasse-bois.jpg` — 16:9 — hero de /prestations/terrasses-bois/ (page en brouillon, gamme TWIC)

```
Editorial photograph of a freshly installed grey-brown composite wood deck terrace extending from a large anthracite aluminium sliding glass door of a contemporary house in Charente-Maritime, garden and a bioclimatic pergola in the background, low raking late-afternoon sunlight, slightly desaturated greenery, 35mm, realistic, no people, no text --ar 16:9 --style raw
```

### `partenariats-hero.jpg` — 21:9 (2400 × 1030) — hero de /partenariats-engagements/

```
Wide editorial photograph of a small-town amateur rugby pitch in southwest France at sunset, white rugby posts, small wooden grandstand, blank advertising boards without any text, mown grass, warm local atmosphere, no people, 35mm, realistic --ar 21:9 --style raw
```

### `partenariat-ubj-rugby.jpg` — 4:3 — carte UBJ Jonzac-Barbezieux Rugby

```
Close-up editorial photograph of a rugby ball resting on the grass of a club pitch, white touchline, soft evening light, blurred goal posts in the background, no text on the ball, no logo, realistic --ar 4:3 --style raw
```
*(Remplacer par une vraie photo du club dès réception : bien meilleur.)*

### `partenariat-lions-club.jpg` — 4:3 — carte Lions Club

```
Editorial photograph of a community charity event in a village hall in France, two people shaking hands over a table with a donation box, warm ambient light, faces out of focus, no text, no logo, realistic --ar 4:3 --style raw
```

### `partenariat-eurochestries.jpg` — 4:3 — carte festival des Eurochestries

```
Editorial photograph of a youth string orchestra rehearsing inside a Romanesque limestone church in Saintonge, France, light passing through a stained-glass window, violins and cellos in the foreground, faces out of focus, no text, realistic --ar 4:3 --style raw
```

### `conseil-aides-fenetres.jpg` — 21:9 (cover) — article « Aides pour changer ses fenêtres »

```
Editorial photograph of a bright kitchen table with a printed quote document, a calculator and a cup of coffee, in the background a brand-new white PVC window open onto a garden, reassuring domestic atmosphere, soft daylight, no readable text on the paper, no logo, realistic --ar 21:9 --style raw
```

### `conseil-prix-veranda.jpg` — 21:9 — article « Prix d'une véranda »

```
Interior editorial photograph of a flat-roof aluminium veranda in anthracite grey attached to a limestone Charentaise house, light sofa, potted plants, view onto a garden, morning light through the glass roof with white interior blinds, no people, no text, realistic --ar 21:9 --style raw
```

### `conseil-prix-pergola.jpg` — 21:9 — article « Prix d'une pergola bioclimatique »

```
Low-angle editorial photograph of the adjustable louvered roof of an anthracite aluminium bioclimatic pergola, blue sky visible between the tilted slats, integrated LED strip lighting, corner of a terrace with a table, late afternoon sun, no people, no text, realistic --ar 21:9 --style raw
```

### `conseil-choisir-fenetres.jpg` — 21:9 — article « Fenêtres PVC, alu ou bois »

```
Macro editorial photograph of three window frame profile samples side by side on a showroom workbench: white PVC, anthracite aluminium and natural oak wood, materials clearly readable, soft studio daylight, shallow depth of field, no text, no logo, realistic --ar 21:9 --style raw
```

### `conseil-remplacement-fenetre.jpg` — 21:9 — article « Rénovation ou dépose totale »

```
Editorial photograph of a window installer seen from behind, neutral dark work clothes without logo, fitting a new white window into a thick limestone wall of an old French house, tools neatly on the floor, clean job site, daylight, face not visible, no text, realistic --ar 21:9 --style raw
```

---

## 2. Visuels recommandés (amélioreront des pages déjà illustrées par des photos réelles)

### `volet-roulant-detail.jpg` — 3:2 — section « Volets roulants » de /prestations/volets/

```
Editorial close-up photograph of an anthracite aluminium roller shutter half lowered over a white window, discreet exterior box, light rendered facade, afternoon shadows, no people, no text, realistic --ar 3:2 --style raw
```

### `porte-garage-sectionnelle.jpg` — 3:2 — section « Portes de garage »

```
Editorial photograph of a smooth anthracite sectional garage door with small square windows on a contemporary house, gravel driveway, end of day light, no cars, no people, no text, realistic --ar 3:2 --style raw
```

### `store-interieur-veranda.jpg` — 3:2 — section « Stores intérieurs » de /prestations/stores/

```
Interior editorial photograph of white pleated blinds under the glass roof of a veranda, filtered soft light, a few green plants slightly desaturated, calm atmosphere, no people, no text, realistic --ar 3:2 --style raw
```

### `moustiquaire-baie.jpg` — 3:2 — section « Moustiquaires »

```
Editorial photograph of a roll-up insect screen on an open aluminium sliding patio door, terrace and garden in the background, summer evening light, no people, no text, realistic --ar 3:2 --style raw
```

### `motorisation-portail-telecommande.jpg` — 16:9 — hero alternatif /prestations/motorisation/

```
Editorial photograph of a hand holding a small unbranded remote control in the foreground, an anthracite aluminium sliding gate opening in the background onto a gravel driveway and a limestone house, late afternoon, shallow depth of field, no text, no logo, realistic --ar 16:9 --style raw
```

### `alarme-domotique-tablette.jpg` — 3:2 — section « Domotique et alarme »

```
Editorial photograph of a wall-mounted home automation touch panel in a bright entrance hall showing generic icons for shutters, lighting and alarm without readable text, soft daylight, minimalist interior, no people, no logo, realistic --ar 3:2 --style raw
```

### `pool-house-alu.jpg` — 3:2 — section « Pool houses » de /prestations/carports-pool-house/

```
Editorial photograph of a flat-roof anthracite aluminium pool house with wooden cladding beside a family swimming pool, two sun loungers, clear sky, southwest France garden, no people, no text, realistic --ar 3:2 --style raw
```

### `cloture-alu-lames.jpg` — 3:2 — section « Clôtures » de /prestations/portails-clotures/

```
Editorial photograph of an anthracite aluminium fence with horizontal slats on a low white rendered wall, tamarisk hedge, coastal atmosphere near Royan, soft light, no people, no text, realistic --ar 3:2 --style raw
```

### `barriere-piscine-alu.jpg` — 3:2 — section « Barrières de piscine »

```
Editorial photograph of a white aluminium safety fence with a self-closing gate around a family swimming pool, lawn, summer daylight, no people, no text, realistic --ar 3:2 --style raw
```

### `mur-rideau-bois-alu.jpg` — 3:2 — section « Murs-rideaux » de /prestations/fenetres/

```
Interior editorial photograph of a contemporary house extension with a fully glazed facade, wood-interior aluminium-exterior curtain wall profiles, view from inside towards a garden, warm daylight, no people, no text, realistic --ar 3:2 --style raw
```

### `showroom-menuiseries.jpg` — 3:2 — bloc showroom, page agence de Royan

```
Editorial photograph of a bright window and door showroom: entrance doors and windows displayed on stands, light floor, clean modern space, no logos, no text, no people, realistic --ar 3:2 --style raw
```
*(À remplacer par une vraie photo du bureau de Breuillet dès que possible.)*

### `ambiance-saintes.jpg` — 16:9 — hero alternatif /menuiserie-saintes/

```
Editorial photograph of a quiet street of limestone houses in Saintes, France, grey aluminium swing shutters and white windows, morning light, no people, no text, realistic --ar 16:9 --style raw
```

### `ambiance-cognac.jpg` — 16:9 — hero alternatif /menuiserie-cognac/

```
Editorial photograph of a Charentais stone manor house in the middle of vineyards near Cognac, arched wooden entrance door, pale shutters, late summer light, no people, no text, realistic --ar 16:9 --style raw
```

### `ambiance-oleron.jpg` — 16:9 — hero alternatif /menuiserie-ile-oleron/

```
Editorial photograph of a white Oléron island house with blue shutters on a village lane, hollyhocks in bloom, bright coastal light, no people, no text, realistic --ar 16:9 --style raw
```

### `aides-conseiller-devis.jpg` — 16:9 — hero alternatif /aides-financement/

```
Editorial photograph of an advisor and a couple seen from behind looking at a quote on a showroom table, a display window in the background, warm daylight, faces not visible, no text, no logo, realistic --ar 16:9 --style raw
```

### `og-default-alt.jpg` — 1200 × 630 — image de partage alternative

```
Editorial photograph of a flat-roof anthracite aluminium veranda beside a swimming pool at golden hour, clear sky, empty space on the left third of the frame for a text overlay, no people, no text, realistic --ar 1.91:1 --style raw
```

---

## 3. À ne PAS générer (vraies photos ou fichiers indispensables)

Voir `LOGOS-A-RECUPERER.md` : logos officiels, portrait d'Olivier Michaud, photos du bureau de Breuillet, visuels réels des partenariats, logo LUZ vectoriel.

## 4. Où sont utilisés les identifiants dans le code

- `site/src/components/Placeholder.astro` : affiche `src/assets/gen/<id>.*` s'il existe, sinon le dégradé vert avec l'identifiant.
- Identifiants déclarés : `hero: { gen: '…' }` dans `src/data/prestations.ts`, `cover:` dans les articles `src/content/conseils/*.md`, `visuel:` dans `src/pages/partenariats-engagements.astro`.

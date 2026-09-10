import type { Faq } from './prestations';

/** Pages produit × ville (volume de recherche avéré : Royan uniquement au lancement). */
export type Croisee = {
  slug: string; // ex. veranda-royan
  produit: string; // libellé produit
  prestation: string; // slug prestation mère
  ville: 'Royan';
  agence: 'royan';
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  sections: { title: string; text: string[] }[];
  points: { title: string; text: string }[];
  realisations: string[];
  faq: Faq[];
  hero: { real: string; i?: number };
};

export const croisees: Croisee[] = [
  {
    slug: 'veranda-royan',
    produit: 'Véranda',
    prestation: 'verandas-extensions',
    ville: 'Royan',
    agence: 'royan',
    h1: 'Véranda à Royan : votre pièce en plus face à l’océan',
    metaTitle: 'Véranda à Royan — Installateur Concept Alu certifié RGE | LUZ Royan',
    metaDescription:
      'Véranda et extension aluminium à Royan, Saint-Georges-de-Didonne, Saint-Palais et Vaux-sur-Mer. Concessionnaire Concept Alu, conception 3D, pose par notre agence de Breuillet. Devis gratuit.',
    lead: 'À Royan et sur la Côte de Beauté, la véranda doit profiter de la lumière sans souffrir du vent et du sel. Notre agence de Breuillet conçoit et pose des vérandas et extensions Concept Alu adaptées au littoral.',
    sections: [
      {
        title: 'Une véranda pensée pour le climat royannais',
        text: [
          'Exposition sud-ouest, vent dominant, embruns : nous choisissons des profils aluminium laqués Qualimarine, des vitrages à contrôle solaire et des toitures isolées ou mixtes pour un confort réel en plein été. Stores de toiture, brise-soleil orientables et ventilation complètent l’ensemble.',
          'Sur les villas des années 50 de Royan comme sur les maisons de Saint-Georges-de-Didonne ou Vaux-sur-Mer, la gamme HOMEA à toit plat ou l’extension EXTANXIA s’intègrent avec sobriété. Nous préparons les documents pour la déclaration préalable ou le permis, y compris dans les secteurs soumis à l’avis de l’Architecte des Bâtiments de France.',
        ],
      },
      {
        title: 'Un interlocuteur local',
        text: [
          'Olivier Michaud, responsable de l’agence de Royan, vient chez vous pour l’étude, vous présente le projet en 3D et suit la pose réalisée par nos propres équipes. Le service après-vente est assuré depuis Breuillet.',
        ],
      },
    ],
    points: [
      { title: 'Alu Qualimarine', text: 'Laquage adapté au bord de mer, quincaillerie inox.' },
      { title: 'Confort d’été', text: 'Vitrages solaires, stores, BSO, ventilation.' },
      { title: 'Conception 3D', text: 'Vous visualisez la véranda sur votre maison avant de signer.' },
      { title: 'Pose LUZ', text: 'Équipes salariées, garantie décennale Generali.' },
    ],
    realisations: ['pergola-coulissants-verre-store-zip-pays-royannais', 'veranda-pergola-piscine-pays-jonzacais', 'extension-extanxia-toit-plat-pays-jonzacais', 'baie-vitree-alu-janneau-saujon'],
    faq: [
      { q: 'Quel est le prix d’une véranda à Royan ?', a: 'Comptez de 25 000 à 45 000 € posée pour une véranda de 15 à 20 m² avec toiture isolée ou mixte, hors dalle. Le chiffrage précis est établi après visite gratuite de notre agence de Breuillet.' },
      { q: 'Faut-il une autorisation à Royan ?', a: 'Oui : déclaration préalable jusqu’à 20 m² (40 m² en zone urbaine du PLU), permis de construire au-delà. Certains quartiers de Royan sont en site patrimonial remarquable : nous adaptons le projet aux prescriptions de l’ABF.' },
      { q: 'Peut-on voir une véranda avant de se décider ?', a: 'Une véranda Concept Alu est exposée dans notre showroom de Jonzac, et nous pouvons vous montrer des réalisations en pays royannais.' },
    ],
    hero: { real: 'pergola-coulissants-verre-store-zip-pays-royannais' },
  },
  {
    slug: 'pergola-royan',
    produit: 'Pergola bioclimatique',
    prestation: 'pergolas',
    ville: 'Royan',
    agence: 'royan',
    h1: 'Pergola bioclimatique à Royan',
    metaTitle: 'Pergola bioclimatique à Royan — Installateur certifié | LUZ Royan',
    metaDescription:
      'Pergola bioclimatique aluminium à Royan, Saint-Palais-sur-Mer, Saint-Georges-de-Didonne, La Tremblade : lames orientables, coulissants de verre, stores zip. Pose par notre agence de Breuillet. Devis gratuit.',
    lead: 'Profiter de la terrasse malgré le vent d’ouest et le soleil de plein été : la pergola bioclimatique est la réponse la plus demandée en pays royannais. Nous en avons posé des dizaines, de Meschers à La Tremblade.',
    sections: [
      {
        title: 'Lames orientables, coulissants de verre et stores zip',
        text: [
          'Sur la côte, la pergola est presque toujours fermée sur un ou deux côtés : coulissants de verre face au vent dominant pour garder la vue, stores verticaux zip screen pour l’intimité et le soleil rasant du soir. Les lames motorisées se ferment à la première goutte grâce au capteur de pluie et s’ouvrent automatiquement par grand vent.',
          'Anthracite (RAL 7016) pour les maisons contemporaines, blanc (RAL 9016) pour les villas royannaises : la structure Concept Alu est fabriquée sur mesure et posée par nos équipes, avec raccordement électrique des moteurs et des LED.',
        ],
      },
    ],
    points: [
      { title: 'Tenue au vent', text: 'Structures dimensionnées pour le littoral, anémomètre de sécurité.' },
      { title: 'Évolutive', text: 'Coulissants, stores, LED, chauffage ajoutables après coup.' },
      { title: 'Pergola exposée', text: 'À tester dans notre showroom de Jonzac.' },
      { title: 'Agence à Breuillet', text: 'Étude et suivi par Olivier Michaud.' },
    ],
    realisations: ['pergola-coulissants-verre-store-zip-pays-royannais', 'double-pergola-bioclimatique-pays-royannais', 'pergola-blanche-sur-mesure-pays-royannais', 'pergola-semussac', 'pergola-bioclimatique-ile-oleron'],
    faq: [
      { q: 'Quel prix pour une pergola bioclimatique à Royan ?', a: 'De 8 000 à 15 000 € posée pour 12 à 20 m² à lames motorisées, hors coulissants et stores. Devis gratuit après visite.' },
      { q: 'Une pergola résiste-t-elle aux tempêtes du littoral ?', a: 'Oui : fixations renforcées, lames qui s’ouvrent automatiquement au-delà d’un seuil de vent, stores zip qui se replient. Nos pergolas sont posées à Royan, Saint-Palais, Oléron et La Tremblade depuis des années.' },
    ],
    hero: { real: 'double-pergola-bioclimatique-pays-royannais' },
  },
  {
    slug: 'portail-royan',
    produit: 'Portail aluminium',
    prestation: 'portails-clotures',
    ville: 'Royan',
    agence: 'royan',
    h1: 'Portail aluminium à Royan',
    metaTitle: 'Portail alu à Royan — Portalier HORIZAL, motorisation, pose | LUZ Royan',
    metaDescription:
      'Portail aluminium battant ou coulissant HORIZAL à Royan, Vaux-sur-Mer, Saint-Palais, Breuillet et Saujon : laquage Qualimarine, motorisation Somfy / DEA, clôtures assorties. Devis gratuit.',
    lead: 'Un portail en bord de mer doit résister au sel avant tout. Portalier agréé HORIZAL, notre agence de Breuillet pose des portails aluminium assemblés sans soudure, laqués Qualimarine et motorisés, de Royan à La Tremblade.',
    sections: [
      {
        title: 'Le bon portail pour une entrée royannaise',
        text: [
          'Entrées en pente vers la rue, terrains étroits, haies de tamaris : le coulissant autoportant sans rail au sol est souvent la meilleure solution en pays royannais. Le battant reste pertinent pour les entrées planes, avec une motorisation enterrée invisible.',
          'Lames horizontales pour les maisons contemporaines de Vaux-sur-Mer, barreaudage classique pour les villas de Saint-Palais, tôle découpée au laser pour un motif unique : plus de 300 modèles HORIZAL, clôtures et portillons assortis. Nous avons posé à Breuillet, Vaux-sur-Mer, Saint-Palais-sur-Mer, Étaules et Semussac.',
        ],
      },
    ],
    points: [
      { title: 'Qualimarine', text: 'Laquage certifié pour l’exposition marine.' },
      { title: 'Sans soudure', text: 'Assemblage mécanique : pas de point de corrosion.' },
      { title: 'Motorisation', text: 'Somfy ou DEA, digicode, interphone, smartphone.' },
      { title: 'Maçonnerie', text: 'Piliers et seuils coordonnés avec nos partenaires.' },
    ],
    realisations: ['portail-portillon-horizal-vaux-sur-mer', 'portail-portillon-horizal-saint-palais-sur-mer', 'portail-alu-horizal-breuillet', 'portail-alu-horizal-etaules', 'portail-horizal-motorisation-integree-semussac'],
    faq: [
      { q: 'Combien coûte un portail alu à Royan ?', a: 'De 3 000 à 5 000 € posé pour un battant, de 4 500 à 8 000 € pour un coulissant motorisé sur mesure, hors maçonnerie. Devis gratuit.' },
      { q: 'Quel entretien pour un portail en bord de mer ?', a: 'Un rinçage à l’eau claire deux fois par an suffit pour un portail aluminium laqué Qualimarine. Pas de peinture, pas de traitement.' },
    ],
    hero: { real: 'portail-portillon-horizal-vaux-sur-mer' },
  },
  {
    slug: 'store-royan',
    produit: 'Store banne',
    prestation: 'stores',
    ville: 'Royan',
    agence: 'royan',
    h1: 'Store banne et stores extérieurs à Royan',
    metaTitle: 'Store banne à Royan — Storiste Soliso, pose & dépannage | LUZ Royan',
    metaDescription:
      'Store banne coffre, store vertical zip, moustiquaires et stores intérieurs à Royan, Saint-Georges-de-Didonne, Saint-Palais et Saujon. Expert Storiste Soliso, motorisation Somfy avec capteur vent. Devis gratuit.',
    lead: 'Ombre sur la terrasse à l’heure du déjeuner, toile à l’abri des embruns le reste du temps : à Royan, le store banne se choisit à coffre intégral et motorisé avec capteur de vent. Expert Storiste Soliso, notre agence de Breuillet vous conseille et pose.',
    sections: [
      {
        title: 'Stores conçus pour le littoral',
        text: [
          'Toiles acryliques teintées masse garanties contre la décoloration, coffre aluminium qui protège la toile repliée, bras renforcés et capteur de vent qui rentre le store automatiquement : c’est notre configuration de référence pour Royan, Saint-Georges-de-Didonne ou Saint-Palais-sur-Mer.',
          'Pour les terrasses exposées au vent, le store vertical zip screen est plus efficace qu’un store banne : sa toile guidée résiste aux rafales et filtre le soleil rasant de fin de journée sur la Côte de Beauté.',
        ],
      },
    ],
    points: [
      { title: 'Expert Storiste', text: 'Formé par Soliso, fabricant français depuis 1947.' },
      { title: 'Capteur vent', text: 'Indispensable sur le littoral, inclus dans nos motorisations.' },
      { title: 'Pose sur tout support', text: 'Pierre, parpaing, isolation extérieure, ossature bois.' },
      { title: 'Dépannage', text: 'Toiles, bras et moteurs remplacés sur tous stores.' },
    ],
    realisations: ['store-banne-hermes-royan', 'pergola-coulissants-verre-store-zip-pays-royannais', 'moustiquaires-enroulables-neuillac'],
    faq: [
      { q: 'Quel prix pour un store banne à Royan ?', a: 'De 1 500 à 3 500 € posé pour un store coffre motorisé de 4 à 5 m avec capteur vent, selon avancée et toile. Devis gratuit.' },
      { q: 'Réparez-vous les stores existants à Royan ?', a: 'Oui : changement de toile, de bras ou de moteur sur tous les stores, quelle que soit la marque. Voir notre service dépannage.' },
    ],
    hero: { real: 'store-banne-hermes-royan' },
  },
];

export const croiseeBySlug = (slug: string) => croisees.find((c) => c.slug === slug);

import type { Faq } from './prestations';

/** Pages villes hors agences (vocabulaire "intervient à"). Pattern SEO : « menuiserie + ville ». */
export type Ville = {
  slug: string; // /menuiserie-{slug}/
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  agence: 'jonzac' | 'royan'; // agence de rattachement
  distance: string;
  lead: string;
  paragraphs: string[];
  communes: string[];
  prestationsFocus: string[]; // slugs mis en avant
  realisations: string[]; // slugs de chantiers proches
  faq: Faq[];
  hero: { real: string; i?: number } | { gen: string };
};

export const villes: Ville[] = [
  {
    slug: 'saintes',
    name: 'Saintes',
    h1: 'Menuiserie à Saintes : fenêtres, vérandas, portails',
    metaTitle: 'Menuiserie à Saintes — Fenêtres, Vérandas, Portails | LUZ Saintes',
    metaDescription:
      'Fenêtres & Vérandas LUZ intervient à Saintes et en Saintonge : fenêtres PVC, alu, bois, portes d’entrée, vérandas, pergolas, portails et volets. Entreprise RGE, fabricants français, devis gratuit.',
    agence: 'jonzac',
    distance: '35 min de notre agence de Jonzac, 30 min de Royan',
    lead: 'Saintes et sa couronne sont desservies par nos deux agences. Maisons de pierre du centre ancien, pavillons des années 70 à rénover, constructions neuves : nous posons fenêtres, portes, vérandas, pergolas et portails dans toute la Saintonge.',
    paragraphs: [
      'À Saintes, une grande partie des demandes concerne le remplacement de fenêtres : bois vieillissant sur les maisons anciennes, simple vitrage sur les pavillons. Nous proposons des menuiseries PVC Janneau, aluminium ou bois-alu MéO selon le secteur, en tenant compte des prescriptions des Architectes des Bâtiments de France dans le périmètre protégé du centre-ville.',
      'Les vérandas et pergolas bioclimatiques Concept Alu sont la deuxième demande : nous avons posé plusieurs projets à Saintes, Chaniers, Fontcouverte ou Saint-Georges-des-Coteaux. Le métré, la conception 3D et la pose sont assurés par nos équipes salariées.',
      'Vous n’avez pas besoin de vous déplacer : un commercial LUZ vient chez vous, prend les cotes et établit le devis. Si vous souhaitez voir les produits, nos showrooms de Jonzac et de Breuillet sont à une demi-heure.',
    ],
    communes: ['Saintes', 'Chaniers', 'Fontcouverte', 'Saint-Georges-des-Coteaux', 'Thénac', 'Pons', 'Saint-Porchaire', 'Chermignac', 'Les Gonds', 'Bussac-sur-Charente', 'Écoyeux', 'Burie'],
    prestationsFocus: ['fenetres', 'portes-entree', 'verandas-extensions', 'pergolas', 'portails-clotures', 'volets'],
    realisations: ['porte-entree-meo-manoir-saintes', 'fenetres-pvc-petits-bois-pons', 'porte-entree-cintree-meo-gemozac', 'portail-alu-horizal-mirambeau'],
    faq: [
      { q: 'Avez-vous une agence à Saintes ?', a: 'Pas encore : nos agences sont à Jonzac (Saint-Germain-de-Lusignan) et à Royan (Breuillet). Nous intervenons à Saintes comme sur le reste de la Saintonge, avec déplacement gratuit pour le devis.' },
      { q: 'Posez-vous des fenêtres en secteur sauvegardé à Saintes ?', a: 'Oui. Nous proposons des gammes bois ou aluminium à l’aspect traditionnel et préparons les pièces de la déclaration préalable soumise à l’ABF.' },
      { q: 'Quel délai pour un devis à Saintes ?', a: 'Un rendez-vous chez vous sous une semaine en général, puis le devis sous quelques jours après le métré.' },
    ],
    hero: { real: 'porte-entree-meo-manoir-saintes' },
  },
  {
    slug: 'cognac',
    name: 'Cognac',
    h1: 'Menuiserie à Cognac : fenêtres, portes, vérandas, portails',
    metaTitle: 'Menuiserie à Cognac — Fenêtres, Vérandas, Portails | LUZ Cognac',
    metaDescription:
      'Fenêtres & Vérandas LUZ intervient à Cognac, Jarnac, Barbezieux et dans l’ouest de la Charente : fenêtres PVC, alu, bois, portes d’entrée MéO, vérandas, portails HORIZAL. Entreprise RGE, devis gratuit.',
    agence: 'jonzac',
    distance: '40 min de notre agence de Jonzac',
    lead: 'De Barbezieux à Jarnac en passant par Cognac et Châteauneuf-sur-Charente, LUZ étend son secteur à l’ouest de la Charente. Mêmes fabricants français, mêmes équipes de pose, même service après-vente qu’à Jonzac.',
    paragraphs: [
      'Le pays de Cognac est riche en maisons charentaises en pierre et en logis de domaines viticoles : des bâtis qui appellent des menuiseries bois ou bois-alu MéO, des portes d’entrée cintrées ou à tierce et des volets battants aluminium reproduisant l’aspect du bois. Nous avons notamment posé une porte d’entrée MéO à deux vantaux à Cognac et un portail aluminium HORIZAL à Jarnac.',
      'Pour les pavillons plus récents de Châteauneuf, Segonzac ou Rouillac, la demande porte sur les fenêtres PVC ou alu performantes, les pergolas bioclimatiques et les portails motorisés.',
      'Cognac étant en Charente (16), les aides à la rénovation énergétique sont les mêmes qu’en Charente-Maritime : MaPrimeRénov’, CEE, TVA réduite. Notre certification RGE s’applique sur tout notre secteur d’intervention.',
    ],
    communes: ['Cognac', 'Jarnac', 'Châteauneuf-sur-Charente', 'Segonzac', 'Rouillac', 'Barbezieux-Saint-Hilaire', 'Cherves-Richemont', 'Merpins', 'Saint-Brice', 'Bourg-Charente', 'Salles-d’Angles', 'Baignes-Sainte-Radegonde'],
    prestationsFocus: ['fenetres', 'portes-entree', 'volets', 'portails-clotures', 'verandas-extensions', 'pergolas'],
    realisations: ['porte-entree-meo-riviere-cognac', 'portail-alu-horizal-jarnac', 'baies-vitrees-alu-janneau-archiac', 'fenetres-alu-janneau-domaine-jonzac'],
    faq: [
      { q: 'Intervenez-vous vraiment à Cognac ?', a: 'Oui, Cognac, Jarnac et Barbezieux font partie de notre zone en développement depuis l’agence de Jonzac. Le déplacement pour le métré et le devis est gratuit.' },
      { q: 'Faites-vous des menuiseries adaptées aux maisons charentaises ?', a: 'C’est notre spécialité : fenêtres bois ou bois-alu avec petits bois, portes cintrées, volets battants alu à l’ancienne, dans les teintes traditionnelles.' },
    ],
    hero: { real: 'porte-entree-meo-riviere-cognac' },
  },
  {
    slug: 'ile-oleron',
    name: 'Île d’Oléron',
    h1: 'Menuiserie sur l’île d’Oléron : fenêtres, portails, pergolas',
    metaTitle: 'Menuiserie sur l’île d’Oléron — Fenêtres, Pergolas, Portails | LUZ Oléron',
    metaDescription:
      'Fenêtres & Vérandas LUZ intervient sur l’île d’Oléron et le bassin de Marennes : fenêtres alu et PVC résistantes aux embruns, portails HORIZAL Qualimarine, pergolas, stores et volets. Devis gratuit depuis notre agence de Royan.',
    agence: 'royan',
    distance: '35 min de notre agence de Royan (Breuillet)',
    lead: 'Sel, vent, soleil : les menuiseries d’Oléron vivent dans des conditions exigeantes. Depuis notre agence de Breuillet, nous posons sur toute l’île des fenêtres, portails, pergolas et stores choisis pour résister au climat du littoral.',
    paragraphs: [
      'Sur l’île, nous privilégions l’aluminium thermolaqué avec label Qualimarine, les quincailleries inox et les vitrages à contrôle solaire. Les portails HORIZAL assemblés sans soudure et les pergolas bioclimatiques Concept Alu équipées de capteurs de vent sont particulièrement adaptés. Nous avons posé notamment une pergola bioclimatique et un portail sur l’île.',
      'Résidences principales ou secondaires : nous organisons les rendez-vous de métré et de pose selon vos disponibilités, y compris pour des propriétaires qui ne sont pas sur place à l’année, avec un suivi de chantier à distance par photos.',
      'Volets battants alu de couleur, stores bannes à coffre, moustiquaires enroulables : les demandes les plus fréquentes à Saint-Pierre, Dolus, Le Château ou Saint-Trojan sont aussi celles que nous maîtrisons le mieux.',
    ],
    communes: ['Saint-Pierre-d’Oléron', 'Dolus-d’Oléron', 'Le Château-d’Oléron', 'Saint-Trojan-les-Bains', 'Saint-Georges-d’Oléron', 'Saint-Denis-d’Oléron', 'La Brée-les-Bains', 'Le Grand-Village-Plage', 'Marennes', 'Bourcefranc-le-Chapus'],
    prestationsFocus: ['fenetres', 'portails-clotures', 'pergolas', 'stores', 'volets', 'verandas-extensions'],
    realisations: ['pergola-bioclimatique-ile-oleron', 'portail-portillon-horizal-vaux-sur-mer', 'store-banne-hermes-royan', 'volets-battants-alu-persiennes-saint-georges-de-didonne'],
    faq: [
      { q: 'Quelles menuiseries choisir en bord de mer ?', a: 'Aluminium laqué Qualimarine ou PVC de gamme littorale, quincailleries inox, vitrages feuilletés et à contrôle solaire. Pour les portails, un laquage Qualimarine et un assemblage sans soudure sont indispensables.' },
      { q: 'Intervenez-vous pour une résidence secondaire ?', a: 'Oui, nous planifions les interventions selon vos présences sur l’île et vous envoyons un compte rendu photo à la fin du chantier.' },
    ],
    hero: { real: 'pergola-bioclimatique-ile-oleron' },
  },
];

export const villeBySlug = (slug: string) => villes.find((v) => v.slug === slug);

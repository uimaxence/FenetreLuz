export type Marque = {
  slug: string;
  name: string;
  label?: string; // statut LUZ vis-à-vis de la marque (certification, réseau…)
  categorie: string;
  produits: string[];
  description: string;
  origine?: string;
  prestations: string[]; // slugs des pages prestations liées
  principale?: boolean; // affichée dans les bandeaux de confiance
  aVenir?: boolean;
};

export const marques: Marque[] = [
  {
    slug: 'meo',
    name: 'MéO',
    label: 'Menuisier d’Excellence MéO',
    categorie: 'Fenêtres & portes d’entrée bois-alu',
    produits: ['Fenêtres mixtes bois-aluminium', 'Portes d’entrée (10 gammes, 74 modèles)', 'Portes-fenêtres et baies', 'Murs-rideaux bois-alu'],
    description:
      'Fabricant français de menuiseries haut de gamme, MéO associe la chaleur du bois à l’intérieur et la résistance de l’aluminium à l’extérieur. LUZ fait partie du réseau des Menuisiers d’Excellence MéO : nos métreurs et poseurs sont formés par le fabricant.',
    origine: 'Fabrication française',
    prestations: ['fenetres', 'portes-entree'],
    principale: true,
  },
  {
    slug: 'janneau',
    name: 'Janneau',
    label: 'Menuisier Créateur Janneau',
    categorie: 'Menuiseries PVC, alu, bois & volets',
    produits: ['Fenêtres PVC (gamme Littoral)', 'Fenêtres et coulissants aluminium (Estival)', 'Fenêtres bois Patrimoine & Tradition', 'Portes d’entrée sur mesure (+300 modèles)', 'Volets roulants et battants'],
    description:
      'Janneau conçoit et fabrique ses fenêtres et portes en France depuis plus de 50 ans. Le réseau Janneau Menuisier Créateur (JMC) réunit des installateurs sélectionnés pour la qualité de leur conseil, de leurs métrés et de leur pose. LUZ en est membre pour ses deux agences.',
    origine: 'Fabrication française',
    prestations: ['fenetres', 'portes-entree', 'volets'],
    principale: true,
  },
  {
    slug: 'concept-alu',
    name: 'Concept Alu',
    label: 'Concessionnaire Concept Alu',
    categorie: 'Vérandas, extensions, pergolas, carports',
    produits: ['Vérandas HOMEA et ARMONIA', 'Extensions EXTANXIA Still et Deko', 'Pergolas bioclimatiques', 'Carports, pool houses, auvents'],
    description:
      'Concept Alu conçoit des vérandas, extensions et pergolas en aluminium avec son propre bureau d’études et de R&D. En tant que concessionnaire, LUZ dessine votre projet avec leurs outils de conception 3D et le fait fabriquer sur mesure.',
    origine: 'Fabrication française',
    prestations: ['verandas-extensions', 'pergolas', 'carports-pool-house'],
    principale: true,
  },
  {
    slug: 'horizal',
    name: 'HORIZAL',
    label: 'Portalier agréé HORIZAL',
    categorie: 'Portails, clôtures, garde-corps',
    produits: ['Portails battants et coulissants (+300 modèles)', 'Clôtures aluminium', 'Garde-corps verre, tôle laser, inox', 'Barrières de piscine'],
    description:
      'HORIZAL fabrique des portails aluminium sur mesure assemblés mécaniquement sans soudure, avec un laquage labellisé Qualicoat et Qualimarine, idéal en bord de mer. LUZ est Portalier agréé HORIZAL : conception, pose et motorisation par nos équipes.',
    origine: 'Fabrication française',
    prestations: ['portails-clotures'],
    principale: true,
  },
  {
    slug: 'soliso',
    name: 'Soliso Europe',
    label: 'Expert Storiste Soliso',
    categorie: 'Stores extérieurs & intérieurs',
    produits: ['Stores bannes coffre, cassette, traditionnels', 'Stores verticaux zip screen', 'Pergolas stores', 'Moustiquaires', 'Stores intérieurs'],
    description:
      'Storiste français depuis 1947, Soliso fabrique des stores bannes, stores verticaux et pergolas toile reconnus pour leur tenue au vent et la qualité de leurs toiles. LUZ est Expert Storiste Soliso pour la Charente-Maritime.',
    origine: 'Fabrication française depuis 1947',
    prestations: ['stores', 'pergolas'],
    principale: true,
  },
  {
    slug: 'ehret',
    name: 'EHRET',
    categorie: 'Volets battants aluminium',
    produits: ['Volets battants alu pleins, persiennés, isolants', 'Lames fixes ou orientables', 'Large choix de coloris'],
    description:
      'Spécialiste européen du volet battant en aluminium : robustesse, absence d’entretien et rendu traditionnel ou contemporain, avec des modèles isolants qui améliorent le confort thermique.',
    prestations: ['volets'],
  },
  {
    slug: 'soprofen',
    name: 'Soprofen',
    categorie: 'Volets roulants',
    produits: ['Volets roulants rénovation et bloc-baie', 'Motorisations filaires, radio ou solaires'],
    description:
      'Fabricant français de volets roulants et de fermetures, avec des solutions conformes aux exigences énergétiques actuelles et un bon niveau d’isolation acoustique.',
    origine: 'Fabrication française',
    prestations: ['volets'],
  },
  {
    slug: 'gypass',
    name: 'Gypass',
    categorie: 'Portes de garage',
    produits: ['Portes sectionnelles plafond', 'Portes sectionnelles latérales', 'Portillon intégré, hublots, finitions bois ou laquées'],
    description:
      'Portes de garage sur mesure fabriquées en France : sectionnelles, latérales, avec ou sans portillon, motorisées et personnalisables dans une large palette de couleurs.',
    origine: 'Fabrication française',
    prestations: ['volets', 'motorisation'],
  },
  {
    slug: 'somfy',
    name: 'Somfy',
    categorie: 'Motorisation & domotique',
    produits: ['Moteurs de volets et stores io / RTS', 'Motorisation de portails et portes de garage', 'Box domotique TaHoma', 'Alarme Home Keeper Pro'],
    description:
      'Leader mondial de la motorisation de l’habitat. Volets, stores, portails et alarme se pilotent depuis une télécommande ou une application, avec des scénarios adaptés à votre quotidien.',
    prestations: ['motorisation', 'volets', 'stores'],
  },
  {
    slug: 'dea',
    name: 'DEA System',
    categorie: 'Motorisation de portails',
    produits: ['Motorisations pour portails battants et coulissants', 'Automatismes de portes de garage'],
    description: 'Automatismes italiens réputés pour leur fiabilité et leur silence, adaptés aux portails aluminium lourds et aux usages intensifs.',
    prestations: ['motorisation', 'portails-clotures'],
  },
  {
    slug: 'vulcan',
    name: 'Vulcan',
    categorie: 'Braseros',
    produits: ['Braseros-planchas en acier', 'Accessoires de cuisson extérieure'],
    description: 'Braseros et planchas à bois pour cuisiner et se réunir dehors toute l’année. À découvrir en démonstration dans notre showroom de Jonzac.',
    prestations: ['braseros'],
  },
  {
    slug: 'twic',
    name: 'TWIC',
    categorie: 'Terrasses bois',
    produits: ['Terrasses bois et composite'],
    description: 'Gamme de terrasses bois et composite TWIC (« gentlemen poseurs ») en cours d’intégration à notre offre : nous vous tiendrons informés de sa disponibilité.',
    prestations: ['terrasses-bois'],
    aVenir: true,
  },
];

export const marquesPrincipales = marques.filter((m) => m.principale);
export const marqueBySlug = (slug: string) => marques.find((m) => m.slug === slug);

// MéO : LUZ est membre du Club des Menuisiers d'Excellence MéO (fenêtres, baies
// et portes d'entrée bois-aluminium). Source unique des textes et liens MéO.
// Faits relevés sur fenetremeo.com et portemeo.com le 1er octobre 2026.

export type GammeMeo = { nom: string; texte: string; prestation?: string };

export const meo: {
  site: string;
  configurateur: string;
  club: string;
  extensionGarantie: string;
  conditionsGarantie: string;
  presentation: string;
  gamme: GammeMeo[];
  clubDepuis: number;
  engagements: string[];
  garantie: { duree: string; texte: string; activation: string };
} = {
  site: 'https://www.fenetremeo.com/',
  /** Configurateur de porte d'entrée MéO (site dédié). */
  configurateur: 'https://www.portemeo.com/',
  club: 'https://www.fenetremeo.com/menuisiers-dexcellence/',
  extensionGarantie: 'https://www.fenetremeo.com/extension-de-garantie/',
  conditionsGarantie: 'https://www.fenetremeo.com/conditions-relatives-a-lextension-de-garantie/',

  presentation:
    'Créateur de la fenêtre bois-aluminium en 1983, MéO fabrique ses fenêtres, portes d’entrée et baies sur mesure à Cugand, en Vendée : le bois à l’intérieur (13 finitions chêne ou pin), l’aluminium à l’extérieur (28 couleurs), sans entretien.',

  gamme: [
    { nom: 'Fenêtres bois-aluminium', texte: 'À la française, oscillo-battantes ou fixes, sur mesure.', prestation: 'fenetres' },
    { nom: 'Portes d’entrée bois-aluminium', texte: '82 modèles pleins, vitrés ou semi-vitrés, à composer en ligne.', prestation: 'portes-entree' },
    { nom: 'Baies coulissantes bois-aluminium', texte: 'Grandes ouvertures, version motorisée et connectée possible.', prestation: 'fenetres' },
    { nom: 'Verrières et murs-rideaux', texte: 'Pour les extensions et les grandes surfaces vitrées.' },
    { nom: 'MéO Connect', texte: 'Baie motorisée, volets, brise-soleil et poignée connectés avec Somfy.', prestation: 'motorisation' },
  ],

  /** Ce que le label engage, tel que MéO le présente. */
  clubDepuis: 2012,
  engagements: [
    'Métreurs et poseurs formés par MéO sur toute la gamme bois-aluminium',
    'Pose dans les règles de l’art, conforme aux normes en vigueur',
    'Un interlocuteur unique, du devis à la pose',
    'Service après-vente en lien direct avec MéO',
  ],

  garantie: {
    duree: '15 ans',
    texte:
      'Les fenêtres, baies et portes d’entrée MéO posées par un Menuisier d’Excellence ouvrent droit à l’extension de garantie MéO : certaines garanties structurelles sont portées à 15 ans à compter de la réception du chantier.',
    activation:
      'Elle se demande sur le site de MéO, par le propriétaire, dans les 14 jours qui suivent la signature du procès-verbal de fin de chantier. Nous vous remettons le lien avec le PV.',
  },
};

// Janneau : LUZ est membre du réseau Janneau Menuisier Créateur (JMC) pour ses deux agences
// (fenêtres PVC, aluminium et bois, baies, portes d'entrée, volets roulants). Source unique des textes et liens Janneau.
// Faits relevés sur janneau.com le 27 octobre 2026. Les durées de garantie sont celles annoncées par Janneau
// (« jusqu'à 20 ans ») : à confirmer gamme par gamme avec le fabricant avant d'afficher un chiffre contractuel.

export type GammeJanneau = { nom: string; texte: string; prestation?: string };

export const janneau: {
  site: string;
  simulateur: string;
  reseau: string;
  presentation: string;
  engagements: string[];
  gamme: GammeJanneau[];
  garantie: { duree: string; texte: string; vitrage: string };
} = {
  site: 'https://www.janneau.com/',
  /** Simulateur de porte d'entrée Janneau (site dédié). */
  simulateur: 'https://simulateur.janneau.com/',
  reseau: 'https://www.janneau.com/installateurs',

  presentation:
    'Janneau fabrique ses fenêtres, portes d’entrée, baies et volets sur mesure en Pays de la Loire depuis 1973 : 100 % de fabrication française, en PVC, aluminium, bois ou acier, plus de 100 000 menuiseries par an.',

  /** Ce que le réseau Janneau Menuisier Créateur engage, appliqué par LUZ. */
  engagements: [
    'Conseil personnalisé dans nos showrooms de Jonzac et de Breuillet',
    'Relevé de cotes précis et devis gratuit, expliqué poste par poste',
    'Pose soignée par nos équipes salariées, formées par le fabricant',
    'Service après-vente assuré par LUZ, en lien avec Janneau',
  ],

  gamme: [
    { nom: 'Fenêtres PVC Littoral.J et Antalis', texte: 'Profilés fins, isolation thermique et acoustique, sécurité renforcée.', prestation: 'fenetres' },
    { nom: 'Fenêtres et baies aluminium Estival évolution', texte: 'Grandes dimensions, profils fins, coulissants et galandage.', prestation: 'fenetres' },
    { nom: 'Fenêtres bois Montaigne et Tradi', texte: 'Pour les maisons de caractère et les secteurs protégés.', prestation: 'fenetres' },
    { nom: 'Portes d’entrée', texte: 'Styles contemporain, intemporel ou lumineux, à composer dans le simulateur.', prestation: 'portes-entree' },
    { nom: 'Volets roulants Tradi, Rénovation et Naera', texte: 'Pose neuve ou rénovation, motorisation Somfy.', prestation: 'volets' },
  ],

  garantie: {
    duree: 'jusqu’à 20 ans',
    texte:
      'Janneau annonce des menuiseries garanties jusqu’à 20 ans selon les gammes. Les durées exactes par produit figurent dans les conditions de garantie remises avec votre devis.',
    vitrage: 'Vitrages isolants certifiés CEKAL : qualité et étanchéité garanties 10 ans.',
  },
};

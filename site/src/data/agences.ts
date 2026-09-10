export type Agence = {
  slug: 'jonzac' | 'royan';
  name: string;
  short: string;
  city: string; // ville "SEO" ciblée
  commune: string; // commune réelle de l'agence
  address: { street: string; zip: string; city: string };
  phone: string;
  tel: string; // format E.164 pour les liens tel:
  email: string;
  hours: { days: string; time: string }[];
  openingHoursSpecification: { days: string[]; opens: string; closes: string }[];
  mapsQuery: string;
  showroom?: string;
  responsable?: { name: string; role: string; bio: string };
  zoneLabel: string;
  intro: string;
  description: string[];
  communes: string[];
  photo: 'jonzac' | 'royan';
  googleReviewUrl?: string; // À RENSEIGNER (lien court "laisser un avis")
};

export const agences: Record<'jonzac' | 'royan', Agence> = {
  jonzac: {
    slug: 'jonzac',
    name: 'Agence de Jonzac',
    short: 'Jonzac',
    city: 'Jonzac',
    commune: 'Saint-Germain-de-Lusignan',
    address: { street: '14 Bis route de Saint-Genis', zip: '17500', city: 'Saint-Germain-de-Lusignan' },
    phone: '05 46 70 48 38',
    tel: '+33546704838',
    email: 'contact@fenetresluz.com',
    hours: [
      { days: 'Lundi – Vendredi', time: '9h00 – 12h30 / 14h00 – 18h15' },
      { days: 'Samedi', time: '9h00 – 12h00' },
    ],
    openingHoursSpecification: [
      { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '12:30' },
      { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '14:00', closes: '18:15' },
      { days: ['Saturday'], opens: '09:00', closes: '12:00' },
    ],
    mapsQuery: 'Fenêtres et Vérandas LUZ, 14 Bis route de Saint-Genis, 17500 Saint-Germain-de-Lusignan',
    showroom: 'Showroom de 200 m²',
    zoneLabel: 'Haute-Saintonge, Sud Charente-Maritime',
    intro:
      'Notre agence historique et son showroom de 200 m², aux portes de Jonzac. Fenêtres, portes, vérandas, portails, volets et stores : venez voir, toucher et comparer avant de choisir.',
    description: [
      'Installée depuis plus de vingt ans à Saint-Germain-de-Lusignan, à deux minutes du centre de Jonzac, l’agence LUZ est le siège de l’entreprise. C’est ici que travaillent le bureau d’études, les assistantes commerciales et nos équipes de pose.',
      'Le showroom de 200 m² présente en situation réelle les menuiseries MéO et Janneau, une véranda et une pergola Concept Alu, des portails HORIZAL, des stores Soliso et des volets EHRET. Vous pouvez manipuler les ouvrants, comparer les matériaux et les finitions, et repartir avec un chiffrage clair.',
      'Nous intervenons dans toute la Haute-Saintonge : Jonzac bien sûr, mais aussi Archiac, Montendre, Montguyon, Mirambeau, Saint-Genis-de-Saintonge, Pons ou Gémozac, ainsi que le sud de la Charente jusqu’à Barbezieux.',
    ],
    communes: [
      'Jonzac',
      'Saint-Germain-de-Lusignan',
      'Archiac',
      'Montendre',
      'Montguyon',
      'Montlieu-la-Garde',
      'Mirambeau',
      'Saint-Genis-de-Saintonge',
      'Pons',
      'Gémozac',
      'Ozillac',
      'Clion',
      'Réaux-sur-Trèfle',
      'Guitinières',
      'Neuillac',
      'Saint-Simon-de-Bordes',
      'Saint-Fort-sur-Gironde',
      'Chevanceaux',
      'Baignes-Sainte-Radegonde',
      'Barbezieux-Saint-Hilaire',
    ],
    photo: 'jonzac',
  },
  royan: {
    slug: 'royan',
    name: 'Agence de Royan',
    short: 'Royan',
    city: 'Royan',
    commune: 'Breuillet',
    address: { street: '54C route du Magarin', zip: '17920', city: 'Breuillet' },
    phone: '05 46 21 37 21',
    tel: '+33546213721',
    email: 'contact@fenetresluz.com',
    hours: [
      { days: 'Lundi – Vendredi', time: '9h00 – 12h30' },
      { days: 'Après-midi', time: 'Sur rendez-vous' },
    ],
    openingHoursSpecification: [
      { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '12:30' },
    ],
    mapsQuery: 'Fenêtres et Vérandas LUZ, 54C route du Magarin, 17920 Breuillet',
    showroom: 'Showroom & bureau',
    responsable: {
      name: 'Olivier Michaud',
      role: 'Responsable de l’agence de Royan',
      bio: 'Plus de trente ans de menuiserie en pays royannais. Olivier vous reçoit à Breuillet, se déplace chez vous pour le métré et suit votre chantier jusqu’à la réception.',
    },
    zoneLabel: 'Pays royannais, presqu’île d’Arvert, Marennes-Oléron',
    intro:
      'Notre agence du pays royannais, à Breuillet, à dix minutes de Royan. Menuiseries alu pour le bord de mer, vérandas, pergolas, portails et stores : un interlocuteur local qui connaît les contraintes du littoral.',
    description: [
      'Ouverte pour être au plus près de nos clients du littoral, l’agence de Breuillet couvre Royan et toute la Côte de Beauté, la presqu’île d’Arvert, le bassin de Marennes et l’île d’Oléron.',
      'Le climat marin impose des choix précis : aluminium laqué avec label Qualimarine, quincaillerie inox, vitrages à contrôle solaire, stores résistants au vent. Olivier Michaud, responsable de l’agence, vous conseille sur ces points dès la première visite.',
      'Nos équipes de pose sont les mêmes qu’à Jonzac : des salariés LUZ, pas de sous-traitance. Le service après-vente et le dépannage sont assurés depuis Breuillet pour tout le secteur.',
    ],
    communes: [
      'Royan',
      'Breuillet',
      'Saint-Georges-de-Didonne',
      'Saint-Palais-sur-Mer',
      'Vaux-sur-Mer',
      'Saint-Sulpice-de-Royan',
      'Saujon',
      'Semussac',
      'Meschers-sur-Gironde',
      'Talmont-sur-Gironde',
      'Cozes',
      'Étaules',
      'Chaillevette',
      'Arvert',
      'La Tremblade',
      'Mornac-sur-Seudre',
      'Le Gua',
      'Marennes',
      'Bourcefranc-le-Chapus',
      'Île d’Oléron',
    ],
    photo: 'royan',
  },
};

export const agencesList = [agences.jonzac, agences.royan];

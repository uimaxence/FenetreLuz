/**
 * Avis clients.
 * Aucun avis n'est inventé : seuls les avis Google réels doivent être affichés.
 * Renseigner les liens des fiches Google Business et coller les verbatims (auteur, note, date, texte)
 * une fois l'accès aux fiches confirmé (roadmap §1 / §7).
 */
export type Avis = {
  auteur: string;
  note: 1 | 2 | 3 | 4 | 5;
  date: string; // ISO
  texte: string;
  agence: 'jonzac' | 'royan';
  source: 'google' | 'guest-suite';
};

export const fichesGoogle = {
  jonzac: {
    label: 'Agence de Jonzac',
    url: '', // À RENSEIGNER : lien de la fiche Google Business
    reviewUrl: '', // À RENSEIGNER : lien court "laisser un avis"
    note: null as number | null, // ex. 4.8
    nombre: null as number | null, // ex. 57
  },
  royan: {
    label: 'Agence de Royan',
    url: '',
    reviewUrl: '',
    note: null as number | null,
    nombre: null as number | null,
  },
};

export const avis: Avis[] = [];

export const guestSuiteWidgetId = ''; // identifiant du widget Guest-Suite si conservé

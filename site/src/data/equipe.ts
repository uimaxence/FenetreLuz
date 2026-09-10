export type Membre = {
  prenom: string;
  role: string;
  photo?: string; // clé dans src/assets/photos/equipe/
  agence?: 'jonzac' | 'royan';
  pole: 'direction' | 'commercial' | 'bureau' | 'pose';
};

/** Prénoms et rôles issus des fichiers photos fournis (noms de famille non communiqués). */
export const equipe: Membre[] = [
  { prenom: 'Benoît', role: 'Gérant, fondateur', photo: 'benoit', pole: 'direction', agence: 'jonzac' },
  { prenom: 'Olivier', role: 'Responsable de l’agence de Royan', pole: 'direction', agence: 'royan' },
  { prenom: 'Élodie', role: 'Commerciale', photo: 'elodie', pole: 'commercial' },
  { prenom: 'Steve', role: 'Commercial', photo: 'steve', pole: 'commercial' },
  { prenom: 'Laura', role: 'Assistante commerciale', photo: 'laura', pole: 'bureau' },
  { prenom: 'Lydia', role: 'Assistante commerciale', photo: 'lydia', pole: 'bureau' },
  { prenom: 'Mickaël', role: 'Métreur', photo: 'mickael', pole: 'bureau' },
  { prenom: 'Sébastien', role: 'Poseur', photo: 'sebastien', pole: 'pose' },
  { prenom: 'Patrick', role: 'Poseur', photo: 'patrick', pole: 'pose' },
  { prenom: 'Loris', role: 'Poseur', photo: 'loris', pole: 'pose' },
  { prenom: 'Maxime', role: 'Poseur', photo: 'maxime', pole: 'pose' },
  { prenom: 'Sébastien', role: 'Poseur', photo: 'sebastien-2', pole: 'pose' },
];

export const poles: Record<Membre['pole'], string> = {
  direction: 'Direction',
  commercial: 'Conseil & commercial',
  bureau: 'Bureau d’études & administratif',
  pose: 'Équipe de pose',
};

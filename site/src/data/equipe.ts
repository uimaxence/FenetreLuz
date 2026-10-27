export type Membre = {
  prenom: string;
  role: string;
  photo?: string; // clé dans src/assets/photos/equipe/
  agence?: 'jonzac' | 'royan';
  pole: 'direction' | 'commercial' | 'bureau' | 'pose';
};

/** Rôles précisés par Benoît (retour du 27 octobre 2026) ; prénoms seuls, sauf Benoît Clarysse et Steve Peponnet. */
export const equipe: Membre[] = [
  { prenom: 'Benoît', role: 'Gérant, secteur de Jonzac', photo: 'benoit', pole: 'direction', agence: 'jonzac' },
  { prenom: 'Élodie', role: 'Responsable de l’agence de Royan, technico-commerciale', photo: 'elodie', pole: 'direction', agence: 'royan' },
  { prenom: 'Olivier', role: 'Fondateur de l’agence de Royan, consultant commercial', photo: 'olivier', pole: 'commercial' },
  { prenom: 'Steve', role: 'Responsable de l’activité Concept Alu, Jonzac et Royan', photo: 'steve', pole: 'commercial', agence: 'royan' },
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

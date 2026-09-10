/**
 * Informations globales de l'entreprise (source : dossier de contenu Benoît + site actuel).
 * Les valeurs marquées "À CONFIRMER" sont à valider avant mise en ligne (voir roadmap-luz.md §1).
 */
export const site = {
  name: 'Fenêtres & Vérandas LUZ',
  shortName: 'LUZ',
  tagline: 'Menuiserie, fenêtres, vérandas & portails en Charente-Maritime',
  url: 'https://www.fenetresluz.com',
  email: 'contact@fenetresluz.com',
  legalName: 'FENETRES LUZ', // dénomination sociale (attestation INPI du 07/09/2026) ; nom commercial : Fenêtres & Vérandas LUZ
  founder: 'Benoît Clarysse',
  legal: {
    forme: 'SARL (société à responsabilité limitée)',
    capital: '5 000 €',
    siren: '533 386 132',
    siretSiege: '533 386 132 00039',
    siretRoyan: '533 386 132 00021',
    tva: 'FR42533386132',
    rcs: 'Saintes', // À CONFIRMER : greffe compétent pour Saint-Germain-de-Lusignan (17)
    ape: '4332A — Travaux de menuiserie bois et PVC',
    immatriculation: '21 juillet 2011',
    gerant: 'Benoît Clarysse',
  },
  experienceYears: 20, // "plus de 20 ans" — site actuel
  showroomSize: '200 m²',
  region: 'Charente-Maritime & Charente',
  department: '17',
  social: {
    facebook: 'https://www.facebook.com/fenetresluz/',
    instagram: 'https://www.instagram.com/fenetres_verandas_luz/',
  },
  certifications: [
    { id: 'rge', label: 'Certifié RGE', sub: 'Reconnu Garant de l’Environnement' },
    { id: 'qualibat', label: 'Qualibat', sub: 'Qualification bâtiment' },
    { id: 'meo', label: 'Menuisier d’Excellence', sub: 'Réseau MéO' },
    { id: 'janneau', label: 'Menuisier Créateur', sub: 'Réseau Janneau' },
    { id: 'horizal', label: 'Portalier agréé', sub: 'HORIZAL' },
    { id: 'soliso', label: 'Expert Storiste', sub: 'Soliso Europe' },
    { id: 'concept-alu', label: 'Concessionnaire', sub: 'Concept Alu' },
    { id: 'generali', label: 'Assurance décennale', sub: 'Generali' },
  ],
  depannage: {
    forfait: '121 € TTC',
    grille: [
      { label: 'Déplacement, diagnostic, recherche de panne', prix: '121 € TTC' },
      { label: 'Supplément accès difficile', prix: '82,20 € TTC' },
      { label: 'Temps passé supplémentaire', prix: '33 € TTC / demi-heure' },
      { label: 'Forfait entretien des ouvertures et fermetures', prix: '121 € TTC' },
    ],
    note: 'Prix conseillés pouvant être révisés par le technicien selon le diagnostic. Hors pièces. TVA à 10 % selon conditions d’attribution. Grille en vigueur depuis le 01/01/2026.',
  },
} as const;

export const nav = {
  main: [
    { label: 'Prestations', href: '/prestations/', mega: 'prestations' },
    { label: 'Réalisations', href: '/realisations/' },
    { label: 'Agences', href: '/contact/', mega: 'agences' },
    { label: 'Aides & financement', href: '/aides-financement/' },
    { label: 'Conseils', href: '/conseils/' },
    { label: 'À propos', href: '/a-propos/' },
  ],
  footer: {
    entreprise: [
      { label: 'À propos de LUZ', href: '/a-propos/' },
      { label: 'Nos marques partenaires', href: '/marques-partenaires/' },
      { label: 'Partenariats & engagements', href: '/partenariats-engagements/' },
      { label: 'Avis clients', href: '/avis/' },
      { label: 'Conseils & guides', href: '/conseils/' },
      { label: 'Contact', href: '/contact/' },
    ],
    zones: [
      { label: 'Menuiserie à Jonzac', href: '/agences/jonzac/' },
      { label: 'Menuiserie à Royan', href: '/agences/royan/' },
      { label: 'Menuiserie à Saintes', href: '/menuiserie-saintes/' },
      { label: 'Menuiserie à Cognac', href: '/menuiserie-cognac/' },
      { label: 'Menuiserie sur l’île d’Oléron', href: '/menuiserie-ile-oleron/' },
      { label: 'Véranda à Royan', href: '/veranda-royan/' },
      { label: 'Pergola à Royan', href: '/pergola-royan/' },
      { label: 'Portail à Royan', href: '/portail-royan/' },
      { label: 'Store à Royan', href: '/store-royan/' },
    ],
    legal: [
      { label: 'Mentions légales', href: '/mentions-legales/' },
      { label: 'Politique de confidentialité', href: '/politique-confidentialite/' },
      { label: 'Plan du site', href: '/plan-du-site/' },
    ],
  },
};

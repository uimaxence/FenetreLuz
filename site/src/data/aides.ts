/**
 * Aides et financement — montants et conditions à faire vérifier avant mise en ligne
 * (dispositifs révisés chaque année ; mention "sous conditions d'éligibilité" obligatoire).
 */
export type Aide = {
  slug: string;
  name: string;
  short: string;
  pour: string[]; // prestations concernées
  description: string;
  conditions: string[];
  montant: string;
  cumul: string;
};

export const aides: Aide[] = [
  {
    slug: 'maprimerenov',
    name: 'MaPrimeRénov’',
    short: 'Prime de l’État pour le remplacement de fenêtres simple vitrage',
    pour: ['Fenêtres', 'Portes-fenêtres', 'Baies vitrées'],
    description:
      'MaPrimeRénov’ est l’aide de l’État versée par l’Anah pour les travaux de rénovation énergétique. Le remplacement de fenêtres ou portes-fenêtres en simple vitrage par des menuiseries isolantes (double ou triple vitrage) est éligible dans le cadre d’un parcours de rénovation, avec un montant par équipement qui dépend de vos revenus.',
    conditions: [
      'Logement achevé depuis plus de 15 ans, occupé à titre de résidence principale',
      'Remplacement de fenêtres en simple vitrage uniquement',
      'Menuiseries respectant les performances thermiques exigées (Uw et Sw)',
      'Travaux réalisés par une entreprise certifiée RGE — c’est notre cas',
      'Demande déposée avant la signature du devis',
    ],
    montant: 'Forfait par fenêtre, modulé selon vos revenus (barème Anah en vigueur)',
    cumul: 'Cumulable avec les primes CEE et la TVA réduite',
  },
  {
    slug: 'cee',
    name: 'Primes CEE',
    short: 'Certificats d’économies d’énergie versés par les fournisseurs d’énergie',
    pour: ['Fenêtres', 'Portes-fenêtres', 'Volets isolants'],
    description:
      'Les fournisseurs d’énergie ont l’obligation de financer des travaux d’économies d’énergie. En remplaçant vos fenêtres par des menuiseries performantes, vous pouvez obtenir une prime CEE, quel que soit votre niveau de revenus.',
    conditions: [
      'Logement de plus de 2 ans',
      'Fenêtres avec Uw ≤ 1,3 W/m².K et Sw ≥ 0,3 (ou Uw ≤ 1,7 et Sw ≥ 0,36)',
      'Entreprise RGE',
      'Demande effectuée avant la signature du devis',
    ],
    montant: 'Variable selon la surface remplacée et la zone climatique',
    cumul: 'Cumulable avec MaPrimeRénov’ et l’éco-PTZ',
  },
  {
    slug: 'tva-reduite',
    name: 'TVA réduite 5,5 % ou 10 %',
    short: 'Taux de TVA réduit appliqué directement sur votre facture',
    pour: ['Fenêtres', 'Portes', 'Volets', 'Vérandas (10 %)', 'Portails (10 %)'],
    description:
      'Pour un logement achevé depuis plus de deux ans, les travaux de rénovation bénéficient d’une TVA réduite : 5,5 % pour les menuiseries améliorant la performance énergétique (fenêtres, portes d’entrée isolantes, volets isolants), 10 % pour les autres travaux d’amélioration (véranda, portail, store…).',
    conditions: [
      'Logement achevé depuis plus de 2 ans',
      'Résidence principale ou secondaire',
      'Fourniture et pose réalisées par l’entreprise',
      'Attestation simplifiée à signer avec le devis',
    ],
    montant: 'Économie immédiate de 10 à 14,5 points de TVA par rapport au taux normal',
    cumul: 'Appliquée directement sur le devis, cumulable avec toutes les aides',
  },
  {
    slug: 'eco-ptz',
    name: 'Éco-prêt à taux zéro',
    short: 'Prêt sans intérêts pour financer vos travaux d’isolation',
    pour: ['Fenêtres', 'Portes-fenêtres', 'Portes d’entrée isolantes'],
    description:
      'L’éco-PTZ permet d’emprunter sans intérêts pour financer des travaux de rénovation énergétique, dont le remplacement de vos fenêtres. Il est accordé par les banques partenaires sur présentation de nos devis et attestations RGE.',
    conditions: [
      'Logement achevé depuis plus de 2 ans, résidence principale',
      'Travaux réalisés par une entreprise RGE',
      'Sans condition de revenus',
    ],
    montant: 'Jusqu’à 7 000 € pour les fenêtres seules, davantage pour un bouquet de travaux, remboursable sur 20 ans maximum',
    cumul: 'Cumulable avec MaPrimeRénov’ et les CEE',
  },
];

export const financement = {
  partenaire: 'ARKEA',
  titre: 'Financez votre projet en plusieurs fois',
  texte:
    'Pour une véranda, une pergola ou un ensemble de menuiseries, nous proposons des solutions de financement avec notre partenaire ARKEA : étude gratuite en agence, réponse rapide, mensualités adaptées à votre budget.',
  mentions:
    'Sous réserve d’acceptation du dossier par l’organisme prêteur. Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager. Conditions détaillées et exemples représentatifs disponibles en agence.',
};

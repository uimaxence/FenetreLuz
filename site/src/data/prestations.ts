export type IconId =
  | 'fenetre'
  | 'porte'
  | 'veranda'
  | 'pergola'
  | 'carport'
  | 'volet'
  | 'portail'
  | 'store'
  | 'moteur'
  | 'brasero'
  | 'terrasse'
  | 'depannage';

export type Faq = { q: string; a: string };

export type Prestation = {
  slug: string;
  nav: string; // libellé court (menu)
  title: string; // libellé carte
  h1: string;
  metaTitle: string;
  metaDescription: string;
  icon: IconId;
  card: string; // accroche 1 ligne (cartes)
  lead: string; // chapô page
  hero: { real: string; i?: number } | { equipe: string } | { gen: string };
  facts: { label: string; value: string }[];
  sections: { title: string; text: string[]; items?: { title: string; text: string }[]; images?: string[] }[]; // images : ids de visuels (src/assets/gen)
  gammes: { title: string; marque?: string; text: string }[];
  marques: string[];
  arguments: { title: string; text: string }[];
  faq: Faq[];
  croisee?: string;
  aides?: boolean;
  keywords: string[];
  draft?: boolean;
};

export const prestations: Prestation[] = [
  {
    slug: 'fenetres',
    nav: 'Fenêtres',
    title: 'Fenêtres PVC, alu & bois',
    h1: 'Fenêtres PVC, aluminium et bois en Charente-Maritime',
    metaTitle: 'Fenêtres PVC, alu, bois en Charente-Maritime (17) — Pose & Devis | Fenêtres & Vérandas LUZ',
    metaDescription:
      'Remplacement et pose de fenêtres PVC, aluminium, bois et bois-alu à Jonzac, Royan et en Charente-Maritime. Fabricants français MéO et Janneau, entreprise certifiée RGE, aides MaPrimeRénov’. Devis gratuit.',
    icon: 'fenetre',
    card: 'Rénovation ou dépose totale, PVC, alu, bois ou mixte : des fenêtres MéO et Janneau posées par nos équipes.',
    lead: 'Changer ses fenêtres, c’est gagner en confort thermique, en silence et en lumière. Nous posons des menuiseries françaises MéO et Janneau, en rénovation comme en dépose totale, dans toute la Charente-Maritime.',
    hero: { real: 'baies-vitrees-alu-janneau-archiac' },
    facts: [
      { label: 'Matériaux', value: 'PVC, aluminium, bois, bois-alu' },
      { label: 'Fabricants', value: 'MéO, Janneau (France)' },
      { label: 'Pose', value: 'Rénovation ou dépose totale' },
      { label: 'Aides', value: 'MaPrimeRénov’, CEE, TVA 5,5 %' },
    ],
    sections: [
      {
        title: 'Quel matériau pour vos fenêtres ?',
        text: [
          'Il n’y a pas de bon matériau dans l’absolu, il y a celui qui convient à votre maison, à votre budget et à l’exposition de vos façades. Voici comment nous vous guidons en agence.',
        ],
        items: [
          {
            title: 'PVC : le meilleur rapport isolation / prix',
            text: 'Excellente performance thermique, aucun entretien, large choix de couleurs et de finitions plaxées. La gamme Littoral de Janneau est conçue pour résister au climat de la côte. C’est le choix le plus fréquent en rénovation.',
          },
          {
            title: 'Aluminium : finesse et grandes dimensions',
            text: 'Profils fins, surfaces vitrées maximales, coloris illimités et rupture de pont thermique. L’alu s’impose pour les baies coulissantes, les grandes ouvertures et les maisons contemporaines. Laquage Qualimarine recommandé en bord de mer.',
          },
          {
            title: 'Bois : le charme des maisons de caractère',
            text: 'Chaleur naturelle, moulures, petits bois, teintes ou peintures : le bois respecte l’architecture des maisons charentaises en pierre. Les gammes Patrimoine & Tradition de Janneau conviennent aux secteurs protégés (ABF).',
          },
          {
            title: 'Bois-aluminium : le meilleur des deux',
            text: 'Bois à l’intérieur pour le confort et l’esthétique, aluminium à l’extérieur pour la durabilité sans entretien. Les fenêtres mixtes MéO sont notre gamme haut de gamme, posée à Saint-Genis-de-Saintonge, Royan ou Saintes.',
          },
        ],
      },
      {
        title: 'Rénovation ou dépose totale ?',
        text: [
          'En pose rénovation, la nouvelle fenêtre est fixée sur le dormant existant, sain et bien ancré : intervention rapide, sans dégât sur les tableaux et les finitions intérieures. C’est la solution idéale quand l’ancien bâti est en bon état.',
          'En dépose totale, nous retirons l’ancien dormant jusqu’à la maçonnerie, puis nous posons la fenêtre neuve directement dans le tableau. On récupère du clair de vitrage, on traite les ponts thermiques et on repart sur une base saine. Notre métreur vous indique la meilleure option lors de la visite technique, sans surcoût de diagnostic.',
        ],
      },
      {
        title: 'Murs-rideaux et grandes façades vitrées',
        text: [
          'Pour les extensions contemporaines, les salles de séjour ouvertes sur le jardin ou les locaux professionnels, nous réalisons des murs-rideaux et ensembles composés en bois-aluminium MéO ou en aluminium Janneau : profils porteurs, vitrages de grande dimension, ouvrants intégrés.',
        ],
      },
    ],
    gammes: [
      { title: 'Littoral', marque: 'Janneau', text: 'Fenêtres et portes-fenêtres PVC, ouvrant droit ou galbé, jusqu’au triple vitrage. Pose en rénovation ou en neuf.' },
      { title: 'Estival Évolution', marque: 'Janneau', text: 'Fenêtres et coulissants aluminium issus de la R&D Janneau. Coulissants 2 à 3 rails, galandage, seuils PMR.' },
      { title: 'Patrimoine & Tradition', marque: 'Janneau', text: 'Deux gammes bois pour les maisons anciennes : moulures, petits bois collés ou incorporés, finitions peintes ou lasurées.' },
      { title: 'Fenêtres bois-alu', marque: 'MéO', text: 'Bois massif intérieur, capotage aluminium extérieur. Fenêtres, portes-fenêtres, coulissants, cintrées et murs-rideaux.' },
    ],
    marques: ['meo', 'janneau'],
    arguments: [
      { title: 'Métré précis, pose par nos salariés', text: 'Un métreur LUZ prend les cotes, nos poseurs installent. Pas de sous-traitance, un seul interlocuteur du devis à la réception.' },
      { title: 'Certifiés RGE : vos aides sécurisées', text: 'Notre certification RGE conditionne MaPrimeRénov’, les primes CEE et l’éco-PTZ. Nous montons le dossier avec vous.' },
      { title: 'Deux showrooms pour comparer', text: 'À Jonzac et à Breuillet, manipulez les ouvrants MéO et Janneau, comparez les coloris et les vitrages avant de décider.' },
      { title: 'Garanties fabricant + décennale', text: 'Menuiseries garanties par MéO et Janneau, pose couverte par notre assurance décennale Generali.' },
    ],
    faq: [
      {
        q: 'Combien coûte le remplacement d’une fenêtre ?',
        a: 'Comptez, pose comprise, de 500 à 900 € pour une fenêtre PVC standard, de 800 à 1 500 € en aluminium et de 1 000 à 2 000 € en bois ou bois-alu, selon les dimensions, le vitrage et le type de pose. Les aides (MaPrimeRénov’, CEE, TVA à 5,5 %) réduisent sensiblement la facture. Le devis est gratuit et établi après métré.',
      },
      {
        q: 'Fenêtre PVC ou aluminium : que choisir ?',
        a: 'Le PVC isole légèrement mieux à prix égal et ne demande aucun entretien ; l’aluminium offre des profils plus fins, des dimensions plus grandes et un rendu plus contemporain. Sur le littoral royannais, les deux conviennent à condition de choisir des quincailleries inox et, pour l’alu, un laquage Qualimarine.',
      },
      {
        q: 'Quelles aides pour changer ses fenêtres en 2026 ?',
        a: 'MaPrimeRénov’ (remplacement de simple vitrage, sous conditions de revenus), les primes CEE, la TVA réduite à 5,5 % et l’éco-prêt à taux zéro. Toutes exigent une entreprise RGE : LUZ l’est. Consultez notre page Aides & financement pour le détail.',
      },
      {
        q: 'Combien de temps dure la pose ?',
        a: 'En rénovation, une équipe pose en moyenne 4 à 6 fenêtres par jour. Une maison complète est généralement terminée en 1 à 3 jours, finitions comprises. Le délai de fabrication des menuiseries est de 6 à 10 semaines après validation des cotes.',
      },
      {
        q: 'Intervenez-vous en zone protégée (Bâtiments de France) ?',
        a: 'Oui. Nous préparons les documents de la déclaration préalable (coupes, coloris, profils) et proposons des gammes bois ou aluminium à l’aspect traditionnel acceptées par les Architectes des Bâtiments de France à Saintes, Royan ou Jonzac.',
      },
    ],
    aides: true,
    keywords: ['fenetre pvc', 'fenetre alu', 'fenetre bois', 'renovation fenetre', 'remplacement fenetre', 'fenetre royan', 'fenetre saintes'],
  },
  {
    slug: 'portes-entree',
    nav: 'Portes d’entrée',
    title: 'Portes d’entrée',
    h1: 'Portes d’entrée aluminium, bois et PVC en Charente-Maritime',
    metaTitle: 'Porte d’entrée en Charente-Maritime (17) — Alu, bois, PVC, pose & devis | LUZ',
    metaDescription:
      'Porte d’entrée sur mesure MéO et Janneau posée à Jonzac, Royan, Saintes et en Charente-Maritime : aluminium, bois-alu, PVC, modèles contemporains ou traditionnels, sécurité et isolation. Devis gratuit.',
    icon: 'porte',
    card: 'Plus de 370 modèles MéO et Janneau, du contemporain vitré à la porte cintrée traditionnelle, sur mesure.',
    lead: 'La porte d’entrée donne le ton de votre maison et protège ce qu’il y a derrière. Isolation, sécurité, esthétique : nous la dessinons avec vous parmi les gammes MéO et Janneau, puis nous la posons.',
    hero: { real: 'porte-entree-meo-saujon' },
    facts: [
      { label: 'Matériaux', value: 'Alu, bois-alu, bois, PVC, acier' },
      { label: 'Modèles', value: '+370 modèles sur mesure' },
      { label: 'Sécurité', value: 'Serrure multipoints, vitrage feuilleté' },
      { label: 'Aides', value: 'TVA 5,5 % (porte isolante)' },
    ],
    sections: [
      {
        title: 'Une porte d’entrée qui vous ressemble',
        text: [
          'Vitrée ou pleine, tiercée, cintrée pour une maison ancienne ou à insert inox pour une construction récente : nos deux fabricants couvrent tous les styles. Poignées, couleurs bicolores intérieur/extérieur, vitrages décoratifs, tierces fixes ou ouvrantes : tout est personnalisable.',
        ],
        items: [
          { title: 'Aluminium', text: 'Rigidité, finesse, couleurs illimitées et zéro entretien. Le choix le plus fréquent pour les portes contemporaines.' },
          { title: 'Bois-aluminium MéO', text: 'Bois à l’intérieur, aluminium dehors. La chaleur du bois sans l’entretien, idéale pour les maisons de pierre.' },
          { title: 'Bois', text: 'Chêne ou bois exotique, moulures et cintres possibles : la porte traditionnelle des maisons charentaises.' },
          { title: 'PVC', text: 'Le plus économique, isolant, avec de nombreuses finitions imitation bois ou couleurs.' },
        ],
      },
      {
        title: 'Isolation et sécurité',
        text: [
          'Une porte d’entrée moderne isole autant qu’un mur : panneaux à âme isolante, joints périphériques, seuil à rupture de pont thermique. Côté sécurité, toutes nos portes sont livrées avec serrure multipoints, paumelles renforcées et vitrages feuilletés ; des options anti-effraction et des serrures connectées sont disponibles.',
        ],
      },
    ],
    gammes: [
      { title: 'Portes MéO', marque: 'MéO', text: '10 gammes et 74 modèles : Ruisseau, Fiction, Phèdre, Cybèle, Manoir, Apparence, Rivière… en bois-alu ou aluminium, avec vitrages et ferrages haut de gamme.' },
      { title: 'Portes Janneau', marque: 'Janneau', text: 'Plus de 300 portes en aluminium, PVC ou bois, contemporaines ou classiques, configurables (couleur, vitrage, tierce, semi-fixe).' },
    ],
    marques: ['meo', 'janneau'],
    arguments: [
      { title: 'Vue en showroom', text: 'Plusieurs portes MéO et Janneau exposées à Jonzac et Breuillet pour juger le rendu, les poignées et la qualité de fermeture.' },
      { title: 'Pose soignée en rénovation', text: 'Dépose de l’ancienne porte, calage, étanchéité et finitions par nos poseurs, en une journée dans la plupart des cas.' },
      { title: 'Portes cintrées et sur mesure', text: 'Cintres, tierces, dimensions hors standard : nous relevons un gabarit précis pour les maisons anciennes.' },
      { title: 'Conseils couleur & style', text: 'Nos commerciaux vous aident à accorder porte, fenêtres, volets et portail pour une façade cohérente.' },
    ],
    faq: [
      { q: 'Quel est le prix d’une porte d’entrée posée ?', a: 'De 1 800 à 3 000 € pour une porte aluminium ou PVC de qualité, de 3 000 à 6 000 € pour une porte bois-alu MéO ou un modèle sur mesure avec tierce ou cintre, pose comprise. La TVA à 5,5 % s’applique aux portes isolantes en rénovation.' },
      { q: 'Peut-on changer une porte d’entrée sans travaux de maçonnerie ?', a: 'Dans la grande majorité des cas, oui : la nouvelle porte est fabriquée aux cotes exactes du tableau et posée en une journée, avec reprise des finitions par nos soins.' },
      { q: 'Une porte vitrée est-elle sûre ?', a: 'Oui, si le vitrage est feuilleté (type 44.2) et la serrure multipoints. C’est le standard de nos portes MéO et Janneau ; des vitrages retardateurs d’effraction sont possibles.' },
    ],
    aides: true,
    keywords: ["porte d'entrée", "porte d'entrée alu", "porte d'entrée royan"],
  },
  {
    slug: 'verandas-extensions',
    nav: 'Vérandas & extensions',
    title: 'Vérandas & extensions',
    h1: 'Vérandas et extensions aluminium en Charente-Maritime',
    metaTitle: 'Véranda & extension en Charente-Maritime (17) — Concept Alu, pose & devis | LUZ',
    metaDescription:
      'Véranda ou extension aluminium sur mesure à Jonzac, Royan, Saintes et en Charente-Maritime. Concessionnaire Concept Alu (HOMEA, ARMONIA, EXTANXIA), conception 3D, pose par nos équipes. Devis gratuit.',
    icon: 'veranda',
    card: 'Une pièce en plus, baignée de lumière : vérandas et extensions Concept Alu conçues en 3D et posées par LUZ.',
    lead: 'Gagner une pièce à vivre, ouvrir la maison sur le jardin, valoriser votre bien : la véranda ou l’extension aluminium Concept Alu s’adapte à votre maison, qu’elle soit charentaise en pierre ou contemporaine.',
    hero: { real: 'veranda-pergola-piscine-pays-jonzacais' },
    facts: [
      { label: 'Fabricant', value: 'Concept Alu (France)' },
      { label: 'Gammes', value: 'HOMEA, ARMONIA, EXTANXIA' },
      { label: 'Conception', value: 'Plans 3D et visite technique' },
      { label: 'Démarches', value: 'Déclaration préalable ou permis' },
    ],
    sections: [
      {
        title: 'Véranda ou extension ?',
        text: [
          'La véranda privilégie le vitrage, en façade comme en toiture, pour un maximum de lumière. L’extension à toit plat, elle, se comporte comme une pièce maçonnée : toiture isolée, murs pleins possibles, confort été comme hiver. Entre les deux, les toitures mixtes (panneaux isolants et vitrages) combinent lumière et performance.',
          'Nous étudions l’orientation, la surface, l’usage (salon, cuisine, bureau, piscine intérieure) et les contraintes d’urbanisme pour vous proposer la bonne configuration, avec une modélisation 3D de votre projet.',
        ],
      },
      {
        title: 'Un confort toute l’année',
        text: [
          'Une véranda moderne se vit douze mois sur douze : vitrages à contrôle solaire, stores de toiture ou brise-soleil orientables, volets roulants intégrés, ventilation, chauffage par le sol ou radiateurs. Nous prévoyons aussi le raccordement électrique et l’éclairage dès la conception.',
        ],
      },
      {
        title: 'Démarches administratives',
        text: [
          'Une véranda ou une extension nécessite une déclaration préalable de travaux ou un permis de construire selon la surface créée et les règles de votre commune. Nous fournissons les plans, coupes et façades nécessaires au dossier et vous accompagnons dans les échanges avec la mairie.',
        ],
      },
    ],
    gammes: [
      { title: 'HOMEA', marque: 'Concept Alu', text: 'Véranda moderne à toit plat, polyvalente et sophistiquée. Toiture pensée pour le confort : régulateur de lumière, volets télécommandés, isolation renforcée.' },
      { title: 'ARMONIA', marque: 'Concept Alu', text: 'Tradition et élégance : toiture isolante, lignes épurées, larges surfaces vitrées. S’intègre en harmonie avec les demeures de caractère.' },
      { title: 'EXTANXIA Still', marque: 'Concept Alu', text: 'Extension à toit plat inspirée de la finition acier : style atelier, industriel, très graphique.' },
      { title: 'EXTANXIA Deko', marque: 'Concept Alu', text: 'Extension à toiture plate isolante haute performance (membrane EPDM), finitions bois ou alu, brise-soleil intégrables.' },
    ],
    marques: ['concept-alu'],
    arguments: [
      { title: 'Concessionnaire Concept Alu', text: 'Fabricant français avec son propre bureau d’études. Nous concevons votre projet avec leurs outils 3D et le faisons fabriquer sur mesure.' },
      { title: 'Un seul interlocuteur', text: 'Étude, dossier d’urbanisme, fabrication, pose, électricité et finitions : LUZ coordonne l’ensemble.' },
      { title: 'Véranda et pergola exposées', text: 'Venez voir une véranda et une pergola Concept Alu grandeur nature dans notre showroom de Jonzac.' },
      { title: 'Financement possible', text: 'Solutions de financement avec notre partenaire ARKEA pour lisser l’investissement (sous réserve d’acceptation).' },
    ],
    faq: [
      { q: 'Quel est le prix d’une véranda ?', a: 'Une véranda aluminium Concept Alu de 15 à 20 m² se situe généralement entre 25 000 et 45 000 € posée, hors dalle et électricité, selon la toiture (vitrée, mixte ou isolée), les ouvrants et les options de confort. Une extension à toit plat isolée est un peu plus onéreuse au mètre carré. Nous chiffrons précisément après visite.' },
      { q: 'Faut-il un permis de construire ?', a: 'Jusqu’à 20 m² de surface créée (40 m² dans certaines zones urbaines couvertes par un PLU), une déclaration préalable suffit ; au-delà, un permis de construire est nécessaire. Nous préparons les pièces graphiques du dossier.' },
      { q: 'Une véranda est-elle habitable en hiver et en été ?', a: 'Oui, avec une toiture isolée ou mixte, des vitrages à contrôle solaire, des protections solaires et un chauffage adapté. Nos gammes HOMEA et EXTANXIA sont conçues pour un usage toute l’année.' },
      { q: 'Quel délai pour une véranda ?', a: 'Comptez 2 à 3 mois pour l’instruction du dossier d’urbanisme, 8 à 12 semaines de fabrication, puis 1 à 2 semaines de pose selon la taille du projet.' },
    ],
    croisee: 'veranda-royan',
    keywords: ['veranda', 'extension maison', 'prix veranda', 'veranda royan', 'veranda charente maritime'],
  },
  {
    slug: 'pergolas',
    nav: 'Pergolas bioclimatiques',
    title: 'Pergolas bioclimatiques',
    h1: 'Pergolas bioclimatiques en Charente-Maritime',
    metaTitle: 'Pergola bioclimatique en Charente-Maritime (17) — Pose & devis | Fenêtres & Vérandas LUZ',
    metaDescription:
      'Pergola bioclimatique aluminium à lames orientables, adossée ou autoportée, à Royan, Jonzac, Saintes et en Charente-Maritime. Concept Alu et Soliso, options coulissants de verre, stores zip, LED. Devis gratuit.',
    icon: 'pergola',
    card: 'Lames orientables, coulissants de verre, stores zip, LED : votre terrasse devient une vraie pièce à vivre.',
    lead: 'La pergola bioclimatique transforme la terrasse en pièce de vie extérieure : ombre à midi, soleil le soir, abri quand il pleut. Adossée à la maison ou posée au bord de la piscine, nous la concevons sur mesure en aluminium.',
    hero: { real: 'double-pergola-bioclimatique-pays-jonzacais' },
    facts: [
      { label: 'Fabricants', value: 'Concept Alu, Soliso' },
      { label: 'Type', value: 'Adossée ou autoportée, lames orientables' },
      { label: 'Options', value: 'Coulissants de verre, stores zip, LED, chauffage' },
      { label: 'Coloris', value: 'Anthracite 7016, blanc 9016, tous RAL' },
    ],
    sections: [
      {
        title: 'Comment fonctionne une pergola bioclimatique ?',
        text: [
          'La toiture est composée de lames en aluminium orientables de 0 à 160° : ouvertes, elles laissent passer le soleil et l’air ; inclinées, elles créent de l’ombre tout en ventilant ; fermées, elles forment un toit étanche dont l’eau est évacuée par les poteaux. Un capteur de pluie peut les fermer automatiquement, un anémomètre les sécurise par grand vent.',
        ],
      },
      {
        title: 'Fermer sa pergola pour en profiter plus longtemps',
        text: [
          'Coulissants de verre pour couper le vent d’ouest sans perdre la vue, stores verticaux zip screen pour l’intimité et la protection solaire, éclairage LED intégré dans les lames, chauffage radiant : votre pergola s’équipe progressivement, au fil des saisons et des envies. Toutes ces options peuvent être ajoutées après la pose.',
        ],
      },
      {
        title: 'Pergola toile ou pergola à lames ?',
        text: [
          'La pergola store Soliso (toile enroulable sur structure aluminium) est une alternative plus légère et plus économique, très efficace contre le soleil. Nous vous aidons à choisir selon l’usage, l’exposition et le budget.',
        ],
      },
    ],
    gammes: [
      { title: 'Pergola bioclimatique', marque: 'Concept Alu', text: 'Lames orientables motorisées, structure aluminium sur mesure, adossée ou îlot, modules accolés pour les grandes terrasses. Évolutive : LED, stores, coulissants, domotique.' },
      { title: 'Pergola store', marque: 'Soliso', text: 'Toile tendue rétractable sur structure alu, très bonne tenue au vent, coloris de toiles nombreux. Pour ombrager une terrasse à moindre coût.' },
    ],
    marques: ['concept-alu', 'soliso'],
    arguments: [
      { title: 'Étude sur mesure', text: 'Orientation, vent dominant, fixation sur la façade ou dalle : notre métreur adapte la structure à votre terrasse.' },
      { title: 'Pergola exposée en showroom', text: 'Testez l’orientation des lames et les stores zip sur la pergola de notre agence de Jonzac.' },
      { title: 'Pose et raccordement électrique', text: 'Nos équipes posent la pergola et raccordent moteurs, LED et capteurs.' },
      { title: 'Évolutive', text: 'Commencez par la structure, ajoutez coulissants, stores ou chauffage plus tard : tout est prévu dès le départ.' },
    ],
    faq: [
      { q: 'Quel est le prix d’une pergola bioclimatique ?', a: 'De 8 000 à 15 000 € posée pour une pergola adossée de 12 à 20 m² en aluminium à lames motorisées, hors options. Coulissants de verre, stores zip et LED viennent en supplément. Une pergola toile Soliso démarre autour de 4 000 € posée.' },
      { q: 'Faut-il une autorisation pour une pergola ?', a: 'Une pergola de plus de 5 m² d’emprise au sol nécessite une déclaration préalable en mairie ; au-delà de 20 m², un permis de construire. Nous fournissons les plans.' },
      { q: 'Une pergola bioclimatique est-elle étanche ?', a: 'Lames fermées, la toiture est étanche à la pluie et l’eau s’évacue par les poteaux. Elle n’est pas hermétique comme une véranda : c’est une pièce extérieure.' },
      { q: 'Résiste-t-elle au vent du littoral ?', a: 'Oui : structures dimensionnées pour les zones ventées, fixation ingénieurée, capteur de vent qui ouvre les lames automatiquement. Nos pergolas sont posées à Royan, Saint-Palais, Oléron et La Tremblade.' },
    ],
    croisee: 'pergola-royan',
    keywords: ['pergola', 'pergola bioclimatique', 'prix pergola bioclimatique', 'pergola royan'],
  },
  {
    slug: 'carports-pool-house',
    nav: 'Carports & pool houses',
    title: 'Carports, pool houses & auvents',
    h1: 'Carports, pool houses et auvents aluminium',
    metaTitle: 'Carport, pool house & auvent alu en Charente-Maritime (17) — Pose & devis | LUZ',
    metaDescription:
      'Carport aluminium, pool house, auvent et abri de terrasse sur mesure à Royan, Jonzac et en Charente-Maritime. Structures Concept Alu à toit plat, pose par nos équipes. Devis gratuit.',
    icon: 'carport',
    card: 'Abriter la voiture, équiper la piscine, protéger l’entrée : des structures alu à toit plat, sobres et durables.',
    lead: 'Un carport aluminium protège vos véhicules du soleil et des embruns sans permis de garage ; un pool house habille la piscine ; un auvent abrite l’entrée. Tous sont fabriqués sur mesure, dans les mêmes coloris que vos menuiseries.',
    hero: { real: 'carport-aluminium-royan' },
    facts: [
      { label: 'Fabricants', value: 'Concept Alu, SIB' },
      { label: 'Structures', value: 'Toit plat alu, panneaux isolés ou polycarbonate' },
      { label: 'Usages', value: 'Carport, pool house, auvent, abri terrasse' },
      { label: 'Finitions', value: 'Coloris au choix, bardage, LED' },
    ],
    sections: [
      {
        title: 'Carports aluminium',
        text: [
          'Un ou deux véhicules, adossé à la maison ou autoportant, avec ou sans local de rangement fermé : le carport aluminium à toit plat s’intègre aux maisons contemporaines comme aux maisons charentaises. Toiture en panneaux sandwich isolés ou en polycarbonate pour laisser passer la lumière, évacuation des eaux intégrée dans les poteaux, éclairage LED en option.',
        ],
      },
      {
        title: 'Pool houses et abris de piscine',
        images: ['pool-house-alu'],
        text: [
          'Local technique, cuisine d’été, coin ombragé : le pool house aluminium reprend les codes de la pergola et de l’extension avec des parois pleines ou vitrées, un bardage bois ou alu et une toiture étanche. Nous le dessinons dans la continuité de votre terrasse.',
        ],
      },
      {
        title: 'Auvents et marquises',
        text: [
          'Pour protéger une porte d’entrée ou une porte de garage de la pluie, l’auvent aluminium à toit plat ou vitré est posé en une demi-journée, assorti à vos menuiseries.',
        ],
      },
    ],
    gammes: [
      { title: 'Carport & abri', marque: 'Concept Alu', text: 'Structures alu sur mesure, toit plat, modules accolés pour plusieurs véhicules.' },
      { title: 'Carport SIB', marque: 'SIB', text: 'Carports aluminium à toiture plate, montants fins, grande portée.' },
    ],
    marques: ['concept-alu'],
    arguments: [
      { title: 'Sans entretien', text: 'Aluminium thermolaqué : ni peinture, ni traitement, résistant aux embruns.' },
      { title: 'Cohérence esthétique', text: 'Mêmes coloris et profils que vos fenêtres, portail et pergola pour une façade harmonieuse.' },
      { title: 'Pose rapide', text: 'Structure préfabriquée, montage en 1 à 2 jours sur plots ou dalle existante.' },
      { title: 'Déclaration préalable', text: 'Nous fournissons les plans nécessaires à votre déclaration de travaux.' },
    ],
    faq: [
      { q: 'Quel est le prix d’un carport aluminium ?', a: 'Entre 5 000 et 12 000 € posé pour un carport une à deux voitures selon les dimensions, la toiture et les options (bardage, rangement, LED).' },
      { q: 'Faut-il une autorisation pour un carport ?', a: 'Oui : déclaration préalable au-delà de 5 m² d’emprise au sol, permis de construire au-delà de 20 m². Nous préparons les plans.' },
    ],
    keywords: ['carport', 'pool house', 'auvent'],
  },
  {
    slug: 'volets',
    nav: 'Volets & portes de garage',
    title: 'Volets & portes de garage',
    h1: 'Volets roulants, volets battants et portes de garage',
    metaTitle: 'Volets roulants, battants alu & portes de garage en Charente-Maritime (17) | LUZ',
    metaDescription:
      'Pose de volets roulants motorisés, volets battants aluminium EHRET et portes de garage Gypass à Jonzac, Royan et en Charente-Maritime. Rénovation sans travaux, motorisation Somfy. Devis gratuit.',
    icon: 'volet',
    card: 'Volets roulants motorisés, battants alu sans entretien, portes de garage sectionnelles : les fermetures qui isolent et sécurisent.',
    lead: 'Confort d’été, isolation d’hiver, sécurité et façade soignée : volets roulants, volets battants aluminium et portes de garage sont posés par nos équipes, en rénovation comme en neuf.',
    hero: { real: 'volets-battants-alu-ehret-pays-jonzacais' },
    facts: [
      { label: 'Volets roulants', value: 'Janneau, Soprofen — rénovation, bloc-baie, solaire' },
      { label: 'Volets battants', value: 'EHRET, Janneau — aluminium isolant' },
      { label: 'Portes de garage', value: 'Gypass — sectionnelle, latérale' },
      { label: 'Motorisation', value: 'Somfy io / RTS, solaire' },
    ],
    sections: [
      {
        title: 'Volets roulants',
        images: ['volet-roulant-detail'],
        text: [
          'En rénovation, le volet roulant se pose en coffre extérieur ou sous linteau sans toucher à la fenêtre ; en remplacement de menuiserie, le bloc-baie intègre volet et fenêtre en un seul ensemble parfaitement isolé. Lames aluminium injectées de mousse, manœuvre motorisée filaire, radio ou solaire (sans câblage), commande individuelle ou centralisée.',
        ],
      },
      {
        title: 'Volets battants aluminium',
        text: [
          'Le volet battant alu conserve l’allure traditionnelle de la maison charentaise sans la corvée de peinture : lames pleines, persiennées ou à lames orientables, panneaux isolants, pentures et espagnolettes assorties. Des dizaines de coloris, dont les gris et les verts profonds typiques de la région.',
        ],
      },
      {
        title: 'Portes de garage',
        images: ['porte-garage-sectionnelle'],
        text: [
          'Sectionnelle plafond pour libérer l’espace devant le garage, latérale pour conserver la hauteur sous plafond, avec portillon intégré, hublots ou finitions imitation bois : les portes Gypass sont fabriquées sur mesure et motorisées, avec possibilité de raccordement à votre domotique.',
        ],
      },
    ],
    gammes: [
      { title: 'Volets roulants', marque: 'Janneau / Soprofen', text: 'Coffres rénovation, tunnel, bloc-baie, moustiquaire intégrée, motorisation Somfy.' },
      { title: 'Volets battants', marque: 'EHRET', text: 'Aluminium plein, persienné, isolant ; lames fixes ou orientables ; large gamme de coloris.' },
      { title: 'Portes de garage', marque: 'Gypass', text: 'Sectionnelles plafond ou latérales, portillon, hublots, panneaux lisses, rainurés ou aspect bois.' },
    ],
    marques: ['janneau', 'ehret', 'soprofen', 'gypass', 'somfy'],
    arguments: [
      { title: 'Motorisation Somfy', text: 'Pilotage à la télécommande, à l’application ou par scénarios (fermeture centralisée le soir).' },
      { title: 'Pose sans travaux', text: 'Les volets rénovation se posent en une demi-journée par fenêtre, sans reprise de maçonnerie.' },
      { title: 'Isolation et TVA réduite', text: 'Les volets isolants bénéficient de la TVA à 5,5 % en rénovation.' },
      { title: 'Dépannage assuré', text: 'Notre service dépannage intervient sur tous les volets, même ceux que nous n’avons pas posés.' },
    ],
    faq: [
      { q: 'Combien coûte un volet roulant motorisé ?', a: 'De 500 à 1 000 € posé par fenêtre selon les dimensions, le type de coffre et la motorisation. Les volets solaires, sans câblage, sont légèrement plus chers mais évitent les travaux électriques.' },
      { q: 'Volet battant alu ou bois ?', a: 'L’aluminium ne demande aucun entretien et ne se déforme pas ; le bois reste possible pour les secteurs protégés. Les modèles EHRET imitent fidèlement les volets bois traditionnels.' },
      { q: 'Réparez-vous les volets roulants en panne ?', a: 'Oui : remplacement de moteur, de tablier, de sangle ou de manivelle. Voir notre service dépannage (forfait diagnostic 121 € TTC).' },
    ],
    aides: true,
    keywords: ['volet roulant', 'volet battant', 'porte de garage', 'volet roulant royan'],
  },
  {
    slug: 'portails-clotures',
    nav: 'Portails & clôtures',
    title: 'Portails, clôtures & garde-corps',
    h1: 'Portails, clôtures, garde-corps et barrières de piscine en aluminium',
    metaTitle: 'Portail aluminium en Charente-Maritime (17) — HORIZAL, motorisation, pose & devis | LUZ',
    metaDescription:
      'Portail aluminium battant ou coulissant HORIZAL, clôtures, garde-corps et barrières de piscine posés à Royan, Jonzac, Oléron et en Charente-Maritime. Portalier agréé, motorisation Somfy / DEA. Devis gratuit.',
    icon: 'portail',
    card: 'Portalier agréé HORIZAL : plus de 300 modèles de portails alu sans soudure, clôtures et garde-corps assortis.',
    lead: 'Battant ou coulissant, plein, ajouré ou à lames horizontales, motorisé ou non : le portail aluminium HORIZAL est fabriqué sur mesure et assemblé sans soudure pour durer, même au bord de la mer. Clôtures, portillons et garde-corps sont dessinés dans la même ligne.',
    hero: { real: 'portail-alu-horizal-etaules' },
    facts: [
      { label: 'Fabricant', value: 'HORIZAL (France)' },
      { label: 'Modèles', value: '+300 portails sur mesure' },
      { label: 'Laquage', value: 'Qualicoat & Qualimarine (bord de mer)' },
      { label: 'Motorisation', value: 'Somfy, DEA — enterrée ou à bras' },
    ],
    sections: [
      {
        title: 'Portails aluminium',
        text: [
          'Battant à un ou deux vantaux quand la place le permet, coulissant sur rail ou autoportant sans rail au sol pour les entrées en pente ou étroites : nous vous conseillons selon votre terrain. Les portails HORIZAL sont assemblés mécaniquement, sans soudure, ce qui évite toute corrosion aux jonctions ; le laquage Qualimarine les protège des embruns.',
        ],
      },
      {
        title: 'Clôtures et portillons',
        text: [
          'Pleines, barreaudées ou à lisses horizontales, les clôtures aluminium reprennent le motif du portail pour une entrée cohérente. Panneaux sur muret, sur poteaux ou brise-vue toute hauteur.',
        ],
      },
      {
        title: 'Garde-corps et barrières de piscine',
        text: [
          'Garde-corps vitrés, en tôle découpée au laser, perforée ou à barreaux inox pour vos balcons, terrasses et escaliers ; barrières de piscine aluminium conformes à la norme NF P90-306. Fabrication sur mesure après relevé précis.',
        ],
      },
      {
        title: 'Motorisation',
        text: [
          'Motorisation enterrée invisible, à bras ou à vérins pour les battants, moteur à crémaillère pour les coulissants ; ouverture par télécommande, digicode, interphone vidéo ou smartphone. Nous motorisons aussi les portails existants.',
        ],
      },
    ],
    gammes: [
      { title: 'Portails HORIZAL', marque: 'HORIZAL', text: 'Battants et coulissants, styles contemporain, classique ou traditionnel, tôle laser, lames, bicoloration.' },
      { title: 'Clôtures & portillons', marque: 'HORIZAL', text: 'Assortis au portail, pleins, ajourés ou à lisses, avec ou sans muret.' },
      { title: 'Garde-corps', marque: 'HORIZAL', text: 'Verre, tôle laser, tôle perforée, câbles inox ; pour balcons, terrasses et escaliers.' },
      { title: 'Barrières de piscine', marque: 'HORIZAL', text: 'Aluminium, norme NF P90-306, portillon à fermeture automatique.' },
    ],
    marques: ['horizal', 'somfy', 'dea'],
    arguments: [
      { title: 'Portalier agréé HORIZAL', text: 'Formés par le fabricant à la conception et à la pose ; garantie constructeur et pose décennale.' },
      { title: 'Maçonnerie coordonnée', text: 'Piliers, seuils, fourreaux électriques : nous préparons ou coordonnons les travaux préalables.' },
      { title: 'Dépannage & motorisation', text: 'Notre service dépannage intervient sur les motorisations, même sur un portail existant.' },
      { title: 'Résistance au bord de mer', text: 'Laquage Qualimarine et visserie inox pour Royan, Oléron et la presqu’île d’Arvert.' },
    ],
    faq: [
      { q: 'Quel est le prix d’un portail aluminium posé ?', a: 'De 3 000 à 5 000 € pour un portail battant standard posé, de 4 500 à 8 000 € pour un coulissant motorisé sur mesure, hors maçonnerie. Les modèles à tôle laser ou grande largeur sont chiffrés sur étude.' },
      { q: 'Portail battant ou coulissant ?', a: 'Le coulissant s’impose si l’entrée est en pente, si la place manque pour le débattement des vantaux ou si vous garez souvent devant. Le battant reste plus économique et convient aux entrées planes.' },
      { q: 'Peut-on motoriser un portail existant ?', a: 'Oui dans la plupart des cas, si le portail et les piliers sont en bon état. Nous vérifions lors d’une visite et proposons la motorisation adaptée (Somfy ou DEA).' },
    ],
    croisee: 'portail-royan',
    keywords: ['portail', 'portail alu', 'portail royan', 'garde corps', 'cloture', 'barriere piscine', 'motorisation portail'],
  },
  {
    slug: 'stores',
    nav: 'Stores',
    title: 'Stores extérieurs & intérieurs',
    h1: 'Stores bannes, stores extérieurs et intérieurs',
    metaTitle: 'Store banne & stores extérieurs en Charente-Maritime (17) — Soliso, pose & devis | LUZ',
    metaDescription:
      'Store banne coffre ou cassette, store vertical zip screen, moustiquaires et stores intérieurs Soliso posés à Royan, Jonzac et en Charente-Maritime par un Expert Storiste. Devis gratuit.',
    icon: 'store',
    card: 'Expert Storiste Soliso : stores bannes, zip screen, moustiquaires et stores intérieurs, motorisés et résistants au vent.',
    lead: 'Ombrager la terrasse, protéger les vitrages du soleil, garder les insectes dehors, tamiser la lumière à l’intérieur : nous sommes Expert Storiste Soliso, fabricant français depuis 1947.',
    hero: { real: 'store-banne-hermes-royan' },
    facts: [
      { label: 'Fabricant', value: 'Soliso Europe (France, depuis 1947)' },
      { label: 'Extérieur', value: 'Bannes, zip screen, BSO, pergolas stores' },
      { label: 'Intérieur', value: 'Vénitiens, rouleaux, cloisons japonaises' },
      { label: 'Motorisation', value: 'Somfy, capteurs vent et soleil' },
    ],
    sections: [
      {
        title: 'Stores bannes',
        text: [
          'Coffre intégral pour protéger la toile, semi-coffre ou monobloc traditionnel : le store banne s’adapte à la façade et au budget. Bras à ressorts renforcés, toiles acryliques teintées masse résistantes aux UV, lambrequin enroulable, éclairage LED et chauffage intégrés en option. Motorisation Somfy avec capteur de vent pour une rentrée automatique.',
        ],
      },
      {
        title: 'Stores verticaux zip screen et BSO',
        text: [
          'Le store vertical zip screen ferme une pergola ou protège une baie vitrée du soleil et du vent, avec une toile tendue guidée par fermeture éclair qui résiste aux rafales. Le brise-soleil orientable (BSO) à lames aluminium régule la lumière au degré près sur les extensions et vérandas.',
        ],
      },
      {
        title: 'Moustiquaires et stores intérieurs',
        images: ['store-interieur-veranda', 'moustiquaire-baie'],
        text: [
          'Moustiquaires enroulables ou plissées sur mesure pour fenêtres, portes-fenêtres et baies coulissantes. À l’intérieur : stores vénitiens, enrouleurs, bateaux, cloisons japonaises et stores plissés pour vérandas.',
        ],
      },
    ],
    gammes: [
      { title: 'Stores bannes', marque: 'Soliso', text: 'Coffre, cassette, monobloc ; avancées jusqu’à 4 m ; toiles acryliques ou micro-perforées.' },
      { title: 'Stores verticaux', marque: 'Soliso', text: 'Zip screen, toiles screen ou occultantes, pour terrasses, pergolas et façades.' },
      { title: 'Stores intérieurs', marque: 'Soliso', text: 'Vénitiens alu ou bois, enrouleurs, plissés, cloisons japonaises.' },
    ],
    marques: ['soliso', 'somfy'],
    arguments: [
      { title: 'Expert Storiste', text: 'Formation fabricant, conseil sur les toiles et la tenue au vent selon votre exposition.' },
      { title: 'Pose et réglage', text: 'Fixation adaptée au support (pierre, parpaing, isolation extérieure), réglage de l’inclinaison et des fins de course.' },
      { title: 'Motorisation Somfy', text: 'Télécommande, capteurs soleil / vent, intégration TaHoma.' },
      { title: 'Dépannage toiles et moteurs', text: 'Remplacement de toile, de bras ou de moteur sur tous stores, y compris anciens.' },
    ],
    faq: [
      { q: 'Quel est le prix d’un store banne ?', a: 'De 1 500 à 3 500 € posé pour un store banne coffre motorisé de 4 à 5 m de large selon l’avancée, la toile et les options (LED, capteur vent). Un store traditionnel manuel démarre autour de 900 €.' },
      { q: 'Quelle toile choisir en bord de mer ?', a: 'Une toile acrylique teintée masse, garantie contre la décoloration, avec un coffre intégral pour la protéger des embruns lorsqu’elle est repliée. Un capteur de vent est indispensable sur le littoral.' },
      { q: 'Posez-vous des stores sur une pergola existante ?', a: 'Oui, les stores zip screen s’adaptent à la plupart des pergolas aluminium, y compris d’autres marques, après relevé de cotes.' },
    ],
    croisee: 'store-royan',
    keywords: ['store banne', 'store exterieur', 'store royan', 'storiste royan'],
  },
  {
    slug: 'motorisation',
    nav: 'Motorisation & domotique',
    title: 'Motorisation, domotique & alarme',
    h1: 'Motorisation, domotique et alarme Somfy',
    metaTitle: 'Motorisation portail, volets & domotique Somfy en Charente-Maritime (17) | LUZ',
    metaDescription:
      'Motorisation de portails, portes de garage, volets et stores, domotique TaHoma et alarme Somfy Home Keeper Pro installées à Jonzac, Royan et en Charente-Maritime. Devis gratuit.',
    icon: 'moteur',
    card: 'Portail, porte de garage, volets, stores et alarme pilotés d’une seule application : Somfy et DEA installés par LUZ.',
    lead: 'Ouvrir le portail depuis la voiture, fermer tous les volets d’un geste, recevoir une alerte si une porte s’ouvre : la motorisation et la domotique rendent la maison plus confortable et plus sûre. Nous installons Somfy et DEA sur vos équipements neufs ou existants.',
    hero: { real: 'portail-horizal-motorisation-integree-semussac' },
    facts: [
      { label: 'Marques', value: 'Somfy, DEA System' },
      { label: 'Équipements', value: 'Portails, garages, volets, stores, pergolas' },
      { label: 'Domotique', value: 'Somfy TaHoma, io-homecontrol' },
      { label: 'Alarme', value: 'Somfy Home Keeper Pro' },
    ],
    sections: [
      {
        title: 'Motorisation de portails et portes de garage',
        images: ['motorisation-portail-telecommande'],
        text: [
          'Motorisation à bras, à vérins ou enterrée pour les portails battants, à crémaillère pour les coulissants, moteur plafonnier pour les portes de garage sectionnelles. Ouverture par télécommande, clavier à code, badge, interphone vidéo ou smartphone. Nous motorisons les portails que nous posons comme les portails existants, après vérification de leur état.',
        ],
      },
      {
        title: 'Volets, stores et pergolas motorisés',
        text: [
          'Moteurs Somfy filaires, radio io ou solaires pour les volets roulants ; moteurs de stores avec capteurs de vent et de soleil ; pergolas à lames orientables pilotées. Une commande centralisée ferme toute la maison le soir ou pendant vos absences.',
        ],
      },
      {
        title: 'Domotique et alarme',
        images: ['alarme-domotique-tablette'],
        text: [
          'La box Somfy TaHoma réunit volets, portail, éclairage, chauffage et alarme dans une seule application, avec des scénarios (départ, nuit, vacances) et une simulation de présence. L’alarme Somfy Home Keeper Pro, installée et paramétrée par nos soins, reste fonctionnelle en cas de coupure d’électricité ou d’internet et vous prévient sur votre téléphone.',
        ],
      },
    ],
    gammes: [
      { title: 'Motorisations Somfy', marque: 'Somfy', text: 'Portails, garages, volets, stores, pergolas ; protocole io-homecontrol sécurisé.' },
      { title: 'Motorisations DEA', marque: 'DEA System', text: 'Automatismes robustes pour portails lourds et usages intensifs.' },
      { title: 'TaHoma & Home Keeper Pro', marque: 'Somfy', text: 'Box domotique et alarme connectée, installation et mise en service par LUZ.' },
    ],
    marques: ['somfy', 'dea'],
    arguments: [
      { title: 'Installateurs formés', text: 'Nos techniciens sont formés aux motorisations Somfy et DEA et à la programmation TaHoma.' },
      { title: 'Compatible avec l’existant', text: 'Nous motorisons volets, portails et stores que vous possédez déjà.' },
      { title: 'Dépannage réactif', text: 'Panne de moteur, télécommande perdue, reprogrammation : notre service dépannage se déplace.' },
      { title: 'Évolutif', text: 'Commencez par le portail, ajoutez les volets puis l’alarme : tout communique.' },
    ],
    faq: [
      { q: 'Combien coûte la motorisation d’un portail ?', a: 'De 1 200 à 2 500 € posée selon le type de portail (battant ou coulissant), le moteur (à bras, à vérins, enterré) et les accessoires (digicode, interphone).' },
      { q: 'Peut-on motoriser des volets roulants existants ?', a: 'Oui, si le tablier et le coffre sont en bon état : le moteur remplace l’axe manuel. Les moteurs solaires évitent tout câblage.' },
      { q: 'L’alarme fonctionne-t-elle sans internet ?', a: 'Oui : Home Keeper Pro est autonome, avec batterie et transmetteur de secours ; l’application n’est qu’un moyen de pilotage supplémentaire.' },
    ],
    keywords: ['motorisation portail', 'domotique', 'alarme somfy'],
  },
  {
    slug: 'braseros',
    nav: 'Braseros',
    title: 'Braseros & planchas',
    h1: 'Braseros et planchas Vulcan',
    metaTitle: 'Brasero plancha Vulcan à Jonzac & Royan — Showroom & conseils | Fenêtres & Vérandas LUZ',
    metaDescription:
      'Braseros-planchas Vulcan en acier à découvrir et tester dans notre showroom de Jonzac : cuisine extérieure au feu de bois, convivialité toute l’année. Conseils et livraison en Charente-Maritime.',
    icon: 'brasero',
    card: 'Le feu au centre de la terrasse : braseros-planchas Vulcan en acier, à voir et tester à Jonzac.',
    lead: 'Après la pergola et la terrasse, il manquait le feu. Les braseros-planchas Vulcan réunissent famille et amis autour d’une cuisson au bois, du printemps aux soirées d’hiver. Venez les voir en démonstration dans notre showroom.',
    hero: { gen: 'brasero-terrasse' },
    facts: [
      { label: 'Marque', value: 'Vulcan' },
      { label: 'Matériau', value: 'Acier épais, plaque de cuisson' },
      { label: 'Usage', value: 'Brasero, plancha, chauffage extérieur' },
      { label: 'Où', value: 'Showroom de Jonzac' },
    ],
    sections: [
      {
        title: 'Cuisiner et se chauffer au feu de bois',
        text: [
          'Le brasero-plancha combine un foyer central et une plaque de cuisson annulaire en acier : au centre, le feu ; autour, une zone de cuisson dont la température décroît vers l’extérieur, pour saisir viandes, poissons et légumes en même temps. Le soir venu, il devient un chauffage d’ambiance qui prolonge la soirée sur la terrasse.',
        ],
      },
      {
        title: 'Modèles et accessoires',
        text: [
          'Plusieurs diamètres pour 4 à 12 convives, sur pied haut ou bas, avec couvercles, grilles, planches et housses de protection. Nous vous conseillons le modèle adapté à votre terrasse et à votre usage.',
        ],
      },
    ],
    gammes: [{ title: 'Braseros-planchas', marque: 'Vulcan', text: 'Foyer acier, plaque de cuisson intégrée, plusieurs diamètres et hauteurs, accessoires de cuisson.' }],
    marques: ['vulcan'],
    arguments: [
      { title: 'Démonstration en showroom', text: 'Voyez le brasero allumé et testez la cuisson à Jonzac (sur rendez-vous).' },
      { title: 'Conseil d’aménagement', text: 'Placement sur la terrasse, distance par rapport à la pergola et aux menuiseries : nous vous guidons.' },
    ],
    faq: [
      { q: 'Peut-on utiliser un brasero sous une pergola ?', a: 'Sous une pergola bioclimatique, lames ouvertes et avec une distance suffisante, oui. Nous vous conseillons l’emplacement en fonction de votre installation.' },
      { q: 'Où voir les braseros ?', a: 'Dans notre showroom de Jonzac (Saint-Germain-de-Lusignan), aux horaires d’ouverture ; démonstration sur rendez-vous.' },
    ],
    keywords: ['brasero', 'brasero plancha'],
  },
  {
    slug: 'terrasses-bois',
    nav: 'Terrasses bois',
    title: 'Terrasses bois',
    h1: 'Terrasses bois et composite',
    metaTitle: 'Terrasse bois en Charente-Maritime (17) — Pose & devis | Fenêtres & Vérandas LUZ',
    metaDescription: 'Terrasses en bois et composite TWIC posées à Jonzac, Royan et en Charente-Maritime, en accompagnement de votre pergola ou véranda.',
    icon: 'terrasse',
    card: 'Le prolongement naturel de la pergola : terrasses bois et composite TWIC (gamme à venir).',
    lead: 'Pour compléter une pergola, une véranda ou un pool house, nous intégrons prochainement à notre offre les terrasses bois et composite TWIC.',
    hero: { gen: 'terrasse-bois' },
    facts: [{ label: 'Marque', value: 'TWIC' }],
    sections: [],
    gammes: [],
    marques: ['twic'],
    arguments: [],
    faq: [],
    keywords: ['terrasse bois'],
    draft: true,
  },
];

export const prestationsPubliees = prestations.filter((p) => !p.draft);
export const prestationBySlug = (slug: string) => prestations.find((p) => p.slug === slug);

/** Ordre d'affichage dans le menu et les cartes (les plus recherchées d'abord). */
export const prestationsMenu = prestationsPubliees;

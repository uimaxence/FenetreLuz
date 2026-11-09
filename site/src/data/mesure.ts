/**
 * Mesure d'audience et des campagnes, soumise au consentement (voir components/Consent.astro et scripts/mesure.ts).
 *
 * La balise Google `googleTag` porte deux destinations, réglées côté Google : Google Analytics (G-BDZBKG9237)
 * et Google Ads (AW-723822044). La charger suffit à alimenter les deux.
 *
 * Les libellés de conversion sont ceux des actions qui existaient déjà dans le compte Google Ads
 * (relevés dans le conteneur Tag Manager de l'ancien site) : les réutiliser conserve l'historique.
 */
export const mesure = {
  googleTag: 'G-BDZBKG9237',
  conversions: {
    /** Formulaire de devis ou de contact envoyé. */
    devis: 'AW-723822044/_FYVCIK1i_0BENzLktkC',
    /** Formulaire envoyé pour un dépannage. */
    depannage: 'AW-723822044/heGbCIyEwfgCENzLktkC',
    /** Clic sur le numéro d'une agence. */
    telJonzac: 'AW-723822044/AF5oCOfJpbkCENzLktkC',
    telRoyan: 'AW-723822044/Z6lOCJSwlvgCENzLktkC',
  },
  /** Durée de validité du choix du visiteur, en jours (6 mois, recommandation CNIL). */
  dureeChoix: 182,
  /** Durée de vie du cookie Google Analytics, en secondes (13 mois, plafond recommandé par la CNIL). */
  dureeCookie: 60 * 60 * 24 * 395,
} as const;

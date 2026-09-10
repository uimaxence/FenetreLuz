# Mail à Benoît — accès aux avis Google des deux agences

> Copie du mail envoyé (ou à envoyer) pour obtenir : (1) l'accès gestionnaire aux 2 fiches Google Business, (2) un projet Google Cloud pour la clé API Places.
> Ce qui est attendu en retour alimente `site/src/data/avis.ts` (liens des fiches, liens « laisser un avis », note, nombre, verbatims) et `site/src/data/agences.ts` (`googleReviewUrl`).

---

**Objet : Site fenetresluz.com – accès aux avis Google des agences de Jonzac et Royan (15 min)**

Bonjour Benoît,

Pour afficher sur le nouveau site vos vraies notes et vos vrais avis Google (page d'accueil, page Avis, pages agences, boutons et QR codes « Laisser un avis »), j'ai besoin de deux accès. Rien à installer : ce sont deux réglages dans vos comptes Google, une quinzaine de minutes en tout. Tout reste la propriété de LUZ et je n'ai à aucun moment besoin de votre mot de passe.

Mon adresse à ajouter dans les deux cas : **maxencecailleau.pro@gmail.com**

**Étape 1 – M'ajouter comme gestionnaire des deux fiches Google (5 min)**

C'est l'accès indispensable : il me permet de récupérer les liens « laisser un avis », les identifiants des fiches et les avis eux-mêmes.

1. Connectez-vous à Google avec le compte qui gère les fiches (celui qui reçoit les notifications quand un client laisse un avis), puis allez sur https://business.google.com.
2. Sélectionnez la fiche de Jonzac (Fenêtres & Vérandas LUZ – Saint-Germain-de-Lusignan).
3. Cliquez sur le menu ⋮ (trois points) en haut de la fiche, puis « Paramètres de la fiche d'établissement », puis « Personnes et accès ».
4. Cliquez sur « Ajouter », saisissez maxencecailleau.pro@gmail.com, choisissez le rôle « Gestionnaire », puis « Inviter ».
5. Recommencez pour la fiche de Royan (Breuillet).

Je reçois une invitation par mail et je l'accepte : cette étape est terminée.

Si vous ne voyez pas « Personnes et accès », c'est que le compte utilisé n'est pas propriétaire de la fiche (fiche créée par un ancien prestataire ou par Guest Suite, par exemple). Dites-le-moi, on récupère d'abord la propriété.

**Étape 2 – Me donner accès à un projet Google Cloud pour la clé API (10 min)**

Pour que la note, le nombre d'avis et les derniers avis se mettent à jour automatiquement sur le site, Google impose une « clé API » rattachée à un projet Google Cloud, lui-même rattaché à un moyen de paiement. Rassurez-vous : le site n'interroge Google que quelques fois par mois, très loin du palier gratuit, et je fixe un quota qui rend tout dépassement impossible. Je recommande que ce projet soit créé sur le compte Google de LUZ, pour qu'il vous appartienne et ne dépende pas de moi.

1. Avec le même compte Google, allez sur https://console.cloud.google.com et acceptez les conditions d'utilisation.
2. En haut à gauche, cliquez sur le sélecteur de projet, puis « Nouveau projet ». Nommez-le « Site fenetresluz » et cliquez sur « Créer ».
3. Menu ☰ (en haut à gauche), puis « Facturation », puis « Associer un compte de facturation » et « Créer un compte de facturation » : renseignez les coordonnées de l'entreprise et une carte bancaire, puis validez.
4. Menu ☰, puis « IAM et administration », puis « IAM », puis « Accorder l'accès » : saisissez maxencecailleau.pro@gmail.com, choisissez le rôle « Éditeur », puis « Enregistrer ».

Je fais ensuite le reste de mon côté : activation de l'API, création de la clé, restriction de la clé au seul site fenetresluz.com, quota et alerte de consommation.

**Si vous préférez ne pas manipuler**

On bloque 15 minutes en visio avec partage d'écran : vous restez aux commandes de votre compte, je vous indique où cliquer. Proposez-moi un créneau.

**Ce que ça donnera sur le site**

- La note et le nombre d'avis de chaque agence, mis à jour automatiquement.
- Cinq avis Google par agence, actualisés automatiquement (Google n'en fournit pas davantage par ce canal). Si vous souhaitez en mettre d'autres en avant, je les recopie depuis la fiche grâce à l'accès de l'étape 1 : indiquez-moi lesquels.
- Les boutons et QR codes « Laisser un avis » qui ouvrent directement le formulaire Google de la bonne agence.

Si l'abonnement Guest Suite est toujours actif, transmettez-moi aussi les accès ou l'identifiant du widget : je pourrai récupérer l'historique des avis collectés par ce biais.

Merci d'avance, et n'hésitez pas à m'appeler si un écran ne correspond pas à ce que je décris.

Bien à vous,
Maxence

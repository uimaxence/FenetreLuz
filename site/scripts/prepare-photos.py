#!/usr/bin/env python3
"""
Prépare les photos brutes (../assets/PHOTOS SITE LUZ) pour le site :
- oriente selon l'EXIF puis SUPPRIME toutes les métadonnées (GPS des photos de téléphone inclus)
- redimensionne (sans jamais agrandir) et ré-encode en JPEG progressif
- écrit dans src/assets/photos/{real,equipe,agences}/ avec des noms de fichiers stables (slugs)
- génère src/data/photos.generated.json (dimensions) pour référence

Usage : npm run photos   (ou python3 scripts/prepare-photos.py)
"""
import json, os, sys
from pathlib import Path
from PIL import Image, ImageOps

HERE = Path(__file__).resolve().parent
SITE = HERE.parent
SRC = SITE.parent / "assets" / "PHOTOS SITE LUZ"
OUT = SITE / "src" / "assets" / "photos"
R = "REALISATIONS "
P2 = "PHOTOS SITE 2/"  # deuxième envoi de photos (octobre 2026), même dossier source
P3 = "Photo site/"  # troisième envoi (WeTransfer de Benoît, 27 octobre 2026) : vérandas et extensions Concept Alu

# slug -> liste de photos sources (la première = photo principale)
REALISATIONS = {
    "veranda-pergola-piscine-pays-jonzacais": [
        R + "/VERANDAS CONCEPT ALU/VERANDA ET PERGOLA PAYS JONZACAIS 7016 LAME BIOCLOMATIQUE PRODUITS DUO_.jpg"],
    "veranda-sur-mesure-pays-jonzacais": [
        R + "/VERANDAS CONCEPT ALU/VERANDA SUR MESURE PAYS JONZACAIS_.jpg"],
    "extension-extanxia-toit-plat-pays-jonzacais": [
        R + "/EXTANSIA CONCEPT ALU /EXTANSIA PAYS JONZACAIS ISOLATION ++ BSO TOIT PLAT FINITION BOIS HABITATION EN ALU_.jpg",
        R + "/EXTANSIA CONCEPT ALU /EXTANSIA PAYS JONZACAIS ISOLATION ++ BSO TOIT PLAT FINITION BOIS HABITATION EN ALU_(1).jpg",
        R + "/EXTANSIA CONCEPT ALU /EXTANSIA PAYS JONZACAIS ISOLATION ++ BSO TOIT PLAT FINITION BOIS HABITATION EN ALU_(2).jpg",
        R + "/EXTANSIA CONCEPT ALU /EXTANSIA PAYS JONZACAIS ISOLATION ++ BSO TOIT PLAT FINITION BOIS HABITATION EN ALU_(3).jpg"],
    "double-pergola-bioclimatique-pays-jonzacais": [
        R + "/PERGOLA CONCEPT ALU/DOUBLE PERGOLA 7016 PAYS JONZACAIS.jpg"],
    "double-pergola-bioclimatique-pays-royannais": [
        R + "/PERGOLA CONCEPT ALU/DOUBLE PERGO 7016 PAYS ROYANNAIS_.jpg",
        R + "/PERGOLA CONCEPT ALU/DOUBLE PERGO 7016 PAYS ROYANNAIS_(1).jpg"],
    "pergola-coulissants-verre-store-zip-pays-royannais": [
        R + "/PERGOLA CONCEPT ALU/PERGO 7016 COULISSANT DE VERRE STORE ZIP SUR MESURE SECTEUR PAYS ROYANNAIS_(3).jpg",
        R + "/PERGOLA CONCEPT ALU/PERGO 7016 COULISSANT DE VERRE STORE ZIP SUR MESURE SECTEUR PAYS ROYANNAIS_(1).jpg",
        R + "/PERGOLA CONCEPT ALU/PERGO 7016 COULISSANT DE VERRE STORE ZIP SUR MESURE SECTEUR PAYS ROYANNAIS_(2).jpg",
        R + "/PERGOLA CONCEPT ALU/PERGO 7016 COULISSANT DE VERRE STORE ZIP SUR MESURE SECTEUR PAYS ROYANNAIS_.jpg"],
    "pergola-bioclimatique-adossee-jonzac": [
        R + "/PERGOLA CONCEPT ALU/PERGO BIOCLIMATIQUE ADOSSéE  LAME BIOCLIMATIQUE SUR MESURE JONZAC.jpg",
        R + "/PERGOLA CONCEPT ALU/PERGO BIOCLIMATIQUE ADOSSéE  LAME BIOCLIMATIQUE SUR MESURE.jpg"],
    "pergola-blanche-sur-mesure-pays-royannais": [
        R + "/PERGOLA CONCEPT ALU/PETITE PERGOLA 9016 SUR MESURE PAYS ROYANNAIS_.jpg"],
    "pergola-semussac": [R + "/PERGOLA CONCEPT ALU/Pergo -  Semussac.jpg"],
    "pergola-bioclimatique-ile-oleron": [R + "/PERGOLA CONCEPT ALU/Quillet - Oléron.jpg"],
    "carport-aluminium-royan": [R + "/Carport /Carport - Royan.jpg"],
    "carport-sur-mesure-breuillet": [R + "/Carport /Carport SIB sur Mesure - Breuillet .jpg"],
    "baies-vitrees-alu-janneau-archiac": [
        R + "/Coulissant Alu Janneau /MENUISERIES JANNEAU ALU ESTIVALE - Archiac (18).jpg",
        R + "/Coulissant Alu Janneau /MENUISERIES JANNEAU ALU ESTIVALE (17).jpg"],
    "baie-vitree-alu-janneau-saujon": [
        R + "/Coulissant Alu Janneau /MENUISERIES JANNEAU ALU ESTIVALE - Saujon (19).jpg"],
    "menuiseries-alu-contemporaines-janneau-guitinieres": [
        R + "/Fenêtres Alu Janneau /PS 1 - Dépose totale - Janneau - Alu contemporain - Guitinières _.jpg",
        R + "/Fenêtres Alu Janneau /PS 1 - Dépose totale - Janneau - Alu contemporain - bloc baie - Guitinières _.jpg",
        R + "/Coulissant Alu Janneau /CC2 - Dépose totale - Janneau - Alu contemporain - Guitinières _.jpg"],
    "fenetres-pvc-volets-alu-saint-genis-de-saintonge": [
        R + "/FENETRES PVC/MENUISERIES JANNEAU PVC LITTORAL .J + VOLETS ALUMINIUM Saint genis de Saintonge (2).jpg",
        R + "/FENETRES PVC/MENUISERIES JANNEAU PVC LITTORAL .J + VOLETS ALUMINIUM Saint genis de Saintonge (6).jpg",
        R + "/FENETRES PVC/MENUISERIES JANNEAU PVC LITTORAL .J + VOLETS ALUMINIUM Saint genis de Saintonge(4).jpg",
        R + "/FENETRES PVC/MENUISERIES JANNEAU PVC LITTORAL .J + VOLETS ALUMINIUMSaint genis de Saintonge  (3).jpg",
        R + "/FENETRES PVC/MENUISERIES JANNEAU PVC LITTORAL .J + VOLETS ALUMINIUMSaint genis de Saintonge  (5).jpg"],
    "fenetres-pvc-anthracite-clion": [
        R + "/FENETRES PVC/MENUISERIES JANNEAU PVC LITTORAL 7016 - Clion .J.jpg",
        R + "/FENETRES PVC/MENUISERIES JANNEAU PVC LITTORAL .J.jpg"],
    "fenetres-pvc-renovation-saint-sulpice-de-royan": [
        R + "/FENETRES PVC/PVC - Antalis - Pose en Réno - Saint Sulpice de Royan_.jpg",
        R + "/FENETRES PVC/PVC - Antalis - Pose en Réno - Saint Sulpice de Royan_(1).jpg"],
    "fenetres-pvc-renovation-montendre": [
        R + "/FENETRES PVC/PVC - Janneau - Littoral .J Pose en Réno - Montendre_.jpg",
        R + "/FENETRES PVC/PVC - Janneau - Littoral .J Pose en Réno - Montendre_(1).jpg"],
    "fenetres-pvc-petits-bois-pons": [
        R + "/FENETRES PVC/PVC - Littoral.J - Dépose totale - Petit bois incorporés - Pons_.jpg",
        R + "/FENETRES PVC/PVC - Littoral.J - Dépose totale - Petit bois incorporés - Pons_(1).jpg"],
    "fenetres-alu-janneau-domaine-jonzac": [
        R + "/Fenêtres Alu Janneau /Alu Janneau - parclose moulurées - boutons ogive - dépose totale - Domaine La cannonerie - Jonzac_(1).jpg",
        R + "/Fenêtres Alu Janneau /Alu Janneau - parclose moulurées - boutons ogive - dépose totale - Domaine La cannonerie - Jonzac_(2).jpg",
        R + "/Fenêtres Alu Janneau /Alu Janneau - parclose moulurées - boutons ogive - dépose totale - Domaine La cannonerie - Jonzac_.jpg"],
    "menuiserie-alu-sable-reaux-sur-trefle": [
        R + "/Fenêtres Alu Janneau /MEN ALU JANNEAU 2800SABLE sur mesure - Reaux sur trefle.jpeg"],
    "fenetres-bois-alu-meo-saint-genis-de-saintonge": [
        R + "/MéO /Fenêtres Bois_Alu MéO - Saint genis de Saintonge_(1).jpg",
        R + "/MéO /Fenêtres Bois_Alu MéO - Saint genis de Saintonge_(2).jpg",
        R + "/MéO /Fenêtres Bois_Alu MéO - Saint genis de Saintonge_.jpg"],
    "porte-entree-cintree-meo-gemozac": [
        R + "/MéO /PE cintrée - MéO - Gémozac_.jpg",
        R + "/MéO /PE cintrée - MéO - Gémozac_(1).jpg",
        R + "/MéO /20240202_134250.jpg",
        R + "/MéO /20240202_134337 (1).jpg"],
    "porte-entree-meo-ruisseau-la-tremblade": [
        R + "/MéO /PE 1 Vantail - Modèle Ruisseau - Bois int Alu ext - La tremblade_.jpg",
        R + "/MéO /PE 1 Vantail - Modèle Ruisseau - Bois int Alu ext - La tremblade_(1).jpg"],
    "porte-entree-meo-fiction-saint-simon-de-bordes": [
        R + "/MéO /PE 1 Vantail Modèle Fiction - intérieur bois - extérieur Alu - St Simon de Bordes_.jpg",
        R + "/MéO /PE 1 Vantail Modèle Fiction - intérieur bois - extérieur Alu - St Simon de Bordes_(1).jpg"],
    "porte-entree-meo-phedre-saint-palais-sur-mer": [
        R + "/MéO /PE 1 Vantail MéO Phèdre - Saint Palais sur Mer.jpg"],
    "porte-entree-cybele-menuiseries-alu-val-de-livenne": [
        R + "/MéO /PE Cybele + Menuiseries Alu - Val de Livenne.jpg"],
    "porte-entree-meo-manoir-saintes": [
        R + "/MéO /PE Manoir - Saintes_(1).jpg",
        R + "/MéO /Pe Manoir - Saintes_.jpg"],
    "porte-entree-manoir-volets-alu-ozillac": [
        R + "/MéO /PE Manoir Manoir 1 Vantail 7016 + Volets battants Alu Isolant - Ozillac_.jpg"],
    "porte-entree-meo-apparence-saint-georges-de-didonne": [
        R + "/MéO /PE MéO - Modèle Apparence -  Intérieur bois ext Alu - Royan _ St georges de Didonne_(1).jpg",
        R + "/MéO /PE MéO - Modèle Apparence -  Intérieur bois ext Alu - Royan _ St georges de Didonne_.jpg"],
    "porte-entree-meo-riviere-cognac": [
        R + "/MéO /Porte 2 Tiercé MéO Modèle Rivière extérieur - Cognac.jpg",
        R + "/MéO /Porte 2 Tiercé MéO Modèle Rivière intérieur - Cognac.jpg"],
    "porte-entree-meo-saujon": [
        R + "/MéO /Porte MéO - Saujon  (7).jpg",
        R + "/MéO /Porte MéO - Saujon (6).jpg",
        R + "/MéO /Porte MéO Saujon  (8).jpg"],
    "porte-fenetre-meo-front-de-mer-royan": [
        R + "/MéO /Porte fenêtre MéO - Int bois Ext Alu - Dépose totale - Front de mer de Royan_(1).jpg",
        R + "/MéO /Porte fenêtre MéO - Int bois Ext Alu - Dépose totale - Front de mer de Royan_(2).jpg",
        R + "/MéO /Porte fenêtre MéO - Int bois Ext Alu - Dépose totale - Front de mer de Royan_.jpg"],
    "garde-corps-horizal-decoupe-laser-meschers": [
        R + "/PORTAIL-PORTILLON-GARDE CORPS /GARDE CORPS HORIZAL DECOUPE LASER SUR MESURE MESCHERS SUR GIRONDE.jpg"],
    "garde-corps-horizal-vitrage-jonzac": [
        R + "/PORTAIL-PORTILLON-GARDE CORPS /GARDE CORPS HORIZAL SUR MESURE VITRAGE JONZAC.jpg",
        R + "/PORTAIL-PORTILLON-GARDE CORPS /GARDE CORPS HORIZAL SUR MESURE VITRAGE JONZAC(1).jpg",
        R + "/PORTAIL-PORTILLON-GARDE CORPS /GARDE CORPS HORIZAL SUR MESURE VITRAGE JONZAC(2).jpg"],
    "portail-alu-horizal-etaules": [R + "/PORTAIL-PORTILLON-GARDE CORPS /PORTAIL ALU HORIZAL - Etaules .jpg"],
    "portail-alu-horizal-jarnac": [R + "/PORTAIL-PORTILLON-GARDE CORPS /PORTAIL ALUMINIUM HORIZAL Jarnac  (2).jpg"],
    "portail-horizal-motorisation-integree-semussac": [
        R + "/PORTAIL-PORTILLON-GARDE CORPS /PORTAIL HORIZAL 7016 MOTORISATION INTEGRES PILLIERS ALU SEMUSSAC.jpg"],
    "portail-alu-horizal-mirambeau": [R + "/PORTAIL-PORTILLON-GARDE CORPS /Portail ALU HORIZAL - Mirambeau  (6).jpg"],
    "portail-alu-horizal-breuillet": [R + "/PORTAIL-PORTILLON-GARDE CORPS /Portail Alu HORIZAL - Breuillet (8).JPG"],
    "portail-portillon-horizal-saint-palais-sur-mer": [
        R + "/PORTAIL-PORTILLON-GARDE CORPS /Portail et Portillon Horizal - Saint palais sur mer_.jpg"],
    "portail-portillon-horizal-vaux-sur-mer": [
        R + "/PORTAIL-PORTILLON-GARDE CORPS /Portail et Portillon Horizal - Vaux sur Mer_(1).jpg",
        R + "/PORTAIL-PORTILLON-GARDE CORPS /Portail et Portillon Horizal - Vaux sur Mer_(2).jpg",
        R + "/PORTAIL-PORTILLON-GARDE CORPS /Portail et Portillon Horizal - Vaux sur Mer_.jpg"],
    "portillon-cloture-horizal-montendre": [
        R + "/PORTAIL-PORTILLON-GARDE CORPS /Portillon et clôture HORIZAL - Montendre.jpeg"],
    "porte-garage-gypass-laterale-chene-dore-pays-royannais": [
        R + "/PORTE DE GARAGE/PORTE DE GARAGE SUR MESURE GYPASS SECTIONNELLE LATERALE PAYS ROYANNAIS CHENE DORE_.jpg"],
    "porte-garage-sectionnelle-gypass-rouge-pays-jonzacais": [
        R + "/PORTE DE GARAGE/PORTE SECTIONNELLE GYPASS PLUS INSERT INOX ROUGE PAYS JONZACAIS_.jpg"],
    "porte-garage-sectionnelle-gypass-verte-pays-royannais": [
        R + "/PORTE DE GARAGE/PORTE SECTIONNELLE GYPASS VERTE PAYS ROYANNAIS_.jpg"],
    "porte-garage-sectionnelle-gypass-portillon-pays-jonzacais": [
        R + "/PORTE DE GARAGE/Porte Sectionnelle GYPASS PLUS PORTILLON ET VITRAGE PAYS JONZACAIS_.jpg"],
    "moustiquaires-enroulables-neuillac": [
        R + "/Store banne - Moustiquaires etc /Moustiquaires enroulables - Neuillac_.jpg",
        R + "/Store banne - Moustiquaires etc /Moustiquaires enroulables - Neuillac_(1).jpg"],
    "store-banne-hermes-royan": [R + "/Store banne - Moustiquaires etc /Store Hermes - Royan_.jpg"],  # liste des réalisations seulement (demande de Benoît, 12 oct. 2026)
    "volets-battants-alu-persiennes-saint-georges-de-didonne": [
        R + "/VOLETS BATTANTS /Volet battant Alu persienné - st georges de Didonne_.jpg",
        R + "/VOLETS BATTANTS /Volet battant Alu persienné - st georges de Didonne_(1).jpg"],
    "volets-battants-alu-ehret-pays-jonzacais": [
        R + "/VOLETS BATTANTS /Volets Battants Alu Ehret ISOLATION SUR MESURE PAYS JONZACAIS.jpg",
        R + "/VOLETS BATTANTS /Volets Battants Alu Ehret ISOLATION SUR MESURE PAYS JONZACAIS(1).jpg",
        R + "/VOLETS BATTANTS /Volets Battants Alu Ehret ISOLATION SUR MESURE PAYS JONZACAIS(2).jpg"],
    # --- « PHOTOS SITE 2 » (deuxième envoi, 9 octobre 2026) ---
    "veranda-concept-alu-les-mathes": [P2 + "véranda concept alu Les Mathes 1.jpg", P2 + "véranda concept alu Les Mathes 2.jpg",
        P3 + "20230329_140511.jpg", P3 + "20230329_140539.jpg"],  # 20230329_140618 et _140454 du 3e envoi = doublons des deux premières
    "baie-vitree-alu-janneau-jonzac": [P2 + "Baie vitrée Janneau Jonzac 1.jpg", P2 + "Baie vitrée Janneau Jonzac 2.jpg"],
    "porte-entree-meo-royan": [P2 + "Porte d'entrée MéO Royan.jpg"],
    "pergola-bioclimatique-saujon": [P2 + "pergola concept alu Saujon.jpg"],
    "pergola-blanche-la-couronne": [P2 + "pergola blanche concept alu La Couronne 1.jpg", P2 + "pergola blanche concept alu La Couronne 2.jpg"],
    "store-banne-breuillet": [P2 + "Store banne Breuillet.jpg"],
    "volets-battants-alu-ehret-jonzac": [P2 + "Volets Battants Ehret Jonzac.jpg"],
    "portail-portillon-horizal-etaules": [P2 + "portail + portillon Horizal Etaules.jpg"],
    "portail-noir-horizal-pays-royannais": [P2 + "portail noir Horizal pays royannais.jpg"],  # « portail noir Horizal.jpg » est un doublon
    "garde-corps-horizal-saint-palais-sur-mer": [P2 + "Garde-corps Horizal Saint-Palais.jpeg"],
    "garde-corps-horizal-arvert": [P2 + "Garde-corps Horizal Arvert.jpg"],
    # --- « Photo site » (troisième envoi, 27 octobre 2026) : uniquement des vérandas / extensions Concept Alu.
    # Communes retrouvées par le GPS des photos quand il existait ; sinon ville « Charente-Maritime » (à préciser par Benoît).
    "extension-toit-plat-puits-de-lumiere": [P3 + "07492632db2f426bfd3d21b8c9d67259.jpeg", P3 + "020d7e1b3fabc6991b7be1968ab30fa4.jpeg", P3 + "0705730712db4116b381e649ca6ac829.jpeg"],
    "extension-toit-plat-interieur-avant-finitions": [P3 + "7950658ba547480574316b59a063005a.jpeg"],
    "veranda-toit-plat-anthracite-terrasse-carrelee": [P3 + "received_1541636329955009.jpeg"],
    "extension-toit-plat-fin-de-chantier": [P3 + "1770234862777-20260202_175316.jpg"],
    "veranda-blanche-toit-plat": [P3 + "1773253626672-IMG_1516.jpg"],
    "extension-toit-plat-terrasse-pierre": [P3 + "1792069642402-IMG_2878.jpg"],
    "veranda-toit-plat-facade-arriere": [P3 + "20220913_183637 - Copie.jpg"],
    "extension-bardage-aluminium-chantier": [P3 + "481758121_1154408732984146_7003855513500661346_n.jpg"],
    "extension-noire-volets-roulants-integres": [P3 + "received_974616640376428.jpeg", P3 + "received_686229433023520.jpeg"],  # 482462851_…_n.jpg = même chantier en 480 px
    "extension-vitree-maison-en-pierre": [P3 + "483156597_2089464941525162_4523439805523037966_n.jpg"],
    "veranda-toit-plat-soubassement-pierre": [P3 + "550181848_1352996692853547_713619525706574925_n.jpg"],
    "veranda-grise-toit-plat-pavillon": [P3 + "550459443_1316117726766344_5718129827023614683_n.jpg", P3 + "550856396_1729890057716795_2383764182008527775_n.jpg", P3 + "551315263_2473637446354124_1192137725797606193_n.jpg"],
    "veranda-anthracite-fin-de-chantier": [P3 + "588219353_1651137659186969_192240215381690117_n.jpg"],
    "extension-extanxia-beige-toiture-gravillonnee": [P3 + "EXTANXIA 1015 1.jpg", P3 + "EXTANXIA 1015 3.jpg"],
    "veranda-homea-piscine-gimeux": [P3 + "HOMEA GIMEUX (2).jpg"],
    "veranda-armonia-blanche-maison-de-maitre": [P3 + "VERANDA ARMONIA CONCEPT ALU.jpg"],
    "veranda-armonia-sable-cognac": [P3 + "VERANDA CONCEPT ALU ARMONIA (10).jpg", P3 + "VERANDA CONCEPT ALU ARMONIA (11).jpg"],
    "veranda-armonia-stores-interieurs": [P3 + "VERANDA CONCEPT ALU ARMONIA (15).jpg"],
    "veranda-armonia-blanche-saint-georges-antignac": [P3 + "VERANDA CONCEPT ALU ARMONIA (9).JPG"],
    "veranda-homea-piscine-couverte": [P3 + "VERANDA HOMEA CONCEPT ALU.jpg"],
    "veranda-armonia-anthracite-nercillac": [P3 + "Véranda Armonia 7016 CONCEPT ALU (1).jpg", P3 + "Véranda Armonia 7016 CONCEPT ALU (5).jpg"],
    "veranda-armonia-terrasse-surelevee": [P3 + "Véranda Armonia Concept Alu (10).jpg", P3 + "Véranda Armonia Concept Alu (11).jpg"],
    "veranda-armonia-sable-maison-de-caractere": [P3 + "Véranda Armonia Concept Alu (7).jpg", P3 + "Véranda Armonia Concept Alu (8).jpg"],
    "veranda-armonia-sable-store-zip": [P3 + "Véranda Armonia CONCEPT ALU.jpeg"],
    "veranda-extanxia-anthracite-terrasse": [P3 + "Véranda Extanxia Concept Alu (11).jpg"],
    "extension-extanxia-noire-volet-roulant": [P3 + "Véranda Extanxia Concept Alu Noir 2100(1).jpg"],
    "sas-entree-homea-nieul-le-virouil": [P3 + "Véranda Homéa Concept Alu (7).jpg", P3 + "Véranda Homéa Concept Alu (5).jpg"],
}

EQUIPE = {
    "benoit": "EQUIPE /BENOIT GERANT.jpg",
    "elodie": "EQUIPE /Elodie.jpg",
    "steve": "EQUIPE /Steve.jpg",
    "laura": "EQUIPE /LAURA ASSISTANTE CO_.jpg",
    "lydia": "EQUIPE /LYDIA ASSISTANTE CO.jpg",
    "mickael": "EQUIPE /MICKEAL METREUR.jpg",
    "loris": "EQUIPE /LORIS POSEUR.jpg",
    "maxime": "EQUIPE /MAXIME POSEUR.jpg",
    "patrick": "EQUIPE /PATRICK POSEUR.jpg",
    "sebastien": "EQUIPE /SEBASTIEN POSEUR.jpg",
    "sebastien-2": "EQUIPE /SEBASTIEN POSEUR_.jpg",
    "groupe-bureau": "EQUIPE /GROUPE BUREAU_COMMERCIAL.jpg",
    "equipe-commerciale": "EQUIPE /Equipe Commercial.png",
    "showroom-steve-elodie": "EQUIPE /STEVE ET ELODIE COMMERCIAUX.jpg",
    "pose-securite-1": "EQUIPE /Outils _ SYAM _ sécurité_(1).jpg",
    "pose-securite-2": "EQUIPE /Outils _ SYAM _ sécurité_(2).jpg",
    "pose-securite-3": "EQUIPE /Outils _ SYAM _ sécurité_.jpg",
    "certificat-meo": "EQUIPE /MEO.jpg",
    "benoit-eco-responsable-janneau": "EQUIPE /Benoit - Eco Responsable Janneau.jpg",
    "olivier": P2 + "Olivier.jpg",
}

AGENCES = {"jonzac": "AGENCES/AGENCE JONZAC.jpg", "royan": "AGENCES/AGENCE ROYAN.jpg"}

MAX_REAL, MAX_PORTRAIT, MAX_GROUP = 2200, 1400, 2400
QUALITY = 82


def process(src: Path, dst: Path, max_edge: int) -> dict:
    im = Image.open(src)
    im = ImageOps.exif_transpose(im)  # applique l'orientation puis on repart sans EXIF
    im = im.convert("RGB")
    w, h = im.size
    if max(w, h) > max_edge:
        im.thumbnail((max_edge, max_edge), Image.LANCZOS)
    dst.parent.mkdir(parents=True, exist_ok=True)
    im.save(dst, "JPEG", quality=QUALITY, optimize=True, progressive=True)  # sans exif => métadonnées supprimées
    return {"w": im.width, "h": im.height, "src": str(src.relative_to(SRC)), "bytes": dst.stat().st_size}


def main():
    if not SRC.exists():
        sys.exit(f"Dossier source introuvable : {SRC}")
    manifest = {"real": {}, "equipe": {}, "agences": {}}
    errors = []
    for slug, files in REALISATIONS.items():
        manifest["real"][slug] = []
        for i, rel in enumerate(files, start=1):
            src = SRC / rel
            if not src.exists():
                errors.append(rel); continue
            dst = OUT / "real" / f"{slug}-{i}.jpg"
            info = process(src, dst, MAX_REAL)
            info["file"] = dst.name
            manifest["real"][slug].append(info)
            print(f"real  {dst.name}  {info['w']}x{info['h']}  {info['bytes']//1024} Ko")
    for name, rel in EQUIPE.items():
        src = SRC / rel
        if not src.exists():
            errors.append(rel); continue
        max_edge = MAX_GROUP if name in ("groupe-bureau", "equipe-commerciale", "showroom-steve-elodie", "certificat-meo", "benoit-eco-responsable-janneau") or name.startswith("pose-") else MAX_PORTRAIT
        dst = OUT / "equipe" / f"{name}.jpg"
        info = process(src, dst, max_edge); info["file"] = dst.name
        manifest["equipe"][name] = info
        print(f"equipe {dst.name}  {info['w']}x{info['h']}  {info['bytes']//1024} Ko")
    for name, rel in AGENCES.items():
        src = SRC / rel
        if not src.exists():
            errors.append(rel); continue
        dst = OUT / "agences" / f"{name}.jpg"
        info = process(src, dst, MAX_GROUP); info["file"] = dst.name
        manifest["agences"][name] = info
        print(f"agence {dst.name}  {info['w']}x{info['h']}  {info['bytes']//1024} Ko")
    (SITE / "src" / "data").mkdir(parents=True, exist_ok=True)
    with open(SITE / "src" / "data" / "photos.generated.json", "w") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=1)
    if errors:
        print("\nFICHIERS INTROUVABLES :"); [print("  -", e) for e in errors]
    total = sum(p.stat().st_size for p in OUT.rglob("*.jpg"))
    print(f"\nTerminé. {sum(len(v) for v in manifest['real'].values())} photos chantiers, "
          f"{len(manifest['equipe'])} équipe, {len(manifest['agences'])} agences — {total/1e6:.1f} Mo au total.")


if __name__ == "__main__":
    main()

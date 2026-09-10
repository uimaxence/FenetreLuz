#!/usr/bin/env python3
"""
Normalise les visuels générés et les logos déposés dans ../assets :
- ../assets/PHOTOS SITE LUZ/<id>.(png|jpg|jpeg|webp)  → src/assets/gen/<id>.jpg (max 2400 px, JPEG q85)
- ../assets/logos/<dossier>/<nom>.(png|jpg|jpeg|gif|webp|svg) → src/assets/logos/<dossier>/<id>.(png|svg)
  (marges blanches/transparentes rognées, max 900 px, renommages connus appliqués)
Usage : python3 scripts/prepare-gen-logos.py
"""
import re, shutil, sys
from pathlib import Path
from PIL import Image, ImageChops

SITE = Path(__file__).resolve().parent.parent
ASSETS = SITE.parent / "assets"
GEN_SRC = ASSETS / "PHOTOS SITE LUZ"
GEN_OUT = SITE / "src" / "assets" / "gen"
LOGO_SRC = ASSETS / "logos"
LOGO_OUT = SITE / "src" / "assets" / "logos"

# identifiants attendus (voir IMAGES-A-GENERER.md) — seuls ces fichiers sont pris dans PHOTOS SITE LUZ
GEN_IDS = {
    "brasero-terrasse", "terrasse-bois", "partenariats-hero", "partenariat-ubj-rugby", "partenariat-lions-club",
    "partenariat-eurochestries", "conseil-aides-fenetres", "conseil-prix-veranda", "conseil-prix-pergola",
    "conseil-choisir-fenetres", "conseil-remplacement-fenetre", "volet-roulant-detail", "porte-garage-sectionnelle",
    "store-interieur-veranda", "moustiquaire-baie", "motorisation-portail-telecommande", "alarme-domotique-tablette",
    "pool-house-alu", "cloture-alu-lames", "barriere-piscine-alu", "mur-rideau-bois-alu", "showroom-menuiseries",
    "ambiance-saintes", "ambiance-cognac", "ambiance-oleron", "aides-conseiller-devis", "og-default-alt",
}
GEN_AS_LOGO = {"partenariat-eurochestries": "eurochestries", "partenariat-ubj-rugby-logo": "ubj-rugby", "partenariat-lions-club-logo": "lions-club", "arkea": "arkea"}
RENAMES = {"concept-alu-logo": "concept-alu", "conceptalu": "concept-alu", "meo-logo": "meo"}
IMG_EXT = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".tif", ".tiff"}


def slug(stem: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", stem.lower()).strip("-")
    return RENAMES.get(s, s)


def trim(im: Image.Image) -> Image.Image:
    """Rogne les marges transparentes ou quasi blanches."""
    if im.mode in ("RGBA", "LA"):
        bbox = im.split()[-1].getbbox()
        if bbox:
            im = im.crop(bbox)
        # si l'alpha est plein partout, rogner aussi le blanc
    rgb = im.convert("RGB")
    bg = Image.new("RGB", rgb.size, (255, 255, 255))
    diff = ImageChops.difference(rgb, bg).convert("L").point(lambda p: 255 if p > 18 else 0)
    bbox = diff.getbbox()
    if bbox:
        pad = max(4, int(min(im.size) * 0.03))
        bbox = (max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(im.width, bbox[2] + pad), min(im.height, bbox[3] + pad))
        im = im.crop(bbox)
    return im


def save_logo(im: Image.Image, out: Path, origin: str):
    if getattr(im, "n_frames", 1) > 1:
        im.seek(0)
    im = im.convert("RGBA")
    im = trim(im)
    if im.width > 900:
        im.thumbnail((900, 900), Image.LANCZOS)
    # logo blanc sur transparent (ex. TWIK) : on le pose sur un fond vert LUZ pour qu'il reste lisible sur les cartes blanches
    px = [p for p in im.getdata() if p[3] > 30]
    if px and sum(1 for p in px if min(p[:3]) > 225) / len(px) > 0.6 and im.getchannel("A").getextrema()[0] < 30:
        pad = int(min(im.size) * 0.18)
        bg = Image.new("RGBA", (im.width + 2 * pad, im.height + 2 * pad), (21, 68, 24, 255))
        bg.alpha_composite(im, (pad, pad))
        im = bg
    im.save(out, "PNG", optimize=True)
    print(f"logo  {out.parent.name}/{out.name:30} {im.width}x{im.height}  {out.stat().st_size // 1024} Ko  (← {origin})")


def do_gen():
    GEN_OUT.mkdir(parents=True, exist_ok=True)
    n = 0
    for f in sorted(GEN_SRC.iterdir()):
        if f.suffix.lower() not in IMG_EXT:
            continue
        sid = slug(f.stem)
        if sid in GEN_AS_LOGO:  # logo déposé parmi les visuels → dossier partenaires
            out = LOGO_OUT / "partenaires" / f"{GEN_AS_LOGO[sid]}.png"
            out.parent.mkdir(parents=True, exist_ok=True)
            save_logo(Image.open(f), out, f.name)
            n += 1
            continue
        if sid not in GEN_IDS:
            continue
        im = Image.open(f).convert("RGB")
        if max(im.size) > 2400:
            im.thumbnail((2400, 2400), Image.LANCZOS)
        out = GEN_OUT / f"{sid}.jpg"
        im.save(out, "JPEG", quality=85, optimize=True, progressive=True)
        print(f"gen   {out.name:40} {im.width}x{im.height}  {out.stat().st_size // 1024} Ko  (← {f.name})")
        n += 1
    return n


def do_logos():
    n = 0
    for folder in ("certifications", "marques", "partenaires"):
        src = LOGO_SRC / folder
        dst = LOGO_OUT / folder
        dst.mkdir(parents=True, exist_ok=True)
        if not src.exists():
            continue
        for f in sorted(src.iterdir()):
            if f.name.startswith("."):
                continue
            sid = slug(f.stem)
            if f.suffix.lower() == ".svg":
                out = dst / f"{sid}.svg"
                shutil.copyfile(f, out)
                print(f"logo  {folder}/{out.name:30} svg  (← {f.name})")
                n += 1
                continue
            if f.suffix.lower() not in IMG_EXT:
                continue
            save_logo(Image.open(f), dst / f"{sid}.png", f.name)
            n += 1
    return n


if __name__ == "__main__":
    g = do_gen() if GEN_SRC.exists() else 0
    l = do_logos() if LOGO_SRC.exists() else 0
    print(f"\nTerminé : {g} visuels générés, {l} logos.")

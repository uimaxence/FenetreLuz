#!/usr/bin/env python3
"""
Génère src/data/zones-map.json : la carte vectorielle des zones d'intervention LUZ
(Charente-Maritime + Charente) affichée par le composant ZonesMap.astro.

Sources (téléchargées à l'exécution, mises en cache dans le dossier temporaire) :
- contours communaux + intercommunalité de rattachement : https://geo.api.gouv.fr
- contours départementaux : https://france-geojson.gregoiredavid.fr

Les 3 zones (historique Jonzac / actuelle Royan / en développement) suivent la carte cantonale
fournie par Benoît (roadmap-luz.md §2), approchées par intercommunalité (EPCI). La liste des
communes reste à faire valider commune par commune ; il suffit de modifier ZONES ci-dessous.

Dépendance : shapely (pip install shapely).   Usage : python3 scripts/build-zones-map.py
"""
from __future__ import annotations
import json, math, sys, tempfile, urllib.request
from pathlib import Path

try:
    from shapely.geometry import shape, mapping
    from shapely.ops import unary_union
except ImportError:
    sys.exit("shapely manquant : pip install shapely")

SITE = Path(__file__).resolve().parent.parent
OUT = SITE / "src" / "data" / "zones-map.json"
CACHE = Path(tempfile.gettempdir()) / "luz-geo"
CACHE.mkdir(exist_ok=True)

# Zone -> codes EPCI (SIREN) — voir https://geo.api.gouv.fr/epcis?codeDepartement=17
ZONES = {
    "jonzac": ["200041523"],  # CC de la Haute-Saintonge (Jonzac, Archiac, Montendre, Montguyon, Mirambeau, Pons…)
    "royan": ["241700640", "241700624", "241700699"],  # CA Royan Atlantique, CC Île d'Oléron, CC Bassin de Marennes
    "dev": [
        "200036473",  # CA Saintes Grandes Rives
        "241700517",  # CC Cœur de Saintonge (Saint-Porchaire)
        "241700632",  # CC Gémozac et Saintonge viticole
        "200070514",  # CA Grand Cognac (Cognac, Jarnac, Châteauneuf, Segonzac)
        "200029734",  # CC des 4B Sud Charente (Barbezieux, Baignes)
        "241600303",  # CC du Rouillacais
    ],
}
EPCI_TO_ZONE = {code: z for z, codes in ZONES.items() for code in codes}

# Repères affichés sur la carte : (nom de commune dans geo.api, id, libellé, type, lien)
CITIES = [
    ("Saint-Germain-de-Lusignan", "agence-jonzac", "Agence de Jonzac", "agence", "/agences/jonzac/"),
    ("Breuillet", "agence-royan", "Agence de Royan", "agence", "/agences/royan/"),
    ("Saintes", "saintes", "Saintes", "ville", "/menuiserie-saintes/"),
    ("Cognac", "cognac", "Cognac", "ville", "/menuiserie-cognac/"),
    ("Saint-Pierre-d'Oléron", "ile-oleron", "Île d’Oléron", "ville", "/menuiserie-ile-oleron/"),
    ("Royan", "royan", "Royan", "town", None),
    ("Jonzac", "jonzac", "Jonzac", "town", None),
    ("Montendre", "montendre", "Montendre", "town", None),
    ("Montguyon", "montguyon", "Montguyon", "town", None),
    ("Mirambeau", "mirambeau", "Mirambeau", "town", None),
    ("Pons", "pons", "Pons", "town", None),
    ("Archiac", "archiac", "Archiac", "town", None),
    ("Gémozac", "gemozac", "Gémozac", "town", None),
    ("Saujon", "saujon", "Saujon", "town", None),
    ("La Tremblade", "la-tremblade", "La Tremblade", "town", None),
    ("Marennes-Hiers-Brouage", "marennes", "Marennes", "town", None),
    ("Saint-Porchaire", "saint-porchaire", "Saint-Porchaire", "town", None),
    ("Barbezieux-Saint-Hilaire", "barbezieux", "Barbezieux", "town", None),
    ("Jarnac", "jarnac", "Jarnac", "town", None),
    ("Châteauneuf-sur-Charente", "chateauneuf", "Châteauneuf", "town", None),
    ("Rouillac", "rouillac", "Rouillac", "town", None),
]

WIDTH = 1000  # largeur du viewBox ; la hauteur découle des proportions
PAD = 12
TOL_ZONE = 0.0025  # tolérance de simplification (degrés) ≈ 200 m
TOL_DEP = 0.002


def fetch(url: str, name: str) -> dict | list:
    f = CACHE / name
    if not f.exists():
        print("téléchargement", url)
        with urllib.request.urlopen(url, timeout=120) as r:
            f.write_bytes(r.read())
    return json.loads(f.read_text())


def main():
    communes = []
    for dep in ("17", "16"):
        data = fetch(f"https://geo.api.gouv.fr/departements/{dep}/communes?fields=nom,code,codeEpci,population,centre,contour&format=json", f"communes{dep}.json")
        for c in data:
            c["dep"] = dep
        communes += data
    deps = {
        "17": fetch("https://france-geojson.gregoiredavid.fr/repo/departements/17-charente-maritime/departement-17-charente-maritime.geojson", "dep17.geojson"),
        "16": fetch("https://france-geojson.gregoiredavid.fr/repo/departements/16-charente/departement-16-charente.geojson", "dep16.geojson"),
    }

    # Projection : équirectangulaire corrigée à la latitude moyenne, puis mise à l'échelle du viewBox
    k = math.cos(math.radians(45.7))
    dep_geoms = {d: shape(g["geometry"]) for d, g in deps.items()}
    minx = min(g.bounds[0] for g in dep_geoms.values()) * k
    maxx = max(g.bounds[2] for g in dep_geoms.values()) * k
    miny = min(g.bounds[1] for g in dep_geoms.values())
    maxy = max(g.bounds[3] for g in dep_geoms.values())
    scale = (WIDTH - 2 * PAD) / (maxx - minx)
    height = round((maxy - miny) * scale + 2 * PAD)

    def proj(lon: float, lat: float) -> tuple[float, float]:
        return (round((lon * k - minx) * scale + PAD, 1), round((maxy - lat) * scale + PAD, 1))

    def ring_to_d(ring) -> str:
        pts = [proj(x, y) for x, y in ring]
        # supprime les points consécutifs identiques après arrondi
        out = [pts[0]]
        for p in pts[1:]:
            if p != out[-1]:
                out.append(p)
        return "M" + "L".join(f"{x} {y}" for x, y in out) + "Z"

    def geom_to_d(geom) -> str:
        polys = [geom] if geom.geom_type == "Polygon" else list(geom.geoms)
        parts = []
        for p in polys:
            if p.is_empty:
                continue
            parts.append(ring_to_d(p.exterior.coords))
            parts += [ring_to_d(i.coords) for i in p.interiors]
        return "".join(parts)

    zones_out = {}
    for zone, _ in ZONES.items():
        members = [c for c in communes if EPCI_TO_ZONE.get(c.get("codeEpci")) == zone]
        union = unary_union([shape(c["contour"]).buffer(0) for c in members])
        # léger tampon aller-retour pour souder les micro-fentes entre communes, puis simplification
        union = union.buffer(0.0008).buffer(-0.0008).simplify(TOL_ZONE, preserve_topology=True)
        zones_out[zone] = {
            "d": geom_to_d(union),
            "count": len(members),
            "communes": sorted(
                [{"n": c["nom"], "d": c["dep"], "p": c.get("population") or 0} for c in members],
                key=lambda x: x["n"].casefold(),
            ),
        }
        print(f"zone {zone}: {len(members)} communes, path {len(zones_out[zone]['d'])//1024} Ko")

    deps_out = {}
    for d, g in dep_geoms.items():
        simp = g.simplify(TOL_DEP, preserve_topology=True)
        covered = sum(1 for c in communes if c["dep"] == d and c.get("codeEpci") in EPCI_TO_ZONE)
        deps_out[d] = {"nom": deps[d]["properties"]["nom"], "d": geom_to_d(simp), "communes": sum(1 for c in communes if c["dep"] == d), "covered": covered}
        print(f"département {d}: path {len(deps_out[d]['d'])//1024} Ko, {covered} communes couvertes")

    by_name = {c["nom"]: c for c in communes}
    cities = []
    for nom, cid, label, kind, href in CITIES:
        c = by_name.get(nom)
        if not c:
            print("  ! commune introuvable :", nom)
            continue
        x, y = proj(*c["centre"]["coordinates"])
        cities.append({"id": cid, "label": label, "kind": kind, "href": href, "x": x, "y": y, "zone": EPCI_TO_ZONE.get(c.get("codeEpci")), "dep": c["dep"]})

    out = {"viewBox": f"0 0 {WIDTH} {height}", "deps": deps_out, "zones": zones_out, "cities": cities}
    OUT.write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")))
    print(f"\n→ {OUT.relative_to(SITE)} ({OUT.stat().st_size//1024} Ko)")


if __name__ == "__main__":
    main()

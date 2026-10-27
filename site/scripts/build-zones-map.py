#!/usr/bin/env python3
"""
Génère src/data/zones-map.json : la carte vectorielle des zones d'intervention LUZ
(Charente-Maritime + Charente + Nord Gironde) affichée par le composant ZonesMap.astro.

Sources (téléchargées à l'exécution, mises en cache dans le dossier temporaire) :
- contours communaux + intercommunalité de rattachement : https://geo.api.gouv.fr
- contours départementaux : union des contours communaux ci-dessus

Les 2 zones (agence de Jonzac / agence de Royan) suivent la carte cantonale fournie par Benoît
(roadmap-luz.md §2), approchées par intercommunalité (EPCI) ; l'ancienne zone « en développement »
est répartie entre les deux agences (Saintes → Royan, Cognac → Jonzac) à sa demande. La liste des
communes reste à faire valider commune par commune ; il suffit de modifier ZONES ci-dessous.

Dépendance : shapely (pip install shapely).   Usage : python3 scripts/build-zones-map.py
"""
from __future__ import annotations
import json, math, sys, tempfile, urllib.request
from pathlib import Path

try:
    from shapely.geometry import shape, mapping, box
    from shapely.ops import unary_union
except ImportError:
    sys.exit("shapely manquant : pip install shapely")

SITE = Path(__file__).resolve().parent.parent
OUT = SITE / "src" / "data" / "zones-map.json"
CACHE = Path(tempfile.gettempdir()) / "luz-geo"
CACHE.mkdir(exist_ok=True)

# Zone -> codes EPCI (SIREN) — voir https://geo.api.gouv.fr/epcis?codeDepartement=17
ZONES = {
    # Retour de Benoît (9 octobre 2026) : plus de « zone en développement », tout est rattaché à une agence.
    "jonzac": [
        "200041523",  # CC de la Haute-Saintonge (Jonzac, Archiac, Montendre, Montguyon, Mirambeau, Pons…)
        "200070514",  # CA Grand Cognac (Cognac, Jarnac, Châteauneuf, Segonzac)
        "200029734",  # CC des 4B Sud Charente (Barbezieux, Baignes)
        "241600303",  # CC du Rouillacais
        # Nord Gironde (retour de Benoît du 27 octobre 2026 : « jusqu'à Blaye, Berson, Saint-Savin… ») — à valider commune par commune
        "243300811",  # CC de l'Estuaire (Saint-Ciers-sur-Gironde)
        "200023794",  # CC de Blaye (Blaye, Berson)
        "243301181",  # CC Latitude Nord Gironde (Saint-Savin)
    ],
    "royan": [
        "241700640",  # CA Royan Atlantique
        "241700624",  # CC de l'Île d'Oléron
        "241700699",  # CC du Bassin de Marennes
        "200036473",  # CA Saintes Grandes Rives
        "241700517",  # CC Cœur de Saintonge (Saint-Porchaire)
        "241700632",  # CC de Gémozac et de la Saintonge viticole
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
    ("Blaye", "blaye", "Blaye", "town", None),
    ("Saint-Savin", "saint-savin", "Saint-Savin", "town", None),
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
    for dep in ("17", "16", "33"):
        data = fetch(f"https://geo.api.gouv.fr/departements/{dep}/communes?fields=nom,code,codeEpci,population,centre,contour&format=json", f"communes{dep}.json")
        for c in data:
            c["dep"] = dep
        communes += data
    # Contours départementaux reconstitués par union des communes (même source que les secteurs ; le dépôt
    # france-geojson présente un certificat invalide). Seule la partie nord de la Gironde sera visible après cadrage.
    noms = {"17": "Charente-Maritime", "16": "Charente", "33": "Gironde"}
    deps = {}
    for dep, nom in noms.items():
        geom = unary_union([shape(c["contour"]).buffer(0) for c in communes if c["dep"] == dep]).buffer(0.0008).buffer(-0.0008)
        deps[dep] = {"properties": {"nom": nom}, "geometry": mapping(geom)}

    # Secteurs (union des communes par EPCI), calculés avant la projection pour fixer le cadrage
    zone_geoms, zone_members = {}, {}
    for zone in ZONES:
        members = [c for c in communes if EPCI_TO_ZONE.get(c.get("codeEpci")) == zone]
        union = unary_union([shape(c["contour"]).buffer(0) for c in members])
        # léger tampon aller-retour pour souder les micro-fentes entre communes, puis simplification
        zone_geoms[zone] = union.buffer(0.0008).buffer(-0.0008).simplify(TOL_ZONE, preserve_topology=True)
        zone_members[zone] = members

    # Projection : équirectangulaire corrigée à la latitude moyenne, puis mise à l'échelle du viewBox
    k = math.cos(math.radians(45.7))
    dep_geoms = {d: shape(g["geometry"]) for d, g in deps.items()}
    # Cadrage : Charente-Maritime, Charente et les secteurs ; la Gironde n'apparaît que pour sa partie nord (découpée)
    framed = [dep_geoms["17"], dep_geoms["16"], *zone_geoms.values()]
    minx = min(g.bounds[0] for g in framed) * k
    maxx = max(g.bounds[2] for g in framed) * k
    miny = min(g.bounds[1] for g in framed)
    maxy = max(g.bounds[3] for g in framed)
    frame = box(minx / k - 0.08, miny - 0.08, maxx / k + 0.08, maxy + 0.08)
    dep_geoms = {d: (g if d in ("17", "16") else g.intersection(frame)) for d, g in dep_geoms.items()}
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
    for zone in ZONES:
        members, union = zone_members[zone], zone_geoms[zone]
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

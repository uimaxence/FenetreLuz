import type { ImageMetadata } from 'astro';

/**
 * Accès typé aux photos préparées par scripts/prepare-photos.py
 * (src/assets/photos/{real,equipe,agences}). Les imports sont résolus au build par astro:assets.
 */
const realGlob = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/real/*.jpg', { eager: true });
const equipeGlob = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/equipe/*.jpg', { eager: true });
const agencesGlob = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/agences/*.jpg', { eager: true });

const byName = (glob: Record<string, { default: ImageMetadata }>) => {
  const map = new Map<string, ImageMetadata>();
  for (const [path, mod] of Object.entries(glob)) {
    const name = path.split('/').pop()!.replace(/\.jpg$/, '');
    map.set(name, mod.default);
  }
  return map;
};

const real = byName(realGlob);
const equipe = byName(equipeGlob);
const agences = byName(agencesGlob);

/** Photo n°i (1-based) d'une réalisation. */
export function realPhoto(slug: string, i = 1): ImageMetadata | undefined {
  return real.get(`${slug}-${i}`);
}

/** Toutes les photos d'une réalisation, dans l'ordre. */
export function realPhotos(slug: string): ImageMetadata[] {
  const out: ImageMetadata[] = [];
  for (let i = 1; i <= 12; i++) {
    const p = real.get(`${slug}-${i}`);
    if (!p) break;
    out.push(p);
  }
  return out;
}

export function equipePhoto(name: string): ImageMetadata | undefined {
  return equipe.get(name);
}

export function agencePhoto(name: 'jonzac' | 'royan'): ImageMetadata | undefined {
  return agences.get(name);
}

export const isPortrait = (img?: ImageMetadata) => !!img && img.height > img.width;

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Articles /conseils/ — rédigés en Markdown dans src/content/conseils/*.md
 */
const conseils = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/conseils' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    keywords: z.array(z.string()).default([]),
    prestation: z.string().optional(), // slug de la prestation liée (maillage interne)
    cover: z.string().optional(), // id de visuel (voir IMAGES-A-GENERER.md)
    readingTime: z.number().default(5),
    draft: z.boolean().default(false),
  }),
});

export const collections = { conseils };

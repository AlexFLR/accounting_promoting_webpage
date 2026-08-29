import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content lives as Markdown so a non-developer can edit it.
 * Files are stored per language: src/content/blog/en/*.md, .../ro/*.md
 * which gives entry ids like "en/vat-deadlines".
 */

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(70, 'Keep titles under 70 chars for search results'),
      description: z.string().max(160, 'Meta descriptions truncate past 160 chars'),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      author: z.string().default('The team'),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

// Services are NOT a content collection — they live in src/data/services.ts.
// Each has a different page shape, so each gets its own .astro file.
export const collections = { blog };

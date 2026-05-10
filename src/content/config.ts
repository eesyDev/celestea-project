import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string(),
    slug: z.string().optional(),
    noindex: z.boolean().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};
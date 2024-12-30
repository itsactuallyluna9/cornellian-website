import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/articles" }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		author: z.string(),
		description: z.string().default('No description!'),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		minutesRead: z.string().optional(), // provided by plugin
	}),
});

const comics = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/comics" }),
	schema: ({ image }) => z.object({
		title: z.string(),
		author: z.string(),
		description: z.string().default('No description!'),
		pubDate: z.coerce.date(),
	}),
});

export const collections = { articles, comics };

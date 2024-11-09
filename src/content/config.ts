import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		author: z.string(),
		description: z.string().default('No description!'),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
	}),
});

export const collections = { articles };

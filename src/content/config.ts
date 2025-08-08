import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		// 保留唯一的 tags、category、lang 定义
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().nullable().default(""), // 保留 nullable 版本，避免冲突
		lang: z.string().optional().default(""),
		pinned: z.boolean().optional().default(false), // 新增的置顶字段

		/* For internal use */
		prevTitle: z.string().default(""), // 保留唯一的 prevTitle
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});

const specCollection = defineCollection({
	schema: z.object({}),
});

export const collections = {
	posts: postsCollection,
	spec: specCollection,
};

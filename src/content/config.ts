import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const history = defineCollection({
  type: "content",
  schema: z.object({
    era: z.string(),
    title: z.string(),
    desc: z.string(),
    images: z.array(z.string()).max(4).optional(), // 画像最大4枚
    urls: z
      .array(
        z.object({
          url: z.string().url(),
          title: z.string(),
        })
      )
      .optional(), // URL配列
  }),
});

export const collections = {
  blog,
  history,
};

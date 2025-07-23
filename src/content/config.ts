import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
  }),
});

const history = defineCollection({
  type: "content",
  schema: z.object({
    era: z.string(),
    title: z.string(),
    desc: z.string(),
    images: z.array(z.string()).max(3).optional(), // 画像最大3枚
    url: z.string().url().optional(), // URL追加
  }),
});

export const collections = {
  blog,
  history,
};

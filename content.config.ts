import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        layout: z.enum(['home', 'page', 'projects', 'journal', 'project', 'article']),
        date: z.string().optional(),
        tags: z.array(z.string()).default([]),
        subtitle: z.string().optional(),
        cover: z.string().optional(),
        coverAlt: z.string().optional(),
        coverWidth: z.number().default(900),
        coverHeight: z.number().default(460),
        role: z.string().optional(),
        tools: z.array(z.string()).default([]),
        focus: z.string().optional(),
        readingTime: z.number().optional(),
        sourceUrl: z.string().url().optional(),
        liveUrl: z.string().url().optional(),
        coverCaption: z.string().optional(),
        example: z.boolean().default(false)
      })
    })
  }
})

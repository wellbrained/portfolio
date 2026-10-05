import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({ collections: { content: defineCollection({ type: 'page', source: '**/*.md', schema: z.object({ layout: z.enum(['home', 'page', 'projects', 'journal', 'project', 'article']), date: z.string().optional(), tags: z.array(z.string()).default([]), cover: z.string().optional(), coverAlt: z.string().optional(), role: z.string().optional(), tools: z.array(z.string()).default([]), focus: z.string().optional(), readingTime: z.number().optional() }) }) } })

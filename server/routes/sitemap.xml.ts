import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const pages = await queryCollection(event, 'content').select('path', 'date').all()
  const urls = pages.map(page => `  <url><loc>https://dkiessling.de${page.path === '/' ? '/' : page.path}</loc>${page.date ? `<lastmod>${page.date}</lastmod>` : ''}</url>`)
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
})

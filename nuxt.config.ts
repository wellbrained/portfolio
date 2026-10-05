export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/content'],
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'D. Kiessling — Portfolio',
      meta: [{ name: 'description', content: 'The personal portfolio of D. Kiessling. Projects and more, coming soon.' }],
      link: [
        { rel: 'icon', href: '/favicon.ico?v=1.3', sizes: '16x16 32x32' },
        { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png?v=1.3', sizes: '32x32' },
        { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png?v=1.3', sizes: '16x16' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png?v=1.3', sizes: '180x180' }
      ]
    }
  },
  content: { database: { type: 'sqlite', filename: ':memory:' } },
  compatibilityDate: '2026-10-05',
  nitro: { preset: 'node-server' },
  typescript: { strict: true },
  eslint: { config: { stylistic: { semi: false, quotes: 'single', commaDangle: 'never' } } }
})

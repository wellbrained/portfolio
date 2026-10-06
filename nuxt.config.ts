export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/content'],
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Dominik Kiessling — Portfolio',
      meta: [{ name: 'description', content: 'The personal portfolio of Dominik Kiessling: projects, writing and a little about me.' }],
      link: [
        { rel: 'icon', href: '/favicon.ico?v=1.5', sizes: '16x16 32x32' },
        { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png?v=1.5', sizes: '32x32' },
        { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png?v=1.5', sizes: '16x16' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png?v=1.5', sizes: '180x180' }
      ]
    }
  },
  css: ['@fontsource/dm-sans/400.css', '@fontsource/dm-sans/500.css', '@fontsource/space-grotesk/400.css', '@fontsource/space-grotesk/500.css', '@fontsource/space-grotesk/600.css', '@fontsource/space-grotesk/700.css', '~/assets/css/main.css', '~/assets/css/detail.css'],
  content: { database: { type: 'sqlite', filename: ':memory:' } },
  compatibilityDate: '2026-10-05',
  nitro: { preset: 'node-server' },
  typescript: { strict: true },
  eslint: { config: { stylistic: { semi: false, quotes: 'single', commaDangle: 'never' } } }
})

export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'D. Kiessling — Portfolio',
      meta: [{ name: 'description', content: 'The personal portfolio of D. Kiessling. Projects and more, coming soon.' }],
      link: [{ rel: 'canonical', href: 'https://dkiessling.de/' }]
    }
  },
  compatibilityDate: '2026-10-05',
  nitro: { preset: 'node-server' },
  typescript: { strict: true },
  eslint: { config: { stylistic: { semi: false, quotes: 'single', commaDangle: 'never' } } }
})

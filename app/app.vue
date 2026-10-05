<script setup lang="ts">
const { data: page } = await useAsyncData('home-content', () => queryCollection('content').path('/').first())
</script>

<template>
  <main>
    <header>
      <a
        href="/"
        aria-label="Portfolio home"
      >DK.</a><span>Personal portfolio</span>
    </header>
    <section>
      <ContentRenderer
        v-if="page"
        :value="page"
        class="portfolio-content"
      />
      <template v-else>
        <p class="eyebrow">
          D. Kiessling
        </p>
        <h1>A place for<br>what I create.</h1>
        <p class="intro">
          My personal portfolio is taking shape. Selected projects, ideas and a little about me will live here soon.
        </p>
      </template>
      <span class="status"><span aria-hidden="true" />Coming soon</span>
    </section>
    <footer>dkiessling.de</footer>
  </main>
</template>

<style>
:root { color-scheme: light; font-family: system-ui, sans-serif; color: #252622; background: #f4f3ed; }
* { box-sizing: border-box; }
body { margin: 0; }
main { min-height: 100svh; max-width: 1200px; margin: auto; padding: 32px clamp(24px, 6vw, 80px); display: flex; flex-direction: column; }
header { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
header a { color: inherit; text-decoration: none; font-size: 28px; font-weight: 800; }
header span, footer { font-size: 14px; color: #62635d; }
section { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 80px 0; align-items: flex-start; }
.eyebrow { text-transform: uppercase; letter-spacing: .2em; font-size: 12px; font-weight: 600; }
h1 { font-size: clamp(48px, 8vw, 100px); line-height: 1.05; letter-spacing: -.06em; font-weight: 600; margin: 20px 0 28px; }
.intro { max-width: 480px; line-height: 1.7; font-size: 18px; color: #62635d; margin: 0 0 32px; }
.portfolio-content :deep(h1) { margin: 20px 0 28px; }
.portfolio-content :deep(p) { max-width: 480px; line-height: 1.7; font-size: 18px; color: #62635d; }
.status { display: inline-flex; align-items: center; gap: 10px; border: 1px solid #d1d2c8; border-radius: 24px; padding: 10px 16px; font-size: 13px; }
.status span { width: 7px; height: 7px; border-radius: 50%; background: #576c41; }
footer { padding-top: 20px; border-top: 1px solid #d1d2c8; }
</style>

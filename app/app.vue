<template>
  <div class="site-shell">
    <header class="site-header">
      <NuxtLink
        to="/"
        class="logo"
        aria-label="Portfolio home"
      >
        <img
          src="/logo.png?v=1.5"
          alt=""
          width="48"
          height="48"
        >
        <span>DK.</span>
      </NuxtLink>
      <nav aria-label="Main navigation">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/projects">Projects</NuxtLink>
        <NuxtLink to="/blog">Blog</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
      </nav>
    </header>
    <main id="main-content">
      <NuxtPage :page-key="route => route.path" />
    </main>
    <footer class="site-footer">
      <span>Dominik Kiessling · Portfolio in progress</span>
      <a href="https://github.com/wellbrained">GitHub</a>
    </footer>
  </div>
</template>

<style>
:root { color-scheme: light; font-family: system-ui, sans-serif; color: #252622; background: #f4f3ed; }
* { box-sizing: border-box; }
body { margin: 0; }
a { color: inherit; cursor: pointer; text-underline-offset: .2em; }
a:focus-visible { outline: 2px solid currentColor; outline-offset: 5px; }
.site-shell { min-height: 100svh; max-width: 1200px; margin: auto; padding: 32px clamp(24px, 6vw, 80px); display: flex; flex-direction: column; }
.site-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px; }
.logo { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; font-size: 28px; font-weight: 800; }
.logo img { display: block; width: 48px; height: 48px; object-fit: contain; }
nav { display: flex; flex-wrap: wrap; gap: 20px; font-size: 14px; }
nav a { color: #62635d; text-decoration: none; }
nav a:hover, nav a.router-link-exact-active { color: #252622; text-decoration: underline; }
main { flex: 1; padding: clamp(48px, 8vw, 96px) 0; min-width: 0; }
.prose { max-width: 720px; line-height: 1.8; }
.prose h1 { font-size: clamp(40px, 6vw, 72px); line-height: 1.1; letter-spacing: -.05em; font-weight: 600; margin: 0 0 32px; }
.prose h1 a, .prose h2 a, .prose h3 a { text-decoration: none; }
.prose h2 { font-size: 26px; line-height: 1.3; margin-top: 40px; }
.prose p, .prose li { color: #62635d; }
.prose img { max-width: 100%; height: auto; border-radius: 12px; }
.prose pre { overflow-x: auto; padding: 16px; background: #e9e9e1; border-radius: 8px; }
.content-list { margin-top: 40px; display: grid; gap: 20px; }
.content-card { border: 1px solid #d1d2c8; border-radius: 12px; padding: 24px; text-decoration: none; }
.content-card:hover { background: #e9e9e1; }
.content-card h2 { margin: 0 0 8px; font-size: 24px; }
.content-card p { color: #62635d; margin: 0; line-height: 1.7; }
.site-footer { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; font-size: 14px; color: #62635d; padding-top: 24px; border-top: 1px solid #d1d2c8; }
</style>

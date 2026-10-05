<template>
  <div class="studio-shell">
    <a
      class="skip-link"
      href="#main-content"
    >Skip to content</a>
    <header class="site-header">
      <NuxtLink
        to="/"
        class="brand"
        aria-label="DK. home"
      >DK.</NuxtLink>
      <nav aria-label="Main navigation">
        <NuxtLink to="/projects">Projects</NuxtLink>
        <NuxtLink to="/blog">Journal</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink
          to="/contact"
          class="contact-link"
        >Contact ↗</NuxtLink>
      </nav>
    </header>
    <div class="studio-layout">
      <aside class="profile">
        <img
          class="portrait"
          src="/logo.png?v=1.5"
          alt="Dominik's illustrated portrait"
          width="155"
          height="155"
        >
        <p class="profile-name">
          Dominik Kiessling
        </p>
        <p class="profile-description">
          A personal space for things I create, explore and learn.
        </p>
        <NuxtLink
          to="/contact"
          class="profile-contact"
        >Get in touch ↗</NuxtLink>
      </aside>
      <main id="main-content">
        <NuxtPage :page-key="route => route.path" />
      </main>
    </div>
    <footer><span>Dominik Kiessling · Portfolio in progress</span><a href="https://github.com/wellbrained">GitHub ↗</a></footer>
  </div>
</template>

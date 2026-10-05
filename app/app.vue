<template>
  <div class="studio-shell">
    <a
      class="skip-link"
      href="#main-content"
    >Skip to content</a><aside class="profile">
      <NuxtLink
        to="/"
        class="brand"
        aria-label="DK. home"
      ><img
        src="/logo.png?v=1.5"
        alt=""
        width="155"
        height="155"
      ><span>DK.</span></NuxtLink><p class="profile-name">
        Dominik Kiessling
      </p><p class="profile-description">
        A personal space for things I create, explore and learn.
      </p><nav aria-label="Main navigation">
        <NuxtLink to="/">Home</NuxtLink><NuxtLink to="/projects">Projects</NuxtLink><NuxtLink to="/blog">Journal</NuxtLink><NuxtLink to="/about">About</NuxtLink><NuxtLink to="/contact">Contact</NuxtLink>
      </nav><a
        class="profile-social"
        href="https://github.com/wellbrained"
      >GitHub ↗</a>
    </aside><div class="studio-main">
      <main id="main-content">
        <NuxtPage :page-key="route => route.path" />
      </main><footer>Dominik Kiessling <span>Portfolio in progress</span></footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const isNotFound = computed(() => props.error.statusCode === 404)
useSeoMeta({ title: () => (isNotFound.value ? 'Page not found' : 'Something went wrong') + ' — Dominik Kiessling', robots: 'noindex' })
</script>

<template>
  <div class="studio-shell">
    <header class="site-header">
      <NuxtLink
        to="/"
        class="brand"
        aria-label="DK. home"
      >DK.</NuxtLink>
      <nav aria-label="Main navigation">
        <NuxtLink to="/projects">Projects</NuxtLink>
        <NuxtLink to="/blog">Articles</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink
          to="/contact"
          class="contact-link"
        >Contact</NuxtLink>
      </nav>
    </header>
    <main
      id="main-content"
      class="error-page"
    >
      <p class="eyebrow">
        Error {{ error.statusCode }}
      </p>
      <h1>{{ isNotFound ? 'This page doesn\'t exist.' : 'Something went wrong.' }}</h1>
      <p class="lead">
        {{ isNotFound ? 'The link may be old, or the page may have moved.' : 'Please try again in a moment.' }}
      </p>
      <button
        class="action-link"
        type="button"
        @click="clearError({ redirect: '/' })"
      >
        ← Back to the start
      </button>
    </main>
    <footer><span>Dominik Kiessling · Portfolio in progress</span><a href="https://github.com/wellbrained">GitHub ↗</a></footer>
  </div>
</template>

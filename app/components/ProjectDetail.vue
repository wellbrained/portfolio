<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content'

defineProps<{ page: ContentCollectionItem, nextEntry?: ContentCollectionItem }>()
</script>

<template>
  <article
    id="project-top"
    class="project-page"
  >
    <NuxtLink
      class="back action-link"
      to="/projects"
    >← All projects</NuxtLink>
    <p class="eyebrow">
      {{ page.focus || 'Personal project' }} · Case study
    </p>
    <h1>{{ page.title }}</h1>
    <p class="lead">
      {{ page.subtitle || page.description }}
    </p>
    <div class="project-actions">
      <a
        v-if="page.sourceUrl"
        :href="page.sourceUrl"
        class="action-link"
      >View source ↗</a>
      <a
        v-if="page.liveUrl"
        :href="page.liveUrl"
        class="action-link"
      >Visit project ↗</a>
      <a
        class="action-link"
        href="#project-story"
      >Read the story ↓</a>
    </div>
    <figure class="hero-figure">
      <img
        v-if="page.cover"
        class="cover-image"
        :src="page.cover"
        :alt="page.coverAlt || ''"
        :width="page.coverWidth"
        :height="page.coverHeight"
      >
      <div
        v-else
        class="abstract-preview"
        role="img"
        :aria-label="page.title + ' illustrative cover, not a screenshot'"
      >
        <div class="window">
          <div class="window-top">
            <strong>{{ page.title }}</strong><span>Overview</span><i aria-hidden="true">+</i>
          </div>
          <div class="window-body">
            <div class="window-card">
              <span class="dot" /><b>The idea</b><p>A starting point for something useful.</p><div class="fake-line" />
            </div>
            <div class="window-card">
              <span class="dot violet" /><b>The outcome</b><p>What changed along the way.</p><div class="fake-line" />
            </div>
          </div>
          <div class="window-bottom">
            Idea · Approach · Outcome
          </div>
        </div>
      </div>
      <figcaption>{{ page.coverCaption || (page.cover ? page.coverAlt : 'Project cover illustration · replace with your own screenshot') }}</figcaption>
    </figure>
    <dl class="facts">
      <div><dt>My role</dt><dd>{{ page.role || 'Coming soon' }}</dd></div><div><dt>Built with</dt><dd>{{ page.tools?.join(' · ') || 'Coming soon' }}</dd></div><div><dt>Focus</dt><dd>{{ page.focus || 'Coming soon' }}</dd></div>
    </dl>
    <ContentRenderer
      id="project-story"
      :value="page"
      class="prose body-copy"
    />
    <NuxtLink
      :to="nextEntry?.path || '/projects'"
      class="closing"
    >
      <span>Continue exploring</span><h3>{{ nextEntry?.title || 'All projects' }} <span aria-hidden="true">→</span></h3><p>{{ nextEntry?.description || 'More projects and the stories behind them.' }}</p>
    </NuxtLink>
  </article>
</template>

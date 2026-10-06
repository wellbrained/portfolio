<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content'

const props = defineProps<{ page: ContentCollectionItem, nextEntry?: ContentCollectionItem }>()
const firstHeading = computed(() => props.page.body.value.findIndex(node => Array.isArray(node) && node[0] === 'h2'))
const intro = computed(() => ({ ...props.page, body: { ...props.page.body, value: props.page.body.value.slice(0, firstHeading.value < 0 ? undefined : firstHeading.value) } }))
const sections = computed(() => ({ ...props.page, body: { ...props.page.body, value: firstHeading.value < 0 ? [] : props.page.body.value.slice(firstHeading.value) } }))
const dateLabel = computed(() => props.page.date ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(props.page.date)) : '')
</script>

<template>
  <article
    id="article-top"
    class="article-page"
  >
    <NuxtLink
      class="back action-link"
      to="/blog"
    >← All articles</NuxtLink>
    <p class="eyebrow">
      {{ page.tags?.[0] || 'Personal' }} / Notes
    </p>
    <h1>{{ page.title }}</h1><p class="lead">
      {{ page.subtitle || page.description }}
    </p>
    <div class="byline">
      <img
        src="/images/portrait-96.webp"
        alt=""
        width="36"
        height="36"
      ><div>
        <strong>Dominik Kiessling</strong><span><time
          v-if="page.date"
          :datetime="page.date"
        >{{ dateLabel }}</time><template v-if="page.readingTime"> · {{ page.readingTime }} min read</template><template v-if="page.example"> · Example article</template></span>
      </div>
    </div>
    <div class="article-divider" />
    <div class="reading">
      <ContentRenderer
        :value="intro"
        class="prose introduction"
      />
      <nav
        v-if="page.body.toc?.links.length"
        class="contents"
        aria-label="In this article"
      >
        <span>In this article</span><a
          v-for="link in page.body.toc.links"
          :key="link.id"
          :href="'#' + link.id"
        >{{ link.text }}</a>
      </nav>
      <ContentRenderer
        v-if="sections.body.value.length"
        :value="sections"
        class="prose"
      />
    </div>
    <div class="article-end">
      <div class="tags">
        <span
          v-for="tag in page.tags"
          :key="tag"
        >{{ tag }}</span>
      </div><a href="#article-top">Back to top ↑</a>
    </div>
    <NuxtLink
      :to="nextEntry?.path || '/blog'"
      class="next-read"
    ><p>Continue reading</p><h3>{{ nextEntry?.title || 'Back to the journal' }} <span aria-hidden="true">→</span></h3><span>{{ nextEntry?.description || 'More notes and stories as the site grows.' }}</span></NuxtLink>
  </article>
</template>

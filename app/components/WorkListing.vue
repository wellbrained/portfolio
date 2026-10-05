<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content'

defineProps<{ entries: ContentCollectionItem[], kind: 'projects' | 'journal' }>()
</script>

<template>
  <div :class="kind === 'projects' ? 'project-grid' : 'journal-list'">
    <NuxtLink
      v-for="entry in entries"
      :key="entry.path"
      :to="entry.path"
      :class="kind === 'projects' ? 'project-card' : 'journal-row'"
    ><div
      v-if="kind === 'projects'"
      class="project-cover"
    ><img
      v-if="entry.cover"
      :src="entry.cover"
      :alt="entry.coverAlt || ''"
      loading="lazy"
    ><span
      v-else
      class="cover-placeholder"
    >{{ entry.title }}<small>Example project cover</small></span></div><div class="entry-copy"><p class="eyebrow">{{ kind === 'projects' ? entry.focus || 'Project' : entry.date || 'Journal' }}</p><h3>{{ entry.title }} <span aria-hidden="true">↗</span></h3><p>{{ entry.description }}</p><div
      v-if="entry.tags?.length"
      class="tags"
    ><span
      v-for="tag in entry.tags"
      :key="tag"
    >{{ tag }}</span></div></div></NuxtLink>
  </div>
</template>

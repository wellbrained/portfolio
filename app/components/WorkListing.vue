<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content'

defineProps<{ entries: ContentCollectionItem[], kind: 'projects' | 'journal' }>()
const formatDate = (date: string) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date))
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
      :width="entry.coverWidth"
      :height="entry.coverHeight"
      loading="lazy"
    ><span
      v-else
      class="cover-placeholder"
    >{{ entry.title }}<small>Example project cover</small></span></div><div class="entry-copy"><p class="eyebrow"><template v-if="kind === 'projects'">{{ entry.focus || 'Project' }}</template><time
      v-else-if="entry.date"
      :datetime="entry.date"
    >{{ formatDate(entry.date) }}</time><template v-else>Journal</template></p><h3>{{ entry.title }} <span aria-hidden="true">→</span></h3><p>{{ entry.description }}</p><div
      v-if="entry.tags?.length"
      class="tags"
    ><span
      v-for="tag in entry.tags"
      :key="tag"
    >{{ tag }}</span></div></div></NuxtLink>
  </div>
</template>

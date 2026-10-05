<script setup lang="ts">
const route = useRoute()
const path = computed(() => route.path.replace(/\/$/, '') || '/')
const { data: page } = await useAsyncData(() => `page:${path.value}`, () => queryCollection('content').path(path.value).first())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const listingPrefix = computed(() => ['/projects', '/blog'].includes(path.value) ? `${path.value}/` : null)
const { data: entries } = await useAsyncData(() => `entries:${path.value}`, () => listingPrefix.value
  ? queryCollection('content').where('path', 'LIKE', `${listingPrefix.value}%`).order('path', 'ASC').all()
  : Promise.resolve([]))

useSeoMeta({
  title: () => `${page.value?.title ?? 'Portfolio'} — Dominik Kiessling`,
  description: () => page.value?.description ?? ''
})
useHead(() => ({ link: [{ rel: 'canonical', href: `https://dkiessling.de${path.value}` }] }))
</script>

<template>
  <article>
    <ContentRenderer
      v-if="page"
      :value="page"
      class="prose"
    />
    <div
      v-if="entries?.length"
      class="content-list"
    >
      <NuxtLink
        v-for="entry in entries"
        :key="entry.path"
        :to="entry.path"
        class="content-card"
      >
        <h2>{{ entry.title }}</h2>
        <p>{{ entry.description }}</p>
      </NuxtLink>
    </div>
  </article>
</template>

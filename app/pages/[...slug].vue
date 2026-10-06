<script setup lang="ts">
const route = useRoute()
const path = computed(() => route.path.replace(/\/$/, '') || '/')
const { data: page } = await useAsyncData(() => 'page:' + path.value, () => queryCollection('content').path(path.value).first())
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found' })
const { data: projects } = await useAsyncData('portfolio-projects', () => queryCollection('content').where('layout', '=', 'project').order('path', 'ASC').all())
const { data: articles } = await useAsyncData('portfolio-articles', () => queryCollection('content').where('layout', '=', 'article').order('date', 'DESC').all())
const isProject = computed(() => page.value?.layout === 'project')
const isArticle = computed(() => page.value?.layout === 'article')
const nextEntry = computed(() => {
  const entries = isProject.value ? projects.value : articles.value
  const index = entries?.findIndex(entry => entry.path === path.value) ?? -1
  return index >= 0 ? entries?.[index + 1] : undefined
})
useSeoMeta({ title: () => (page.value?.title ?? 'Portfolio') + ' — Dominik Kiessling', description: () => page.value?.description ?? '' })
useHead(() => ({ link: [{ rel: 'canonical', href: 'https://dkiessling.de' + path.value }] }))
</script>

<template>
  <ProjectDetail
    v-if="page && isProject"
    :page="page"
    :next-entry="nextEntry"
  />
  <ArticleDetail
    v-else-if="page && isArticle"
    :page="page"
    :next-entry="nextEntry"
  />
  <article
    v-else-if="page"
    class="page"
  >
    <header class="page-heading">
      <p class="eyebrow">
        {{ page.layout === 'home' ? 'Personal studio' : 'DK. / Personal studio' }}
      </p><h1
        v-if="page.layout === 'home'"
        class="home-title"
      >
        I make <span>things.</span>
      </h1><h1 v-else>
        {{ page.title }}
      </h1><p class="lead">
        {{ page.description }}
      </p>
    </header>
    <ContentRenderer
      :value="page"
      class="prose"
    />
    <template v-if="page.layout === 'home' || page.layout === 'projects'">
      <div class="section-heading">
        <h2>Selected work</h2><NuxtLink
          v-if="page.layout === 'home'"
          class="action-link"
          to="/projects"
        >All projects ↗</NuxtLink>
      </div><WorkListing
        :entries="projects || []"
        kind="projects"
      />
    </template>
    <template v-if="page.layout === 'home' || page.layout === 'journal'">
      <div class="section-heading">
        <h2>Journal</h2><NuxtLink
          v-if="page.layout === 'home'"
          class="action-link"
          to="/blog"
        >All articles ↗</NuxtLink>
      </div><WorkListing
        :entries="articles || []"
        kind="journal"
      />
    </template>
  </article>
</template>

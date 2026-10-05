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
  <article
    v-if="page"
    :class="['page', { 'article-page': isArticle }]"
  >
    <header class="page-heading">
      <NuxtLink
        v-if="isProject || isArticle"
        class="back-link"
        :to="isProject ? '/projects' : '/blog'"
      >← {{ isProject ? 'All projects' : 'Journal' }}</NuxtLink><p class="eyebrow">
        {{ page.layout === 'home' ? 'Personal studio' : isProject ? 'Selected work' : isArticle ? 'Journal' : 'DK. / Personal studio' }}
      </p><h1>{{ page.title }}</h1><p class="lead">
        {{ page.description }}
      </p><div
        v-if="isArticle"
        class="byline"
      >
        <img
          src="/logo.png?v=1.5"
          alt=""
          width="36"
          height="36"
        ><span>Dominik Kiessling</span><time
          v-if="page.date"
          :datetime="page.date"
        >{{ page.date }}</time><span v-if="page.readingTime">{{ page.readingTime }} min read</span>
      </div>
    </header><template v-if="isProject">
      <div class="project-cover detail-cover">
        <img
          v-if="page.cover"
          :src="page.cover"
          :alt="page.coverAlt || ''"
        ><span
          v-else
          class="cover-placeholder"
        >{{ page.title }}<small>Example project cover</small></span>
      </div><dl class="project-facts">
        <div><dt>Role</dt><dd>{{ page.role || 'Coming soon' }}</dd></div><div><dt>Tools</dt><dd>{{ page.tools?.join(' · ') || 'Coming soon' }}</dd></div><div><dt>Focus</dt><dd>{{ page.focus || 'Coming soon' }}</dd></div>
      </dl>
    </template><nav
      v-if="isArticle && page.body.toc?.links.length"
      class="article-toc"
      aria-label="In this article"
    >
      <p class="eyebrow">
        In this article
      </p><a
        v-for="link in page.body.toc.links"
        :key="link.id"
        :href="'#' + link.id"
      >{{ link.text }}</a>
    </nav><ContentRenderer
      :value="page"
      class="prose"
    /><template v-if="page.layout === 'home' || page.layout === 'projects'">
      <div class="section-heading">
        <h2>Selected work</h2><NuxtLink
          v-if="page.layout === 'home'"
          to="/projects"
        >All projects ↗</NuxtLink>
      </div><WorkListing
        :entries="projects || []"
        kind="projects"
      />
    </template><template v-if="page.layout === 'home' || page.layout === 'journal'">
      <div class="section-heading">
        <h2>Journal</h2><NuxtLink
          v-if="page.layout === 'home'"
          to="/blog"
        >All articles ↗</NuxtLink>
      </div><WorkListing
        :entries="articles || []"
        kind="journal"
      />
    </template><div
      v-if="(isArticle || isProject) && page.tags?.length"
      class="tags detail-tags"
    >
      <span
        v-for="tag in page.tags"
        :key="tag"
      >{{ tag }}</span>
    </div><NuxtLink
      v-if="nextEntry"
      :to="nextEntry.path"
      class="next-entry"
    ><span class="eyebrow">{{ isProject ? 'Next project' : 'Next article' }}</span><strong>{{ nextEntry.title }} →</strong></NuxtLink>
  </article>
</template>

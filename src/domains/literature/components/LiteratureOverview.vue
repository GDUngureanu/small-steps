<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'

  defineOptions({
    name: 'LiteratureOverview',
  })

  const LIST_ID = '7a171dc3-50bd-4732-b912-08f25fcba7a6'
</script>

<template>
  <ArticleTemplate title="Literature Actions" meta="July 31, 2025 by G. D. Ungureanu">
    <ActionsTemplate :list-id="LIST_ID" />
  </ArticleTemplate>

  <ArticleTemplate title="Literature Areas" meta="Explore books, poems, and literary works">
    <p>Dive into the world of literature, track your reading progress, and discover timeless poetry.</p>

    <h4>Available Literature Modules:</h4>
    <ul>
      <li>
        <router-link to="/literature/books"><strong>Books</strong></router-link> - Reading list, progress tracking, and book notes including Atomic Habits insights
      </li>
      <li>
        <router-link to="/literature/poems"><strong>Poems</strong></router-link> - Collection of poetry including classic Romanian works by Mihai Eminescu
      </li>
    </ul>

    <p><em>Explore the written word and expand your literary horizons.</em></p>
  </ArticleTemplate>
</template>
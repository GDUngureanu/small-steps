<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'

  defineOptions({
    name: 'GrowthOverview',
  })

  const LIST_ID = '7a171dc3-50bd-4732-b912-08f25fcba7a6'
</script>

<template>
  <ArticleTemplate title="Growth Actions" meta="July 31, 2025 by G. D. Ungureanu">
    <ActionsTemplate :list-id="LIST_ID" />
  </ArticleTemplate>

  <ArticleTemplate title="Growth Areas" meta="Explore books, poems, and personal development">
    <p>Dive into the world of personal growth, track your reading progress, and discover timeless poetry that inspires development.</p>

    <h4>Available Growth Modules:</h4>
    <ul>
      <li>
        <router-link to="/growth/books">
          <i class="bi bi-book me-1"></i>
          <strong>Books</strong>
        </router-link>
        - Reading list, progress tracking, and book notes including Atomic Habits insights
      </li>
      <li>
        <router-link to="/growth/poems">
          <i class="bi bi-pencil me-1"></i>
          <strong>Poems</strong>
        </router-link>
        - Collection of poetry including classic Romanian works by Mihai Eminescu
      </li>
    </ul>

    <p><em>Explore the written word and expand your personal growth journey.</em></p>
  </ArticleTemplate>
</template>

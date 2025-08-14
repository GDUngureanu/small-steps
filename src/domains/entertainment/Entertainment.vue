<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'

  defineOptions({
    name: 'EntertainmentOverview',
  })

  const ENTERTAINMENT_ACTIONS_LIST_ID = '86b4e40b-846b-48ac-ae94-1867a0ce5e6e'
</script>

<template>
  <ArticleTemplate title="Entertainment Actions" meta="July 31, 2025 by G. D. Ungureanu">
    <ActionsTemplate :list-id="ENTERTAINMENT_ACTIONS_LIST_ID" />
  </ArticleTemplate>

  <ArticleTemplate title="Entertainment Areas" meta="Discover anime, movies, and entertainment content">
    <p>Explore your entertainment journey, track what you've watched, and discover new content to enjoy.</p>

    <h4>Available Entertainment Modules:</h4>
    <ul>
      <li>
        <router-link to="/entertainment/anime"><strong>Anime</strong></router-link> - Comprehensive anime tracking with MyAnimeList integration, viewing status, and personal ratings
      </li>
      <li>
        <router-link to="/entertainment/movies"><strong>Movies</strong></router-link> - Movie collection and watchlist management with action tracking
      </li>
    </ul>

    <p><em>Dive into the world of entertainment and track your viewing experiences.</em></p>
  </ArticleTemplate>
</template>

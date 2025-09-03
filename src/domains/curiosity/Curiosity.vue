<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'

  defineOptions({
    name: 'CuriosityOverview',
  })

  const BUCKET_LIST_ID = '856704dc-129c-48ee-8fe7-2507f68690ac'
</script>

<template>
  <ArticleTemplate title="Bucket List Actions" meta="August 4, 2025 by G. D. Ungureanu">
    <ActionsTemplate :list-id="BUCKET_LIST_ID" />
  </ArticleTemplate>

  <ArticleTemplate title="Curiosity Areas" meta="Explore the world and create memories">
    <p>Plan your travels, track destinations, and build your ultimate bucket list of explorations.</p>

    <h4>Available Curiosity Modules:</h4>
    <ul>
      <li>
        <router-link to="/curiosity/destinations"><strong>Destinations</strong></router-link> - Interactive world map with travel planning and progress tracking
      </li>
      <li>
        <router-link to="/curiosity/anime"><strong>Anime</strong></router-link> - Discover and track anime series and explore Japanese storytelling
      </li>
      <li>
        <router-link to="/curiosity/movies"><strong>Movies</strong></router-link> - Cinematic exploration and film discovery journey
      </li>
      <li>
        <router-link to="/curiosity/experiments"><strong>Experiments</strong></router-link> - Creative projects, learning experiments, and exploration of new ideas
      </li>
      <li>
        <router-link to="/curiosity/random"><strong>Random</strong></router-link> - Serendipitous discoveries and random exploration activities
      </li>
    </ul>

    <p><em>Explore new territories, both physical and intellectual through diverse media and experiences.</em></p>
  </ArticleTemplate>
</template>


<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'

  defineOptions({
    name: 'AdventureOverview',
  })

  const BUCKET_LIST_ID = '856704dc-129c-48ee-8fe7-2507f68690ac'
</script>

<template>
  <ArticleTemplate title="Bucket List Actions" meta="August 4, 2025 by G. D. Ungureanu">
    <ActionsTemplate :list-id="BUCKET_LIST_ID" />
  </ArticleTemplate>

  <ArticleTemplate title="Adventure Areas" meta="Explore the world and create memories">
    <p>Plan your travels, track destinations, and build your ultimate bucket list of adventures.</p>

    <h4>Available Adventure Modules:</h4>
    <ul>
      <li>
        <router-link to="/adventure/destinations"><strong>Destinations</strong></router-link> - Interactive world map with travel planning and progress tracking
      </li>
    </ul>

    <p><em>More adventure modules will be added in future updates.</em></p>
  </ArticleTemplate>
</template>

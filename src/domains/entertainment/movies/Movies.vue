<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'

  defineOptions({
    name: 'Movies',
  })

  const MOVIES_ACTIONS_LIST_ID = 'f8d9c2a1-e4b6-4f7a-9c3d-1a8e5b2f9d6c'
</script>

<template>
  <ArticleTemplate title="Movies Actions" meta="July 31, 2025 by G. D. Ungureanu">
    <ActionsTemplate :list-id="MOVIES_ACTIONS_LIST_ID" />
  </ArticleTemplate>
</template>
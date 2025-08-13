<script setup>
  import ArticleTemplate from '@/components/shared/templates/Article.vue'
  import ActionsTemplate from '@/components/shared/templates/actions/Actions.vue'

  defineOptions({
    name: 'PisicutaTemplate',
  })
</script>

<template>
  <ArticleTemplate title="Pisicuta Actions" meta="August 13, 2025 by G. D. Ungureanu">
    <ActionsTemplate list-id="pisicuta-actions" />
  </ArticleTemplate>
</template>
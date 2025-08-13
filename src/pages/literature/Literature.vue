<script setup>
  import ArticleTemplate from '@/components/shared/templates/Article.vue'
  import ActionsTemplate from '@/components/shared/templates/actions/Actions.vue'

  defineOptions({
    name: 'LiteratureTemplate',
  })

  const LIST_ID = '7a171dc3-50bd-4732-b912-08f25fcba7a6'
</script>

<template>
  <ArticleTemplate title="Literature Actions" meta="July 31, 2025 by G. D. Ungureanu">
    <ActionsTemplate :list-id="LIST_ID" />
  </ArticleTemplate>
</template>

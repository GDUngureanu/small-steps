<script setup>
  import ArticleTemplate from '@/components/shared/templates/Article.vue'
  import ActionsTemplate from '@/components/shared/templates/actions/Actions.vue'

  const LIST_ID = '33333333-3333-3333-3333-333333333333'

  defineOptions({
    name: 'InvestmentsTemplate',
  })
</script>

<template>
  <ArticleTemplate title="Investment Actions" meta="July 31, 2025 by G. D. Ungureanu">
    <ActionsTemplate :list-id="LIST_ID" />
  </ArticleTemplate>
</template>


<script setup>
  import ArticleTemplate from '@/components/shared/templates/Article.vue'
  import ActionsTemplate from '@/components/shared/templates/actions/Actions.vue'

  defineOptions({
    name: 'FinanceTemplate',
  })

  const LIST_ID = '11111111-1111-1111-1111-111111111111'
</script>

<template>
  <ArticleTemplate title="Finance Actions" meta="July 31, 2025 by G. D. Ungureanu">
    <ActionsTemplate :list-id="LIST_ID" />
  </ArticleTemplate>
</template>


<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'

  const LIST_ID = '22222222-2222-2222-2222-222222222222'

  defineOptions({
    name: 'BudgetTemplate',
  })
</script>

<template>
  <ArticleTemplate title="Budget Actions" meta="July 31, 2025 by G. D. Ungureanu">
    <ActionsTemplate :list-id="LIST_ID" />
  </ArticleTemplate>
</template>

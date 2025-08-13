<script setup>
  import ArticleTemplate from '@/components/shared/templates/Article.vue'
  import ActionsTemplate from '@/components/shared/templates/actions/Actions.vue'

  defineOptions({
    name: 'BudgetTemplate',
  })
</script>

<template>
  <ArticleTemplate title="Budget Actions" meta="July 31, 2025 by G. D. Ungureanu">
    <ActionsTemplate list-id="22222222-2222-2222-2222-222222222222" />
  </ArticleTemplate>
</template>


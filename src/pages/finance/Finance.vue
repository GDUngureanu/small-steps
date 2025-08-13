<script setup>
  import ArticleTemplate from '@/components/shared/templates/Article.vue'
  import ActionsTemplate from '@/components/shared/templates/actions/Actions.vue'

  defineOptions({
    name: 'FinanceTemplate',
  })
</script>

<template>
  <ArticleTemplate title="Finance Actions" meta="July 31, 2025 by G. D. Ungureanu">
    <ActionsTemplate list-id="11111111-1111-1111-1111-111111111111" />
  </ArticleTemplate>
</template>


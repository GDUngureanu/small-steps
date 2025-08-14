<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'

  defineOptions({
    name: 'Finance',
  })

  const LIST_ID = '11111111-1111-1111-1111-111111111111'
</script>

<template>
  <ArticleTemplate title="Finance Actions" meta="July 31, 2025 by G. D. Ungureanu">
    <ActionsTemplate :list-id="LIST_ID" />
  </ArticleTemplate>

  <ArticleTemplate title="Finance" meta="August 14, 2025 by G. D. Ungureanu">
    <p>Manage your financial planning and track your financial goals.</p>

    <p><em>Financial tracking and management tools to help you achieve financial balance and security.</em></p>
  </ArticleTemplate>
</template>

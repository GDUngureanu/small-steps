<script setup>
  import ArticleTemplate from '@/components/shared/templates/Article.vue'
  import ActionsTemplate from '@/components/shared/templates/Actions.vue'

  defineOptions({
    name: 'IppoTemplate',
  })
</script>

<template>
  <ArticleTemplate title="Steps that I would like to take" meta="May 26, 2025 by G. D. Ungureanu">
    <p>So many things To do/To learn.</p>

    <ActionsTemplate list-id="379d2ab8-7b25-43ee-a2ea-4979ce1629d5" />
  </ArticleTemplate>
</template>

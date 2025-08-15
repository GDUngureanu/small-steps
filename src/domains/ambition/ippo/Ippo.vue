<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'

  defineOptions({
    name: 'IppoOverview',
  })
</script>

<template>
  <ArticleTemplate title="Steps that I would like to take" meta="May 26, 2025 by G. D. Ungureanu">
    <p>So many things To do/To learn.</p>

    <ActionsTemplate list-id="379d2ab8-7b25-43ee-a2ea-4979ce1629d5" />
  </ArticleTemplate>
</template>

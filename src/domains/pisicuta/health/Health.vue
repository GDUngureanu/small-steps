<script setup>
  import MarkdownArticleTemplate from '@/shared/components/ui/templates/MarkdownArticle.vue'

  const markdownResearchUrl1 = `${import.meta.env.BASE_URL}research/health/Research1.md`

  defineOptions({
    name: 'PisicutaHealthTemplate',
  })
</script>

<template>
  <MarkdownArticleTemplate
    :src="markdownResearchUrl1"
    title="Hialurom Hondro Research"
    meta="August 16, 2025 by G. D. Ungureanu"
    visible=""
  />
</template>

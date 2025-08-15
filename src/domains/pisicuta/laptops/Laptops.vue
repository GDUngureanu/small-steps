<script setup>
  import MarkdownArticleTemplate from '@/shared/components/ui/templates/MarkdownArticle.vue'

  const markdownResearchUrl1 = new URL('../Research1.md', import.meta.url).href
  const markdownResearchUrl2 = new URL('../Research2.md', import.meta.url).href

  defineOptions({
    name: 'LaptopsTemplate',
  })
</script>

<template>
  <MarkdownArticleTemplate
    :src="markdownResearchUrl2"
    title="Laptops Research 2021-2025"
    meta="August 12, 2025 by G. D. Ungureanu"
    :expanded="false"
  />

  <MarkdownArticleTemplate
    :src="markdownResearchUrl1"
    title="Laptops Research 2022-2023"
    meta="August 11, 2025 by G. D. Ungureanu"
    :expanded="false"
  />
</template>

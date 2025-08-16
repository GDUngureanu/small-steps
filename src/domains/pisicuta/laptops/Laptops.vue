<script setup>
  import MarkdownArticleTemplate from '@/shared/components/ui/templates/MarkdownArticle.vue'

  const markdownResearchUrl1 = `${import.meta.env.BASE_URL}research/laptops/Research1.md`
  const markdownResearchUrl2 = `${import.meta.env.BASE_URL}research/laptops/Research2.md`

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

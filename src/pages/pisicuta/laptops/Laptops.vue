<script setup>
  import ArticleTemplate from '@/components/shared/templates/Articles.vue'

  const markdownUrl = new URL('../../../content/sample.md', import.meta.url).href

  defineOptions({
    name: 'LaptopsTemplate',
  })
</script>

<template>
  <ArticleTemplate
    :src="markdownUrl"
    title="Laptops List"
    meta="August 13, 2025 by G. D. Ungureanu"
  />
</template>


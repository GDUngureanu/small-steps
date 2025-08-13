<script setup>
  import MDArticleTemplate from '@/components/shared/templates/MDArticle.vue'

  const markdownResearchUrl1 = new URL('./Research1.md', import.meta.url).href
  const markdownResearchUrl2 = new URL('./Research2.md', import.meta.url).href


  defineOptions({
    name: 'LaptopsTemplate',
  })
</script>

<template>
  <MDArticleTemplate
    :src="markdownResearchUrl2"
    title="Laptops List Research 2"
    meta="August 12, 2025 by G. D. Ungureanu"
    :expanded="false"
  />

  <MDArticleTemplate
    :src="markdownResearchUrl1"
    title="Laptops List Research 1"
    meta="August 11, 2025 by G. D. Ungureanu"
    :expanded="false"
  />
</template>


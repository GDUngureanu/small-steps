<script setup>
  import { ref, onMounted, watch } from 'vue'
  import { marked } from 'marked'
  import BaseArticle from './BaseArticle.vue'

  try {
    const renderer = new marked.Renderer()
    renderer.table = (header, body) => `<div class="table-responsive"><table class="table table-striped table-hover">\n<thead class="table-dark">${header}</thead>\n<tbody>${body}</tbody>\n</table></div>`
    marked.setOptions({ renderer })
  } catch {
    /* istanbul ignore next */
  }

  /**
   * Article template that loads Markdown content.
   *
   * @prop {string} src path to the markdown file
   * @prop {string} title heading text displayed above the content
   * @prop {string} meta small subtitle or metadata string
   * @prop {boolean} expanded whether the article is open by default (default: true)
   */
  const props = defineProps({
    src: { type: String, required: true },
    title: String,
    meta: String,
    expanded: {
      type: Boolean,
      default: true,
    },
  })

  const content = ref('')

  async function loadMarkdown() {
    try {
      const response = await fetch(props.src)
      const text = await response.text()
      content.value = marked.parse(text)
    } catch {
      content.value = '<p>Failed to load content.</p>'
    }
  }

  onMounted(loadMarkdown)
  watch(
    () => props.src,
    () => loadMarkdown()
  )
</script>

<template>
  <BaseArticle v-bind="props">
    <div v-html="content" />
  </BaseArticle>
</template>

<style scoped>
  .article-content .table-responsive {
    margin: 1rem 0;
  }
</style>

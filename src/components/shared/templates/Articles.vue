<script setup>
  import { ref, onMounted } from 'vue'
  import { marked } from 'marked'

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

  const isExpanded = ref(props.expanded)
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

  function toggleExpanded() {
    isExpanded.value = !isExpanded.value
  }

  onMounted(loadMarkdown)
</script>

<template>
  <div class="row p-4 mb-4 rounded-3 border shadow-lg">
    <article class="blog-post">
      <div class="d-flex justify-content-between align-items-start cursor-pointer" @click="toggleExpanded">
        <div>
          <h3 class="display-6 link-body-emphasis mb-0">{{ title }}</h3>
          <p class="blog-post-meta">
            <em>{{ meta }}</em>
          </p>
        </div>
        <button class="btn btn-sm p-1 text-muted article-toggle" :aria-label="isExpanded ? 'Collapse section' : 'Expand section'">
          <i class="bi" :class="isExpanded ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
        </button>
      </div>

      <div class="article-content" :class="{ collapsed: !isExpanded }" v-html="content" />
    </article>
  </div>
</template>

<style scoped>
  .cursor-pointer {
    cursor: pointer;
  }

  .article-toggle {
    border: none !important;
    background: none !important;
    transition: transform 0.2s ease;
  }

  .article-toggle:hover {
    transform: scale(1.1);
  }

  .article-content {
    overflow: hidden;
    transition:
      max-height 0.3s ease,
      opacity 0.3s ease;
    opacity: 1;
  }

  .article-content.collapsed {
    max-height: 0;
    opacity: 0;
  }
</style>


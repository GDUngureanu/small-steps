<script setup>
import { ref, onMounted, watch } from 'vue'
import { marked } from 'marked'

const renderer = new marked.Renderer()
renderer.table = (header, body) =>
  `<div class="table-responsive"><table class="table table-striped table-hover">
    <thead class="table-dark">${header}</thead>
    <tbody>${body}</tbody>
  </table></div>`
marked.setOptions({ renderer })

const props = defineProps({
  src: String,
  title: String,
  meta: String,
  expanded: {
    type: Boolean,
    default: true,
  },
})

const content = ref('')
const isExpanded = ref(props.expanded)

watch(
  () => props.expanded,
  (newValue) => {
    isExpanded.value = newValue
  }
)

function toggleExpanded() {
  isExpanded.value = !isExpanded.value
}

async function loadMarkdownContent() {
  try {
    const response = await fetch(props.src)
    const markdownText = await response.text()

    content.value = marked.parse(markdownText)
  } catch (error) {
    content.value = '<p>Failed to load content.</p>'
  }
}

onMounted(loadMarkdownContent)
watch(
  () => props.src,
  () => loadMarkdownContent()
)
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

      <div class="article-content" :class="{ collapsed: !isExpanded }">
        <div class="markdown-content" v-html="content" />
      </div>
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

.markdown-content .table-responsive {
  margin: 1rem 0;
}
</style>

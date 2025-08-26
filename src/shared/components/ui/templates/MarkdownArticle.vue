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
  const hasLoadedContent = ref(false)

  // Load content immediately if expanded on mount, otherwise wait for first expansion
  if (props.expanded) {
    onMounted(loadMarkdownContent)
  }

  watch(
    () => props.expanded,
    (newValue) => {
      isExpanded.value = newValue
    }
  )

  watch(
    () => isExpanded.value,
    (newValue, oldValue) => {
      // Load content on first expansion (false -> true)
      if (newValue && !oldValue && !hasLoadedContent.value) {
        loadMarkdownContent()
      }
    }
  )

  function toggleExpanded() {
    isExpanded.value = !isExpanded.value
  }

  async function loadMarkdownContent() {
    if (hasLoadedContent.value) return

    try {
      const response = await fetch(props.src)
      const markdownText = await response.text()
      content.value = marked.parse(markdownText)
      hasLoadedContent.value = true
    } catch {
      content.value = '<p>Failed to load content.</p>'
      hasLoadedContent.value = true
    }
  }
</script>

<template>
  <div class="row p-4 mb-4 rounded-3 border shadow-lg">
    <article class="blog-post">
      <div class="d-flex justify-content-between align-items-start ss-cursor-pointer" @click="toggleExpanded">
        <div>
          <h3 class="display-6 link-body-emphasis mb-0">{{ title }}</h3>
          <p class="blog-post-meta">
            <em>{{ meta }}</em>
          </p>
        </div>
        <button class="btn btn-sm p-1 text-muted ss-article-toggle" :aria-label="isExpanded ? 'Collapse section' : 'Expand section'">
          <i class="bi" :class="isExpanded ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
        </button>
      </div>

      <div class="ss-article-content" :class="{ collapsed: !isExpanded }">
        <div class="ss-markdown-content" v-html="content" />
      </div>
    </article>
  </div>
</template>

<!-- CSS styles are now in global styles.scss -->

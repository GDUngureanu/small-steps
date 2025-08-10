<script setup>
import { ref } from 'vue'

  /**
   * Basic article layout with a header and body slot.
   *
   * @prop {string} title heading text displayed above the content slot
   * @prop {string} meta small subtitle or metadata string
   * @prop {boolean} expanded whether the article is open by default (default: true)
   */
  const props = defineProps({
    title: String,
    meta: String,
    expanded: {
      type: Boolean,
      default: true
    }
  })

  const isExpanded = ref(props.expanded)

  function toggleExpanded() {
    isExpanded.value = !isExpanded.value
  }
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

      <div class="article-content" :class="{ 'collapsed': !isExpanded }">
        <slot />
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
  transition: max-height 0.3s ease, opacity 0.3s ease;
  opacity: 1;
}

.article-content.collapsed {
  max-height: 0;
  opacity: 0;
}
</style>

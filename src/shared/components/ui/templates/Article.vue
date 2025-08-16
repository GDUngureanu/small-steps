<script setup>
  import { ref, watch } from 'vue'

  const props = defineProps({
    title: String,
    meta: String,
    expanded: {
      type: Boolean,
      default: true,
    },
  })

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
        <slot />
      </div>
    </article>
  </div>
</template>

<!-- CSS styles are now in global styles.scss -->

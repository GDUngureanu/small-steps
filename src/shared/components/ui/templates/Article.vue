<script setup>
import BaseArticle from './BaseArticle.vue'

const props = defineProps({
  title: String,
  meta: String,
  expanded: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <BaseArticle v-bind="props">
    <slot />
  </BaseArticle>
</template>

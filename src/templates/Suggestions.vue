<script setup>
  /**
   * Render a checklist of suggestions.
   *
   * @prop {Array<{action:string,status:boolean}>} suggestions array of items to
   *   display with checkbox state
   */
  defineProps({
    suggestions: {
      type: Array,
      required: true,
    },
  })
</script>

<template>
  <p class="mb-2"><strong>Suggestions:</strong></p>

  <div class="form-check" v-for="(suggestion, index) in suggestions" :key="index">
    <input type="checkbox" class="form-check-input" :id="`suggestion-${index}`" v-model="suggestion.status" />
    <label class="form-check-label" :for="`suggestion-${index}`">{{ suggestion.action }}</label>
  </div>
</template>

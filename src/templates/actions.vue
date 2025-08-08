<script setup>
import { toRef } from 'vue'
import ActionList from '../components/actions/ActionList.vue'
import { useActions } from '../composables/useActions.js'

/**
 * Convenience wrapper that wires a `listId` prop to the `useActions`
 * composable and renders the resulting `ActionList`.
 *
 * @prop {string} listId identifier of the actions list in Supabase
 */
const props = defineProps({
  listId: {
    type: String,
    required: true
  }
})

const state = useActions(toRef(props, 'listId'))
</script>

<template>
  <ActionList :state="state" />
</template>

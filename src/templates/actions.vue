<script setup>
import { toRef } from 'vue'
import ActionList from '../components/actions/ActionList.vue'
import { useActions } from '../composables/useActions.js'

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

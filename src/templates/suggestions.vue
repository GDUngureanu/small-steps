<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
    suggestions: {
        type: Array,
        required: true
    },
    storageKey: {
        type: String,
        required: true
    }
});

const localSuggestions = ref(props.suggestions.map(s => ({ ...s })));

const getId = (index) => `${props.storageKey}-${index}`;

onMounted(() => {
    const stored = JSON.parse(localStorage.getItem(`suggestions_${props.storageKey}`));
    if (stored && Array.isArray(stored)) {
        localSuggestions.value = localSuggestions.value.map((s, idx) => ({
            ...s,
            status: stored[idx] ?? s.status
        }));
    }
});

watch(localSuggestions, (newVal) => {
    const statuses = newVal.map(s => s.status);
    localStorage.setItem(`suggestions_${props.storageKey}`, JSON.stringify(statuses));
}, { deep: true });
</script>

<template>
    <p class="mb-2"><strong>Suggestions:</strong></p>

    <div class="form-check" v-for="(suggestion, index) in localSuggestions" :key="getId(index)">
        <input type="checkbox" class="form-check-input" :id="getId(index)" v-model="suggestion.status">
        <label class="form-check-label" :for="getId(index)">{{ suggestion.action }}</label>
    </div>
</template>

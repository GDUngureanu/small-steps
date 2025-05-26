<script setup>
defineProps({
    suggestions: {
        type: Array,
        required: true
    }
});
</script>

<template>
    <p class="mb-2"><strong>Suggestions:</strong></p>

    <div class="form-check" v-for="suggestion in suggestions">
        <input type="checkbox" class="form-check-input" id="checkboxInput" v-model="suggestion.status">
        <label class="form-check-label" for="checkboxInput">{{ suggestion.action }}</label>
    </div>
</template>

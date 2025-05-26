<script setup>
defineProps({
    toDoList: {
        type: Array,
        required: true
    }
});
</script>

<template>
    <p class="mb-2"><strong>To Do:</strong></p>

    <div class="form-check" v-for="toDo in toDoList">
        <input type="checkbox" class="form-check-input" id="checkboxInput" v-model="toDo.status">
        <label class="form-check-label" for="checkboxInput">{{ toDo.action }}</label>
    </div>
</template>

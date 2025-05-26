<script setup>
import articleTemp from '../../templates/article.vue';
import todoTemp from '../../templates/todo.vue';
</script>

<script>
import toDoList from './todo.json';

export default {
    name: 'AnimeTemplate',
    data() {
        return {
            toDoList: toDoList
        };
    }
};
</script>


<template>

    <articleTemp title="Coding my passions" meta="May 26, 2025 by G. D. Ungureanu">
        <p>I'm coding because I like to.</p>

        <todoTemp :toDoList="toDoList" />
    </articleTemp>

</template>
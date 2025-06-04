<script setup>
import articleTemp from '../../templates/article.vue';
import suggestionsTemp from '../../templates/suggestions.vue';
</script>

<script>
import suggestions from './suggestions.json';

export default {
    name: 'BooksTemplate',
    data() {
        return {
            suggestions: suggestions
        };
    }
};
</script>

<template>

    <articleTemp title="Books" meta="Jav 4, 2025 by G. D. Ungureanu">
        <p>Work work work.</p>

        <suggestionsTemp :suggestions="suggestions" />
    </articleTemp>

</template>
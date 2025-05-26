<script setup>
import articleTemp from '../../templates/article.vue';
import suggestionsTemp from '../../templates/suggestions.vue';
</script>

<script>
import suggestions from './suggestions.json';

export default {
    name: 'AnimeTemplate',
    data() {
        return {
            suggestions: suggestions
        };
    }
};
</script>


<template>

    <articleTemp title="Coding my passions" meta="May 26, 2025 by G. D. Ungureanu">
        <p>I'm coding because I like to.</p>

        <suggestionsTemp :suggestions="suggestions" />
    </articleTemp>

</template>
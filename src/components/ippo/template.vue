<script setup>
import articleTemp from '../../templates/article.vue';
import suggestionsTemp from '../../templates/suggestions.vue';
</script>

<script>
import suggestions from './suggestions.json';

export default {
    name: 'IppoTemplate',
    data() {
        return {
            suggestions: suggestions
        };
    }
};
</script>

<template>

    <articleTemp title="Steps that I would like to take" meta="May 26, 2025 by G. D. Ungureanu">
        <p>So many things To do/To learn.</p>

        <suggestionsTemp :suggestions="suggestions" />
    </articleTemp>

</template>
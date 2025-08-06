<script setup>
import ArticleTemplate from '../../templates/article.vue';
import SuggestionsTemplate from '../../templates/suggestions.vue';
import suggestions from './suggestions.json';

defineOptions({
    name: 'IppoTemplate'
});
</script>

<template>

    <ArticleTemplate title="Steps that I would like to take" meta="May 26, 2025 by G. D. Ungureanu">
        <p>So many things To do/To learn.</p>

        <SuggestionsTemplate :suggestions="suggestions" storage-key="ippo" />
    </ArticleTemplate>

</template>
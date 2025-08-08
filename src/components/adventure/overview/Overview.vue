<script setup>
import ArticleTemplate from '../../../templates/Article.vue';
import ActionsTemplate from '../../../templates/Actions.vue';

defineOptions({
    name: 'BucketListTemplate'
});
</script>

<template>

    <ArticleTemplate title="Bucket List Actions" meta="August 4, 2025 by G. D. Ungureanu">
        <ActionsTemplate list-id="bucket-list-overview" />
    </ArticleTemplate>

</template>
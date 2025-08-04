<script setup>
import ArticleTemplate from '../../../templates/article.vue';
import ActionsTemplate from '../../../templates/actions.vue';

defineOptions({
    name: 'BucketListTemplate'
});
</script>

<template>

    <ArticleTemplate title="Bucket List Actions" meta="August 4, 2025 by G. D. Ungureanu">
        <ActionsTemplate list-id="bucket-list-overview" />
    </ArticleTemplate>

</template>
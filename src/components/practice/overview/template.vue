<script setup>
import ArticleTemplate from '../../../templates/article.vue';
import ActionsTemplate from '../../../templates/actions.vue';

defineOptions({
    name: 'PracticeTemplate'
});
</script>

<template>
    <ArticleTemplate title="Practice Actions" meta="Aug 6, 2025 by G. D. Ungureanu">
        <ActionsTemplate list-id="aa5987cf-398d-46a4-ba3a-119e2db784d2" />
    </ArticleTemplate>

    <ArticleTemplate title="Practice Areas" meta="Aug 6, 2025 by G. D. Ungureanu">
        <p>Develop consistent habits and track your progress across different areas of practice.</p>

        <h4>Available Practice Modules:</h4>
        <ul>
            <li><router-link to="/practice/routines"><strong>Routine Tracking</strong></router-link> - Track daily, weekly, monthly, and yearly habits with streak analytics</li>
        </ul>

        <p><em>More practice modules will be added in future updates.</em></p>
    </ArticleTemplate>
</template>
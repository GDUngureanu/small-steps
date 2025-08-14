<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'

  defineOptions({
    name: 'HabitsOverview',
  })
</script>

<template>
  <ArticleTemplate title="Habit Actions" meta="Aug 6, 2025 by G. D. Ungureanu">
    <ActionsTemplate list-id="aa5987cf-398d-46a4-ba3a-119e2db784d2" />
  </ArticleTemplate>

  <ArticleTemplate title="Habit Areas" meta="Aug 6, 2025 by G. D. Ungureanu">
    <p>Develop consistent habits and track your progress across different areas of your life.</p>

    <h4>Available Habit Modules:</h4>
    <ul>
      <li>
        <router-link to="/habits/routines"><strong>Habit Tracking</strong></router-link> - Track daily, weekly, monthly, and yearly habits with streak analytics
      </li>
    </ul>

    <p><em>More habit modules will be added in future updates.</em></p>
  </ArticleTemplate>
</template>
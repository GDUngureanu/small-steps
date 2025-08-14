<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'

  defineOptions({
    name: 'BalanceOverview',
  })

  const LIST_ID = 'dd7ec8ad-1729-4876-82a2-eebabb13b8a5'
</script>

<template>
  <ArticleTemplate title="Balance Actions" meta="August 14, 2025 by G. D. Ungureanu">
    <ActionsTemplate :list-id="LIST_ID" />
  </ArticleTemplate>

  <ArticleTemplate title="Balance - Health & Wellness" meta="August 14, 2025 by G. D. Ungureanu">
    <p>Achieve balance in your health and wellness journey through nutrition, fitness, and habit tracking.</p>

    <h3>Available Modules:</h3>
    <ul>
      <li>
        <router-link to="/balance/nutrition"><strong>Nutrition</strong></router-link>
        - Advanced ingredient database with nutritional analysis and meal planning tools
      </li>
      <li>
        <router-link to="/balance/fitness"><strong>Fitness</strong></router-link>
        - Track your fitness journey and workout activities
      </li>
      <li>
        <router-link to="/balance/habits"><strong>Habits</strong></router-link>
        - Monitor daily, weekly, monthly, and yearly habits with streak analytics
      </li>
    </ul>

    <p><em>Balance your physical wellness through mindful nutrition, consistent fitness practices, and positive habit formation.</em></p>
  </ArticleTemplate>
</template>

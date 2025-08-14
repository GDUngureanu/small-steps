<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'

  defineOptions({
    name: 'NutritionOverview',
  })

  const LIST_ID = 'dd7ec8ad-1729-4876-82a2-eebabb13b8a5'
</script>

<template>
  <ArticleTemplate title="Nutrition Actions" meta="July 31, 2025 by G. D. Ungureanu">
    <ActionsTemplate :list-id="LIST_ID" />
  </ArticleTemplate>

  <ArticleTemplate title="Nutrition" meta="July 31, 2025 by G. D. Ungureanu">
    <p>Explore nutrition-related content and manage your ingredient database.</p>
    
    <h3>Available Sections:</h3>
    <ul>
      <li>
        <router-link to="/nutrition/ingredients"><strong>Ingredients Database</strong></router-link>
        - Advanced ingredient filtering with nutritional analysis and Romanian text search
      </li>
      <li>
        <strong>Meal Prep</strong> - Planning and preparation tools for healthy meals
      </li>
    </ul>
  </ArticleTemplate>
</template>
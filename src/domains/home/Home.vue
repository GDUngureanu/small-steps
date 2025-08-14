<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'

  defineOptions({
    name: 'HomeOverview',
  })
</script>

<template>
  <ArticleTemplate title="Welcome Home" meta="Your personal growth journey">
    <p>Welcome to your personal memento mori application - a space for growth, learning, and mindful living.</p>
    
    <h4>Available Domains:</h4>
    <ul>
      <li><router-link to="/habits">Habits</router-link> - Track and build consistent habits</li>
      <li><router-link to="/literature">Literature</router-link> - Manage your reading journey</li>
      <li><router-link to="/entertainment">Entertainment</router-link> - Track movies, anime, and media</li>
      <li><router-link to="/nutrition">Nutrition</router-link> - Plan meals and track ingredients</li>
      <li><router-link to="/adventure">Adventure</router-link> - Explore destinations and travel</li>
      <li><router-link to="/finance">Finance</router-link> - Manage budget and investments</li>
      <li><router-link to="/fitness">Fitness</router-link> - Track workouts and health</li>
    </ul>
  </ArticleTemplate>
</template>
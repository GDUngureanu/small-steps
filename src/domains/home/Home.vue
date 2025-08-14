<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'

  defineOptions({
    name: 'Home',
  })
</script>

<template>
  <ArticleTemplate title="Welcome Home" meta="Your personal growth journey">
    <p>Welcome to your personal memento mori application - a space for growth, learning, and mindful living.</p>

    <h4>Available Domains:</h4>
    <ul>
      <li><router-link to="/growth">Growth</router-link> - Personal development through books and poems</li>
      <li><router-link to="/balance">Balance</router-link> - Health and wellness through nutrition, fitness, and habits</li>
      <li><router-link to="/exploration">Exploration</router-link> - Discover new territories through anime, movies, destinations, and experiments</li>
      <li><router-link to="/ambition">Ambition</router-link> - Drive your ambitions with ikigai and ippo goal tracking</li>
      <li><router-link to="/stability">Stability</router-link> - Build stability through financial planning and security measures</li>
      <li><router-link to="/pisicuta">Pisicuta</router-link> - Technology and laptop research</li>
    </ul>

    <p><em>Navigate through different aspects of life with purpose and intention.</em></p>
  </ArticleTemplate>
</template>

<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'

  defineOptions({
    name: 'PisicutaOverview',
  })
</script>

<template>
  <ArticleTemplate title="Pisicuta Actions" meta="August 13, 2025 by G. D. Ungureanu">
    <ActionsTemplate list-id="5c36ca7d-8260-4127-b028-1865c24e815b" />
  </ArticleTemplate>

  <ArticleTemplate title="Pisicuta" meta="August 13, 2025 by G. D. Ungureanu">
    <p>Dedicated content and research for Pisicuta's needs and interests.</p>
    
    <h3>Available Sections:</h3>
    <ul>
      <li>
        <router-link to="/pisicuta/laptops"><strong>Laptop Research</strong></router-link>
        - Comprehensive research and analysis of laptop options from 2021-2025
      </li>
    </ul>
  </ArticleTemplate>
</template>
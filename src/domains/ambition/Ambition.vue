<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'

  defineOptions({
    name: 'AmbitionOverview',
  })

  const AMBITION_LIST_ID = '9f2a8b7c-5d4e-3f1a-8b9c-6d7e8f9a0b1c'
</script>

<template>
  <ArticleTemplate title="Ambition Actions" meta="August 14, 2025 by G. D. Ungureanu">
    <ActionsTemplate :list-id="AMBITION_LIST_ID" />
  </ArticleTemplate>

  <ArticleTemplate title="Ambition Areas" meta="Drive your goals and aspirations forward">
    <p>Channel your ambitions into concrete actions and measurable progress toward your ultimate goals.</p>

    <h4>Available Ambition Modules:</h4>
    <ul>
      <li>
        <router-link to="/ambition/ikigai"><strong>Ikigai</strong></router-link> - Discover your life's purpose and direction through self-reflection
      </li>
      <li>
        <router-link to="/ambition/ippo"><strong>Ippo</strong></router-link> - Step-by-step progress tracking and milestone achievement system
      </li>
    </ul>

    <p><em>Turn your dreams into achievements through focused ambition.</em></p>
  </ArticleTemplate>
</template>
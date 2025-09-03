<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'

  defineOptions({
    name: 'VocationOverview',
  })

  const VOCATION_LIST_ID = '9f2a8b7c-5d4e-3f1a-8b9c-6d7e8f9a0b1c'
</script>

<template>
  <ArticleTemplate title="Vocation Actions" meta="August 14, 2025 by G. D. Ungureanu">
    <ActionsTemplate :list-id="VOCATION_LIST_ID" />
  </ArticleTemplate>

  <ArticleTemplate title="Vocation Areas" meta="Align your purpose and actions">
    <p>Channel your vocation into concrete actions and measurable progress toward your goals.</p>

    <h4>Available Vocation Modules:</h4>
    <ul>
      <li>
        <router-link to="/vocation/ikigai">
          <i class="bi bi-lightbulb me-1"></i>
          <strong>Ikigai</strong>
        </router-link>
        - Discover your life's purpose and direction through self-reflection
      </li>
      <li>
        <router-link to="/vocation/ippo">
          <i class="bi bi-flag me-1"></i>
          <strong>Ippo</strong>
        </router-link>
        - Step-by-step progress tracking and milestone achievement system
      </li>
    </ul>

    <p><em>Turn your purpose into achievements through focused vocation.</em></p>
  </ArticleTemplate>
</template>

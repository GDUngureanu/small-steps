<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'

  defineOptions({
    name: 'StabilityOverview',
  })

  const STABILITY_ACTIONS_LIST_ID = 'b1c2d3e4-f5a6-b7c8-d9e0-f1a2b3c4d5e6'
</script>

<template>
  <ArticleTemplate title="Stability Actions" meta="August 14, 2025 by G. D. Ungureanu">
    <ActionsTemplate :list-id="STABILITY_ACTIONS_LIST_ID" />
  </ArticleTemplate>

  <ArticleTemplate title="Stability - Financial & Life Security" meta="August 14, 2025 by G. D. Ungureanu">
    <p>Build stability and security across different aspects of your life through careful planning and management.</p>

    <h3>Available Modules:</h3>
    <ul>
      <li>
        <router-link to="/stability/finance"><strong>Finance</strong></router-link>
        - Financial planning and goal management for long-term security
      </li>
    </ul>

    <p><em>Create a stable foundation for your future through thoughtful planning and consistent effort.</em></p>
  </ArticleTemplate>
</template>
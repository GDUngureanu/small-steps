<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'

  defineOptions({
    name: 'FinanceOverview',
  })

  const LIST_ID = '11111111-1111-1111-1111-111111111111'
</script>

<template>
  <ArticleTemplate title="Finance Actions" meta="July 31, 2025 by G. D. Ungureanu">
    <ActionsTemplate :list-id="LIST_ID" />
  </ArticleTemplate>

  <ArticleTemplate title="Finance" meta="July 31, 2025 by G. D. Ungureanu">
    <p>Manage your financial planning and investment tracking.</p>

    <h3>Available Sections:</h3>
    <ul>
      <li>
        <router-link to="/finance/budget"><strong>Budget Management</strong></router-link>
        - Track and manage your personal budget and expenses
      </li>
      <li>
        <router-link to="/finance/investments"><strong>Investment Tracking</strong></router-link>
        - Monitor and analyze your investment portfolio
      </li>
    </ul>
  </ArticleTemplate>
</template>

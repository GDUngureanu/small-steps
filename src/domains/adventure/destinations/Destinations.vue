<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'
  import DestinationsList from './DestinationsList.vue'
  import DestinationsMap from './DestinationsMap.vue'
  import { useDestinations } from './useDestinations.js'

  defineOptions({
    name: 'Destinations',
  })

  const DESTINATIONS_ACTIONS_LIST_ID = '23137b93-91c1-46cb-a479-253ef789d17d'

  // Use destinations composable for all business logic
  const {
    destinationsByStatus,
    statusLabels,
    statusBadgeClasses,
    getPriorityStars,
    getCountryColor,
    findDestination,
  } = useDestinations()
</script>

<template>
  <!-- Destinations Actions -->
  <ArticleTemplate title="Destinations Actions" meta="August 5, 2025 by G. D. Ungureanu">
    <ActionsTemplate :list-id="DESTINATIONS_ACTIONS_LIST_ID" />
  </ArticleTemplate>

  <!-- Destinations List -->
  <DestinationsList 
    :destinations-by-status="destinationsByStatus"
    :status-labels="statusLabels"
    :status-badge-classes="statusBadgeClasses"
    :get-priority-stars="getPriorityStars"
  />

  <!-- Destinations Map -->
  <DestinationsMap
    :get-country-color="getCountryColor"
    :find-destination="findDestination"
    :status-labels="statusLabels"
  />
</template>
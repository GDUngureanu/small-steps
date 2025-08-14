// =====================================================
// Destinations Composable - Adventure Domain Internal
// =====================================================

import { computed } from 'vue'
import destinationsData from '../data/destinations.json'

/**
 * Business logic for managing destination statuses and priorities
 */
export function useDestinations() {
  
  // =============================================================================
  // CONFIGURATION & CONSTANTS
  // =============================================================================
  const countryColorsByStatus = {
    'epic-adventure-done': '#22C55E', // mint-green (Done)
    'halfway-there': '#2DD4BF', // seafoam-green (Partial)
    'adventure-awaits': '#38BDF8', // ice-blue (Want)
    'quest-for-fun': '#F5D90A', // sunlit-yellow (Maybe)
    'journey-postponed': '#64748B', // mist-gray (Not)
  }

  const statusLabels = {
    'epic-adventure-done': '<i class="bi bi-check-circle"></i> Epic Adventure Done',
    'halfway-there': '<i class="bi bi-compass-fill"></i> Halfway There',
    'adventure-awaits': '<i class="bi bi-compass"></i> Adventure Awaits',
    'quest-for-fun': '<i class="bi bi-binoculars"></i> Fun Idea',
    'journey-postponed': '<i class="bi bi-dash-circle-dotted"></i> Not Interested',
  }

  const statusBadgeClasses = {
    'epic-adventure-done': 'badge-mint-green',
    'halfway-there': 'badge-seafoam-green',
    'adventure-awaits': 'badge-ice-blue',
    'quest-for-fun': 'badge-sunlit-yellow',
    'journey-postponed': 'badge-mist-gray',
  }

  // =============================================================================
  // BUSINESS LOGIC FUNCTIONS
  // =============================================================================
  const getCityStatus = (city) => {
    if (!city.attractions || city.attractions.length === 0) {
      return 'quest-for-fun' // Cities without attractions default to Fun Idea
    }

    const visitedCount = city.attractions.filter((attraction) => attraction.visited).length
    const totalCount = city.attractions.length

    if (visitedCount === totalCount) {
      return 'epic-adventure-done' // All attractions visited
    } else if (visitedCount > 0) {
      return 'halfway-there' // Some attractions visited, some not
    } else {
      // Check average priority for unvisited cities
      const avgPriority = city.attractions.reduce((sum, attr) => sum + (attr.priority || 1), 0) / city.attractions.length
      return avgPriority >= 3 ? 'adventure-awaits' : 'quest-for-fun'
    }
  }

  const getDestinationStatus = (destination) => {
    if (!destination.cities || destination.cities.length === 0) {
      return 'quest-for-fun'
    }

    const cityStatuses = destination.cities.map((city) => getCityStatus(city))
    const epicCities = cityStatuses.filter((status) => status === 'epic-adventure-done').length
    const halfwayCities = cityStatuses.filter((status) => status === 'halfway-there').length
    const totalCities = cityStatuses.length

    if (epicCities === totalCities) {
      return 'epic-adventure-done' // All cities completed
    } else if (epicCities > 0 || halfwayCities > 0) {
      return 'halfway-there' // Some progress made
    } else {
      // Check average priority across all attractions for unvisited destinations
      const allAttractions = destination.cities.flatMap((city) => city.attractions || [])
      if (allAttractions.length === 0) {
        return 'quest-for-fun'
      }
      const avgPriority = allAttractions.reduce((sum, attr) => sum + (attr.priority || 1), 0) / allAttractions.length
      return avgPriority >= 3 ? 'adventure-awaits' : 'quest-for-fun'
    }
  }

  // Calculate country priority based on attraction priorities
  const getDestinationPriority = (destination) => {
    if (!destination.cities || destination.cities.length === 0) {
      return 1
    }

    // Get all attractions across all cities
    const allAttractions = destination.cities.flatMap((city) => city.attractions || [])

    if (allAttractions.length === 0) {
      return 1
    }

    // Calculate weighted average priority
    // Higher priority attractions contribute more to the overall country priority
    const totalPriorityPoints = allAttractions.reduce((sum, attraction) => sum + (attraction.priority || 1), 0)
    const averagePriority = totalPriorityPoints / allAttractions.length

    // Round to nearest integer (1-5)
    return Math.round(Math.max(1, Math.min(5, averagePriority)))
  }

  // Priority display helper - just stars
  const getPriorityStars = (priority) => {
    return '⭐'.repeat(Math.max(1, Math.min(5, priority || 1)))
  }

  // =============================================================================
  // PROCESSED DATA
  // =============================================================================
  const processedDestinations = destinationsData.destinations.map((destination) => ({
    ...destination,
    status: getDestinationStatus(destination),
    priority: getDestinationPriority(destination),
    cities: destination.cities?.map((city) => ({
      ...city,
      status: getCityStatus(city),
    })),
  }))

  // Generate country colors from destinations data with computed status
  const countryColors = computed(() => {
    return Object.fromEntries(processedDestinations.map((destination) => [destination.iso, countryColorsByStatus[destination.status] || '#d3d3d3']))
  })

  const getCountryColor = (countryId) => countryColors.value[countryId] || '#d3d3d3'

  // Helper function to find destination data by ISO code with computed status
  const findDestination = (iso) => {
    return processedDestinations.find((destination) => destination.iso === iso)
  }

  // Group destinations by computed status and sort by priority then alphabetically
  const destinationsByStatus = computed(() => {
    const sortByPriorityThenAlpha = (firstDestination, secondDestination) => {
      // First sort by priority (highest first)
      if (secondDestination.priority !== firstDestination.priority) {
        return secondDestination.priority - firstDestination.priority
      }
      // Then sort alphabetically
      return firstDestination.country.localeCompare(secondDestination.country)
    }

    return {
      completed: processedDestinations.filter((destination) => destination.status === 'epic-adventure-done').sort(sortByPriorityThenAlpha),
      inProgress: processedDestinations.filter((destination) => destination.status === 'halfway-there').sort(sortByPriorityThenAlpha),
      adventureAwaits: processedDestinations.filter((destination) => destination.status === 'adventure-awaits').sort(sortByPriorityThenAlpha),
      questForFun: processedDestinations.filter((destination) => destination.status === 'quest-for-fun').sort(sortByPriorityThenAlpha),
      postponed: processedDestinations.filter((destination) => destination.status === 'journey-postponed').sort(sortByPriorityThenAlpha),
    }
  })

  return {
    // Configuration
    countryColorsByStatus,
    statusLabels,
    statusBadgeClasses,
    
    // Data
    processedDestinations,
    destinationsByStatus,
    countryColors,
    
    // Utilities  
    getCityStatus,
    getDestinationStatus,
    getDestinationPriority,
    getPriorityStars,
    getCountryColor,
    findDestination,
  }
}
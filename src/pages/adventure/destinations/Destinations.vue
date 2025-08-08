<script setup>
  import { onMounted, ref, nextTick, computed } from 'vue'
  import ArticleTemplate from '@/components/shared/templates/Article.vue'
  import ActionsTemplate from '@/components/shared/templates/Actions.vue'
  import destinationsData from './destinations.json'

  defineOptions({
    name: 'DestinationsTemplate',
  })

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

  // =============================================================================
  // PREPROCESS DESTINATIONS
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
    return Object.fromEntries(
      processedDestinations.map((destination) => [destination.iso, countryColorsByStatus[destination.status] || '#d3d3d3'])
    )
  })

  const getCountryColor = (countryId) => countryColors.value[countryId] || '#d3d3d3'

  // Helper function to find destination data by ISO code with computed status
  const findDestination = (iso) => {
    return processedDestinations.find((d) => d.iso === iso)
  }

  // Variables for destinations list functionality
  const statusBadgeClasses = {
    'epic-adventure-done': 'badge-mint-green',
    'halfway-there': 'badge-seafoam-green',
    'adventure-awaits': 'badge-ice-blue',
    'quest-for-fun': 'badge-sunlit-yellow',
    'journey-postponed': 'badge-mist-gray',
  }

  // Priority display helper - just stars
  const getPriorityStars = (priority) => {
    return '⭐'.repeat(Math.max(1, Math.min(5, priority || 1)))
  }

  // Group destinations by computed status and sort by priority then alphabetically
  const destinationsByStatus = computed(() => {
    const sortByPriorityThenAlpha = (a, b) => {
      // First sort by priority (highest first)
      if (b.priority !== a.priority) {
        return b.priority - a.priority
      }
      // Then sort alphabetically
      return a.country.localeCompare(b.country)
    }

    return {
      completed: processedDestinations
        .filter((d) => d.status === 'epic-adventure-done')
        .sort(sortByPriorityThenAlpha),
      inProgress: processedDestinations
        .filter((d) => d.status === 'halfway-there')
        .sort(sortByPriorityThenAlpha),
      adventureAwaits: processedDestinations
        .filter((d) => d.status === 'adventure-awaits')
        .sort(sortByPriorityThenAlpha),
      questForFun: processedDestinations
        .filter((d) => d.status === 'quest-for-fun')
        .sort(sortByPriorityThenAlpha),
      postponed: processedDestinations
        .filter((d) => d.status === 'journey-postponed')
        .sort(sortByPriorityThenAlpha),
    }
  })

  // =============================================================================
  // MAP FUNCTIONALITY
  // =============================================================================
  const mapElement = ref(null)
  const isLoading = ref(true)
  const loadError = ref(null)
  const cachedGeoData = ref(null)

  // Performance optimization: Cache GeoJSON data
  async function fetchWorldData() {
    if (cachedGeoData.value) return cachedGeoData.value

    const response = await fetch(`${import.meta.env.BASE_URL}data/world.geojson`)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    cachedGeoData.value = await response.json()
    return cachedGeoData.value
  }

  const initializeMap = async (L) => {
    try {
      // Load GeoJSON data with caching
      const worldData = await fetchWorldData()

      // Mark loading as complete so the map container becomes available
      isLoading.value = false

      // Wait for next tick to ensure DOM is updated
      await nextTick()

      // Now initialize the map
      const map = L.map(mapElement.value, {
        center: [20, 0],
        zoom: 2,
        minZoom: 1,
        maxZoom: 6,
        maxBounds: [
          [-90, -180],
          [90, 180],
        ],
        worldCopyJump: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 18,
      }).addTo(map)

      L.geoJSON(worldData, {
        style: (feature) => ({
          color: '#666',
          weight: 0.5,
          fillColor: getCountryColor(feature.id),
          fillOpacity: 0.7,
        }),
        onEachFeature: (feature, layer) => {
          const countryName = feature.properties.name
          const countryId = feature.id
          const destination = findDestination(countryId)
          const status = destination ? destination.status : 'journey-postponed'

          // Build enhanced tooltip content with names and icons
          const statusIcon = statusLabels[status].match(/<i class="[^"]*"><\/i>/)?.[0] || ''
          let tooltipContent = `<strong>${countryName}</strong> ${statusIcon}`

          if (destination?.cities && destination.cities.length > 0) {
            tooltipContent += '<ul class="tooltip-cities">'
            destination.cities.forEach((city) => {
              const cityStatusIcon = statusLabels[city.status].match(/<i class="[^"]*"><\/i>/)?.[0] || ''
              tooltipContent += `<li>${city.name} ${cityStatusIcon}</li>`
            })
            tooltipContent += '</ul>'
          }

          layer.bindTooltip(tooltipContent, {
            sticky: true,
            className: 'custom-tooltip',
            maxWidth: 300,
          })
        },
      }).addTo(map)

      // Performance: Handle window resize events
      const handleResize = () => map.invalidateSize()
      window.addEventListener('resize', handleResize)

      // Store cleanup function for potential future use
      map._cleanupResize = () => {
        window.removeEventListener('resize', handleResize)
      }
    } catch {
      // Error loading map data
      // User-friendly error message
      loadError.value = 'Unable to load map data. Please check your internet connection and try again later.'
      isLoading.value = false
    }
  }

  onMounted(async () => {
    const { default: L } = await import('leaflet')
    await import('leaflet/dist/leaflet.css')
    await initializeMap(L)
  })
</script>

<template>
  <ArticleTemplate title="Destinations Actions" meta="August 5, 2025 by G. D. Ungureanu">
    <ActionsTemplate list-id="23137b93-91c1-46cb-a479-253ef789d17d" />
  </ArticleTemplate>

  <!-- Destinations List Article -->
  <ArticleTemplate title="Travel Destinations" meta="August 4, 2025 by G. D. Ungureanu">
    <!-- Halfway There -->
    <div class="mb-5" v-if="destinationsByStatus.inProgress.length > 0">
      <h3 class="mb-3">
        <span class="me-2"><i class="bi bi-compass-fill"></i> Halfway There</span>
      </h3>

      <div v-for="destination in destinationsByStatus.inProgress" :key="destination.iso" class="mb-3">
        <!-- Countries with cities - show accordion -->
        <div v-if="destination.cities && destination.cities.length > 0" class="accordion accordion-flush">
          <div class="accordion-item border-0">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed bg-transparent border-0 shadow-none p-0" type="button" data-bs-toggle="collapse" :data-bs-target="`#halfway-there-${destination.iso}`" aria-expanded="false">
                <div class="d-flex justify-content-between align-items-center w-100">
                  <span>
                    <strong>{{ destination.country }}</strong>
                  </span>
                  <span class="text-muted me-3" style="font-size: 0.8em">{{ getPriorityStars(destination.priority) }}</span>
                </div>
              </button>
            </h2>

            <div v-if="destination.cities && destination.cities.length > 0" class="accordion-collapse collapse" :id="`halfway-there-${destination.iso}`">
              <div class="accordion-body pt-2 ps-4">
                <div class="list-group list-group-flush small">
                  <div v-for="city in destination.cities" :key="city.name" class="list-group-item px-0 py-2 border-0">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                      <strong class="text-secondary">{{ city.name }}</strong>
                      <span :class="`badge ${statusBadgeClasses[city.status]}`" v-html="statusLabels[city.status]"> </span>
                    </div>
                    <ul class="list-unstyled ms-3 mb-0" v-if="city.attractions && city.attractions.length > 0">
                      <li v-for="attraction in city.attractions" :key="attraction.name" class="d-flex justify-content-between align-items-center py-1">
                        <span>{{ attraction.name }}</span>
                        <div class="d-flex gap-2 align-items-center">
                          <small class="text-muted">{{ getPriorityStars(attraction.priority) }}</small>
                          <i :class="`bi ${attraction.visited ? 'bi-check-circle text-success' : 'bi-compass text-info'}`"></i>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Countries without cities - simple display -->
        <div v-else class="d-flex justify-content-between align-items-center p-2 border-bottom">
          <span>
            <strong>{{ destination.country }}</strong>
          </span>
          <span class="text-muted" style="font-size: 0.8em">{{ getPriorityStars(destination.priority) }}</span>
        </div>
      </div>
    </div>

    <!-- Adventure Awaits -->
    <div class="mb-5" v-if="destinationsByStatus.adventureAwaits.length > 0">
      <h3 class="mb-3">
        <span class="me-2"><i class="bi bi-compass"></i> Adventure Awaits</span>
      </h3>

      <div v-for="destination in destinationsByStatus.adventureAwaits" :key="destination.iso" class="mb-3">
        <!-- Countries with cities - show accordion -->
        <div v-if="destination.cities && destination.cities.length > 0" class="accordion accordion-flush">
          <div class="accordion-item border-0">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed bg-transparent border-0 shadow-none p-0" type="button" data-bs-toggle="collapse" :data-bs-target="`#adventure-awaits-${destination.iso}`" aria-expanded="false">
                <div class="d-flex justify-content-between align-items-center w-100">
                  <span>
                    <strong>{{ destination.country }}</strong>
                  </span>
                  <span class="text-muted me-3" style="font-size: 0.8em">{{ getPriorityStars(destination.priority) }}</span>
                </div>
              </button>
            </h2>

            <div v-if="destination.cities && destination.cities.length > 0" class="accordion-collapse collapse" :id="`adventure-awaits-${destination.iso}`">
              <div class="accordion-body pt-2 ps-4">
                <div class="list-group list-group-flush small">
                  <div v-for="city in destination.cities" :key="city.name" class="list-group-item px-0 py-2 border-0">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                      <strong class="text-secondary">{{ city.name }}</strong>
                      <span :class="`badge ${statusBadgeClasses[city.status]}`" v-html="statusLabels[city.status]"> </span>
                    </div>
                    <ul class="list-unstyled ms-3 mb-0" v-if="city.attractions && city.attractions.length > 0">
                      <li v-for="attraction in city.attractions" :key="attraction.name" class="d-flex justify-content-between align-items-center py-1">
                        <span>{{ attraction.name }}</span>
                        <div class="d-flex gap-2 align-items-center">
                          <small class="text-muted">{{ getPriorityStars(attraction.priority) }}</small>
                          <i :class="`bi ${attraction.visited ? 'bi-check-circle text-success' : 'bi-compass text-info'}`"></i>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Countries without cities - simple display -->
        <div v-else class="d-flex justify-content-between align-items-center p-2 border-bottom">
          <span>
            <strong>{{ destination.country }}</strong>
          </span>
          <span class="text-muted" style="font-size: 0.8em">{{ getPriorityStars(destination.priority) }}</span>
        </div>
      </div>
    </div>

    <!-- Fun Idea -->
    <div class="mb-5" v-if="destinationsByStatus.questForFun.length > 0">
      <h3 class="mb-3">
        <span class="me-2"><i class="bi bi-binoculars"></i> Fun Idea</span>
      </h3>

      <div v-for="destination in destinationsByStatus.questForFun" :key="destination.iso" class="mb-3">
        <!-- Countries with cities - show accordion -->
        <div v-if="destination.cities && destination.cities.length > 0" class="accordion accordion-flush">
          <div class="accordion-item border-0">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed bg-transparent border-0 shadow-none p-0" type="button" data-bs-toggle="collapse" :data-bs-target="`#quest-for-fun-${destination.iso}`" aria-expanded="false">
                <div class="d-flex justify-content-between align-items-center w-100">
                  <span>
                    <strong>{{ destination.country }}</strong>
                  </span>
                  <span class="text-muted me-3" style="font-size: 0.8em">{{ getPriorityStars(destination.priority) }}</span>
                </div>
              </button>
            </h2>

            <div v-if="destination.cities && destination.cities.length > 0" class="accordion-collapse collapse" :id="`quest-for-fun-${destination.iso}`">
              <div class="accordion-body pt-2 ps-4">
                <div class="list-group list-group-flush small">
                  <div v-for="city in destination.cities" :key="city.name" class="list-group-item px-0 py-2 border-0">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                      <strong class="text-secondary">{{ city.name }}</strong>
                      <span :class="`badge ${statusBadgeClasses[city.status]}`" v-html="statusLabels[city.status]"> </span>
                    </div>
                    <ul class="list-unstyled ms-3 mb-0" v-if="city.attractions && city.attractions.length > 0">
                      <li v-for="attraction in city.attractions" :key="attraction.name" class="d-flex justify-content-between align-items-center py-1">
                        <span>{{ attraction.name }}</span>
                        <div class="d-flex gap-2 align-items-center">
                          <small class="text-muted">{{ getPriorityStars(attraction.priority) }}</small>
                          <i :class="`bi ${attraction.visited ? 'bi-check-circle text-success' : 'bi-compass text-info'}`"></i>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Countries without cities - simple display -->
        <div v-else class="d-flex justify-content-between align-items-center">
          <span>
            <strong>{{ destination.country }}</strong>
          </span>
          <span class="text-muted" style="font-size: 0.8em">{{ getPriorityStars(destination.priority) }}</span>
        </div>
      </div>
    </div>

    <!-- Adventures Done -->
    <div class="mb-5" v-if="destinationsByStatus.completed.length > 0">
      <h3 class="mb-3">
        <span class="me-2"><i class="bi bi-check-circle"></i> Adventures Done</span>
      </h3>

      <div v-for="destination in destinationsByStatus.completed" :key="destination.iso" class="mb-3">
        <!-- Countries with cities - show accordion -->
        <div v-if="destination.cities && destination.cities.length > 0" class="accordion accordion-flush">
          <div class="accordion-item border-0">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed bg-transparent border-0 shadow-none p-0" type="button" data-bs-toggle="collapse" :data-bs-target="`#adventures-done-${destination.iso}`" aria-expanded="false">
                <div class="d-flex justify-content-between align-items-center w-100">
                  <span>
                    <strong>{{ destination.country }}</strong>
                  </span>
                  <span class="text-muted me-3" style="font-size: 0.8em">{{ getPriorityStars(destination.priority) }}</span>
                </div>
              </button>
            </h2>

            <div v-if="destination.cities && destination.cities.length > 0" class="accordion-collapse collapse" :id="`adventures-done-${destination.iso}`">
              <div class="accordion-body pt-2 ps-4">
                <div class="list-group list-group-flush small">
                  <div v-for="city in destination.cities" :key="city.name" class="list-group-item px-0 py-2 border-0">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                      <strong class="text-secondary">{{ city.name }}</strong>
                      <span :class="`badge ${statusBadgeClasses[city.status]}`" v-html="statusLabels[city.status]"> </span>
                    </div>
                    <ul class="list-unstyled ms-3 mb-0" v-if="city.attractions && city.attractions.length > 0">
                      <li v-for="attraction in city.attractions" :key="attraction.name" class="d-flex justify-content-between align-items-center py-1">
                        <span>{{ attraction.name }}</span>
                        <div class="d-flex gap-2 align-items-center">
                          <small class="text-muted">{{ getPriorityStars(attraction.priority) }}</small>
                          <i :class="`bi ${attraction.visited ? 'bi-check-circle text-success' : 'bi-compass text-info'}`"></i>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Countries without cities - simple display -->
        <div v-else class="d-flex justify-content-between align-items-center p-2 border-bottom">
          <span>
            <strong>{{ destination.country }}</strong>
          </span>
          <span class="text-muted" style="font-size: 0.8em">{{ getPriorityStars(destination.priority) }}</span>
        </div>
      </div>
    </div>
  </ArticleTemplate>

  <!-- Destinations Map Article -->
  <ArticleTemplate title="Destinations Map" meta="August 4, 2025 by G. D. Ungureanu">
    <div class="mb-4">
      <!-- Loading State -->
      <div v-if="isLoading" class="map-container mb-4 d-flex align-items-center justify-content-center">
        <div class="text-center">
          <div class="spinner-border text-primary mb-2" role="status" aria-live="polite" aria-label="Loading map data">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="text-muted">Loading world map data...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="loadError" class="map-container mb-4 d-flex align-items-center justify-content-center">
        <div class="text-center">
          <i class="bi bi-exclamation-triangle text-warning fs-1 mb-2"></i>
          <p class="text-danger">Failed to load map data</p>
          <small class="text-muted">{{ loadError }}</small>
        </div>
      </div>

      <!-- Map Container -->
      <div v-else ref="mapElement" class="map-container mb-4" role="region" aria-label="Interactive world map showing travel statuses by country"></div>

      <p class="mb-3">
        Legend:
        <span class="badge badge-mint-green me-2"><i class="bi bi-check-circle"></i> Epic Adventure Done</span>
        <span class="badge badge-seafoam-green me-2"><i class="bi bi-compass-fill"></i> Halfway There</span>
        <span class="badge badge-ice-blue me-2"><i class="bi bi-compass"></i> Adventure Awaits</span>
        <span class="badge badge-sunlit-yellow me-2"><i class="bi bi-binoculars"></i> Fun Idea</span>
        <span class="badge badge-mist-gray"><i class="bi bi-dash-circle-dotted"></i> Not Interested</span>
      </p>
    </div>
  </ArticleTemplate>
</template>

<style scoped>
  .map-container {
    height: 500px;
    width: 100%;
    border: 1px solid #dee2e6;
    border-radius: 0.375rem;
  }
</style>

<style>
  /* Enhanced tooltip styling */
  .custom-tooltip {
    background-color: rgba(0, 0, 0, 0.9) !important;
    color: white !important;
    border: none !important;
    border-radius: 6px !important;
    padding: 10px 12px !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
    backdrop-filter: blur(8px) !important;
  }

  .custom-tooltip::before {
    border-top-color: rgba(0, 0, 0, 0.9) !important;
  }

  /* Tooltip cities list styling */
  .custom-tooltip .tooltip-cities {
    margin: 8px 0 4px 0 !important;
    padding-left: 16px !important;
    list-style: none !important;
  }

  .custom-tooltip .tooltip-cities li {
    margin-bottom: 4px !important;
    position: relative !important;
  }

  .custom-tooltip .tooltip-cities li::before {
    content: '\F3E8' !important;
    position: absolute !important;
    left: -20px !important;
    font-family: 'bootstrap-icons' !important;
    font-size: 12px !important;
  }

  /* Interactive hover effects for countries */
  .leaflet-interactive {
    transition:
      fill-opacity 0.3s ease,
      stroke-width 0.2s ease !important;
    cursor: pointer !important;
  }

  .leaflet-interactive:hover {
    fill-opacity: 0.9 !important;
    stroke-width: 2 !important;
  }

  .leaflet-interactive:focus {
    outline: 2px solid #007bff !important;
    outline-offset: 2px !important;
    fill-opacity: 0.9 !important;
  }

  /* Loading spinner enhancements */
  .spinner-border {
    width: 3rem;
    height: 3rem;
  }
</style>

<script setup>
  import { onMounted, ref, nextTick } from 'vue'
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'

  defineOptions({
    name: 'DestinationsMap',
  })

  const props = defineProps({
    getCountryColor: {
      type: Function,
      required: true,
    },
    findDestination: {
      type: Function,
      required: true,
    },
    statusLabels: {
      type: Object,
      required: true,
    },
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
          fillColor: props.getCountryColor(feature.id),
          fillOpacity: 0.7,
        }),
        onEachFeature: (feature, layer) => {
          const countryName = feature.properties.name
          const countryId = feature.id
          const destination = props.findDestination(countryId)
          const status = destination ? destination.status : 'journey-postponed'

          // Build enhanced tooltip content with names and icons
          const statusIcon = props.statusLabels[status].match(/<i class="[^"]*"><\/i>/)?.[0] || ''
          let tooltipContent = `<strong>${countryName}</strong> ${statusIcon}`

          if (destination?.cities && destination.cities.length > 0) {
            tooltipContent += '<ul class="tooltip-cities">'
            destination.cities.forEach((city) => {
              const cityStatusIcon = props.statusLabels[city.status].match(/<i class="[^"]*"><\/i>/)?.[0] || ''
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

  onMounted(() => {
    const loadMap = async () => {
      const { default: L } = await import('leaflet')
      await import('leaflet/dist/leaflet.css')
      await initializeMap(L)
    }

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(async (entries, obs) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          obs.disconnect()
          await loadMap()
        }
      })
      if (mapElement.value) {
        observer.observe(mapElement.value)
      }
    } else {
      loadMap()
    }
  })
</script>

<template>
  <ArticleTemplate title="Destinations Map" meta="August 4, 2025 by G. D. Ungureanu">
    <div class="mb-4">
      <!-- Loading State -->
      <div v-if="isLoading" ref="mapElement" class="map-container mb-4 d-flex align-items-center justify-content-center">
        <div class="text-center">
          <div class="spinner-border text-primary mb-2" role="status" aria-live="polite" aria-label="Loading map data">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="text-muted">Loading world map data...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="loadError" ref="mapElement" class="map-container mb-4 d-flex align-items-center justify-content-center">
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

<script setup>
import { onMounted, ref, nextTick, computed } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ArticleTemplate from '../../../templates/article.vue';
import SuggestionsTemplate from '../../../templates/suggestions.vue';
import suggestions from './suggestions.json';
import destinationsData from './destinations.json';

defineOptions({
  name: 'DestinationsTemplate'
});

// Dynamic configuration from JSON data
const countryColorsByStatus = {
  visited: '#4caf50',
  planned: '#2196f3',
  dreaming: '#ff9800'
};

const statusLabels = {
  visited: '✅ Visited',
  planned: '📅 Planned',
  dreaming: '💭 Dreaming',
  unexplored: 'Not yet explored'
};

// Generate country colors from destinations data with computed status
const countryColors = computed(() => {
  return Object.fromEntries(
    destinationsWithStatus.value.map(destination => [
      destination.iso,
      countryColorsByStatus[destination.status] || '#d3d3d3'
    ])
  );
});

const getCountryColor = (countryId) => countryColors.value[countryId] || '#d3d3d3';

// Status deduction logic
const getCityStatus = (city) => {
  if (!city.attractions || city.attractions.length === 0) {
    return 'dreaming'; // Cities without attractions are dreaming
  }
  
  const visitedCount = city.attractions.filter(attraction => attraction.visited).length;
  const totalCount = city.attractions.length;
  
  if (visitedCount === totalCount) {
    return 'visited'; // All attractions visited
  } else if (visitedCount > 0) {
    return 'planned'; // Some attractions visited, some not
  } else {
    return 'dreaming'; // No attractions visited yet
  }
};

const getDestinationStatus = (destination) => {
  if (!destination.cities || destination.cities.length === 0) {
    return 'dreaming';
  }
  
  const cityStatuses = destination.cities.map(city => getCityStatus(city));
  const visitedCities = cityStatuses.filter(status => status === 'visited').length;
  const plannedCities = cityStatuses.filter(status => status === 'planned').length;
  const totalCities = cityStatuses.length;
  
  if (visitedCities === totalCities) {
    return 'visited'; // All cities visited
  } else if (visitedCities > 0 || plannedCities > 0) {
    return 'planned'; // Some progress made
  } else {
    return 'dreaming'; // No progress yet
  }
};

// Calculate country priority based on attraction priorities
const getDestinationPriority = (destination) => {
  if (!destination.cities || destination.cities.length === 0) {
    return 1;
  }
  
  // Get all attractions across all cities
  const allAttractions = destination.cities.flatMap(city => city.attractions || []);
  
  if (allAttractions.length === 0) {
    return 1;
  }
  
  // Calculate weighted average priority
  // Higher priority attractions contribute more to the overall country priority
  const totalPriorityPoints = allAttractions.reduce((sum, attraction) => sum + (attraction.priority || 1), 0);
  const averagePriority = totalPriorityPoints / allAttractions.length;
  
  // Round to nearest integer (1-5)
  return Math.round(Math.max(1, Math.min(5, averagePriority)));
};

// Helper function to find destination data by ISO code with computed status
const findDestination = (iso) => {
  return destinationsWithStatus.value.find(d => d.iso === iso);
};

// Computed destinations with status and priority
const destinationsWithStatus = computed(() => {
  return destinationsData.destinations.map(destination => ({
    ...destination,
    status: getDestinationStatus(destination),
    priority: getDestinationPriority(destination),
    cities: destination.cities?.map(city => ({
      ...city,
      status: getCityStatus(city)
    }))
  }));
});

// Variables for destinations list functionality
const statusBadgeClasses = {
  visited: 'bg-success',
  planned: 'bg-primary',
  dreaming: 'bg-warning'
};

// Priority display helper - just stars
const getPriorityStars = (priority) => {
  return '⭐'.repeat(Math.max(1, Math.min(5, priority || 1)));
};

// Group destinations by computed status and sort by priority then alphabetically
const destinationsByStatus = computed(() => {
  const sortByPriorityThenAlpha = (a, b) => {
    // First sort by priority (highest first)
    if (b.priority !== a.priority) {
      return b.priority - a.priority;
    }
    // Then sort alphabetically
    return a.country.localeCompare(b.country);
  };

  return {
    visited: destinationsWithStatus.value
      .filter(d => d.status === 'visited')
      .sort(sortByPriorityThenAlpha),
    unvisited: destinationsWithStatus.value
      .filter(d => d.status === 'planned' || d.status === 'dreaming')
      .sort(sortByPriorityThenAlpha)
  };
});

const mapElement = ref(null);
const isLoading = ref(true);
const loadError = ref(null);
const cachedGeoData = ref(null);

// Performance optimization: Cache GeoJSON data
async function fetchWorldData() {
  if (cachedGeoData.value) return cachedGeoData.value;
  
  const response = await fetch(`${import.meta.env.BASE_URL}data/world.geojson`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  cachedGeoData.value = await response.json();
  return cachedGeoData.value;
}

const initializeMap = async () => {
  try {
    // Load GeoJSON data with caching
    const worldData = await fetchWorldData();

    // Mark loading as complete so the map container becomes available
    isLoading.value = false;

    // Wait for next tick to ensure DOM is updated
    await nextTick();

    // Now initialize the map
    const map = L.map(mapElement.value, {
      center: [20, 0],
      zoom: 2,
      minZoom: 1,
      maxZoom: 6,
      maxBounds: [[-90, -180], [90, 180]],
      worldCopyJump: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 18
    }).addTo(map);

    L.geoJSON(worldData, {
      style: feature => ({
        color: '#666',
        weight: 0.5,
        fillColor: getCountryColor(feature.id),
        fillOpacity: 0.7
      }),
      onEachFeature: (feature, layer) => {
        const countryName = feature.properties.name;
        const countryId = feature.id;
        const destination = findDestination(countryId);
        const status = destination ? destination.status : 'unexplored';
        const statusLabel = statusLabels[status];

        // Build enhanced tooltip content
        let tooltipContent = `<strong>${countryName}</strong><br><small>${statusLabel}</small>`;
        
        if (destination?.cities && destination.cities.length > 0) {
          tooltipContent += '<br><br><strong>Cities to visit:</strong>';
          tooltipContent += '<ul class="tooltip-cities">';
          destination.cities.forEach(city => {
            const cityStatus = statusLabels[city.status];
            tooltipContent += `<li>${city.name} <small>(${cityStatus})</small></li>`;
          });
          tooltipContent += '</ul>';
        }

        layer.bindTooltip(tooltipContent, { 
          sticky: true,
          className: 'custom-tooltip',
          maxWidth: 300
        });

        // Accessibility improvements: keyboard navigation
        const el = layer.getElement();
        if (el) {
          el.setAttribute('tabindex', '0');
          el.setAttribute('aria-label', `${countryName}, Status: ${statusLabel}${destination?.cities ? `, ${destination.cities.length} cities planned` : ''}`);
          el.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              layer.openTooltip();
            }
          });
        }
      }
    }).addTo(map);

    // Performance: Handle window resize events
    const handleResize = () => map.invalidateSize();
    window.addEventListener('resize', handleResize);

    // Store cleanup function for potential future use
    map._cleanupResize = () => {
      window.removeEventListener('resize', handleResize);
    };

  } catch (error) {
    console.error('Error loading map data:', error);
    // User-friendly error message
    loadError.value = 'Unable to load map data. Please check your internet connection and try again later.';
    isLoading.value = false;
  }
};

onMounted(() => {
  initializeMap();
});
</script>

<template>
  <!-- Destinations List Article -->
  <ArticleTemplate title="My Travel Destinations" meta="August 4, 2025 by G. D. Ungureanu">
    <p>A comprehensive list of all the places I want to visit, organized by travel status.</p>

    <!-- Summary Stats -->
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="card border-success">
          <div class="card-body text-center">
            <h3 class="text-success mb-1">{{ destinationsByStatus.visited.length }}</h3>
            <small class="text-muted">✅ Visited Countries</small>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-primary">
          <div class="card-body text-center">
            <h3 class="text-primary mb-1">{{ destinationsByStatus.unvisited.length }}</h3>
            <small class="text-muted">🌍 Countries to Visit</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Visited Countries -->
    <div class="mb-5">
      <h3 class="mb-3">
        <span class="badge bg-success me-2">✅ Visited</span>
        {{ destinationsByStatus.visited.length }} {{ destinationsByStatus.visited.length === 1 ? 'Country' : 'Countries' }}
      </h3>
      
      <div v-for="destination in destinationsByStatus.visited" :key="destination.iso" class="mb-3">
        <div class="form-check">
          <input type="checkbox" class="form-check-input" :id="`visited-${destination.iso}`" checked disabled>
          <label class="form-check-label d-flex justify-content-between align-items-center w-100" :for="`visited-${destination.iso}`">
            <span>
              <strong>{{ destination.country }}</strong>
              <small class="text-muted ms-2">
                ({{ destination.cities?.length || 0 }} {{ destination.cities?.length === 1 ? 'city' : 'cities' }})
              </small>
            </span>
            <div class="d-flex align-items-center gap-2">
              <span class="text-muted" style="font-size: 0.8em;">{{ getPriorityStars(destination.priority) }}</span>
              <button 
                v-if="destination.cities && destination.cities.length > 0"
                class="btn btn-link btn-sm p-0 text-decoration-none text-muted" 
                type="button" 
                data-bs-toggle="collapse" 
                :data-bs-target="`#visited-details-${destination.iso}`"
                aria-expanded="false"
                style="font-size: 0.9em;"
              >
                <i class="bi bi-eye"></i>
              </button>
            </div>
          </label>
        </div>
        
        <!-- Simple accordion for cities and attractions -->
        <div v-if="destination.cities && destination.cities.length > 0" class="collapse ms-4 mt-2" :id="`visited-details-${destination.iso}`">
          <div class="list-group list-group-flush small">
            <div v-for="city in destination.cities" :key="city.name" class="list-group-item px-0 py-2">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <strong class="text-primary">{{ city.name }}</strong>
                <span :class="`badge ${statusBadgeClasses[city.status]}`">
                  {{ statusLabels[city.status] }}
                </span>
              </div>
              <ul class="list-unstyled ms-3 mb-0" v-if="city.attractions && city.attractions.length > 0">
                <li v-for="attraction in city.attractions" :key="attraction.name" class="d-flex justify-content-between align-items-center py-1">
                  <span>{{ attraction.name }}</span>
                  <div class="d-flex gap-2 align-items-center">
                    <small class="text-muted">{{ getPriorityStars(attraction.priority) }}</small>
                    <span :class="`badge ${attraction.visited ? 'bg-success' : 'bg-secondary'}`">
                      {{ attraction.visited ? '✅' : '❌' }}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <p v-if="destinationsByStatus.visited.length === 0" class="text-muted fst-italic">
        No countries visited yet. Time to start exploring! 🌍
      </p>
    </div>

    <!-- Countries to Visit -->
    <div class="mb-5">
      <h3 class="mb-3">
        <span class="badge bg-primary me-2">🌍 To Visit</span>
        {{ destinationsByStatus.unvisited.length }} {{ destinationsByStatus.unvisited.length === 1 ? 'Country' : 'Countries' }}
      </h3>
      
      <div v-for="destination in destinationsByStatus.unvisited" :key="destination.iso" class="mb-3">
        <div class="form-check">
          <input type="checkbox" class="form-check-input" :id="`unvisited-${destination.iso}`">
          <label class="form-check-label d-flex justify-content-between align-items-center w-100" :for="`unvisited-${destination.iso}`">
            <span>
              <strong>{{ destination.country }}</strong>
              <small class="text-muted ms-2">
                ({{ destination.cities?.length || 0 }} {{ destination.cities?.length === 1 ? 'city' : 'cities' }})
              </small>
            </span>
            <div class="d-flex align-items-center gap-2">
              <span class="text-muted" style="font-size: 0.8em;">{{ getPriorityStars(destination.priority) }}</span>
              <button 
                v-if="destination.cities && destination.cities.length > 0"
                class="btn btn-link btn-sm p-0 text-decoration-none text-muted" 
                type="button" 
                data-bs-toggle="collapse" 
                :data-bs-target="`#unvisited-details-${destination.iso}`"
                aria-expanded="false"
                style="font-size: 0.9em;"
              >
                <i class="bi bi-eye"></i>
              </button>
            </div>
          </label>
        </div>
        
        <!-- Simple accordion for cities and attractions -->
        <div v-if="destination.cities && destination.cities.length > 0" class="collapse ms-4 mt-2" :id="`unvisited-details-${destination.iso}`">
          <div class="list-group list-group-flush small">
            <div v-for="city in destination.cities" :key="city.name" class="list-group-item px-0 py-2">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <strong class="text-primary">{{ city.name }}</strong>
                <span :class="`badge ${statusBadgeClasses[city.status]}`">
                  {{ statusLabels[city.status] }}
                </span>
              </div>
              <ul class="list-unstyled ms-3 mb-0" v-if="city.attractions && city.attractions.length > 0">
                <li v-for="attraction in city.attractions" :key="attraction.name" class="d-flex justify-content-between align-items-center py-1">
                  <span>{{ attraction.name }}</span>
                  <div class="d-flex gap-2 align-items-center">
                    <small class="text-muted">{{ getPriorityStars(attraction.priority) }}</small>
                    <span :class="`badge ${attraction.visited ? 'bg-success' : 'bg-secondary'}`">
                      {{ attraction.visited ? '✅' : '❌' }}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <p v-if="destinationsByStatus.unvisited.length === 0" class="text-muted fst-italic">
        All countries visited! Time to add more destinations to your bucket list! ✈️
      </p>
    </div>

    <!-- Quick Stats Footer -->
    <div class="alert alert-info mt-4">
      <h6 class="alert-heading">📊 Travel Statistics</h6>
      <div class="row text-center">
        <div class="col-md-3">
          <strong>{{ destinationsWithStatus.length }}</strong><br>
          <small>Total Countries</small>
        </div>
        <div class="col-md-3">
          <strong>{{ destinationsWithStatus.reduce((sum, d) => sum + (d.cities?.length || 0), 0) }}</strong><br>
          <small>Total Cities</small>
        </div>
        <div class="col-md-3">
          <strong>{{ destinationsWithStatus.reduce((sum, d) => sum + (d.cities?.reduce((citySum, c) => citySum + (c.attractions?.length || 0), 0) || 0), 0) }}</strong><br>
          <small>Total Attractions</small>
        </div>
        <div class="col-md-3">
          <strong>{{ Math.round((destinationsByStatus.visited.length / destinationsWithStatus.length) * 100) }}%</strong><br>
          <small>Completed</small>
        </div>
      </div>
    </div>
  </ArticleTemplate>

  <!-- Destinations Map Article -->
  <ArticleTemplate title="Travel Status Map" meta="August 4, 2025 by G. D. Ungureanu">
    <p>Interactive world map showing destinations colored by travel status. Hover over countries to see detailed information.</p>
    
    <div class="mb-4">
      <p class="small text-muted mb-3">Countries colored by travel status: 
        <span class="badge bg-success">✅ Visited</span>
        <span class="badge bg-primary">📅 Planned</span>
        <span class="badge bg-warning">💭 Dreaming</span>
        <span class="badge bg-secondary">Not yet explored</span>
      </p>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="map-container mb-4 d-flex align-items-center justify-content-center">
        <div class="text-center">
          <div 
            class="spinner-border text-primary mb-2" 
            role="status" 
            aria-live="polite" 
            aria-label="Loading map data"
          >
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
      <div 
        v-else 
        ref="mapElement" 
        class="map-container mb-4"
        role="region"
        aria-label="Interactive world map showing travel statuses by country"
      ></div>
    </div>

    <SuggestionsTemplate :suggestions="suggestions" />
  </ArticleTemplate>
</template>

<style scoped>
.map-container { 
  height: 500px; 
  width: 100%; 
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
}

/* Clean button styling for details toggle */
.btn-link:hover {
  color: var(--bs-primary) !important;
}
</style>

<style>
/* CSS Variables for theming */
:root {
  --visited-color: #4caf50;
  --planned-color: #2196f3;
  --dreaming-color: #ff9800;
  --unexplored-color: #d3d3d3;
  --map-border-color: #666;
}

/* Dark theme support (if needed in future) */
[data-bs-theme="dark"] {
  --visited-color: #81c784;
  --planned-color: #64b5f6;
  --dreaming-color: #ffb74d;
  --unexplored-color: #757575;
  --map-border-color: #888;
}

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
  content: "📍" !important;
  position: absolute !important;
  left: -16px !important;
}

/* Interactive hover effects for countries */
.leaflet-interactive {
  transition: fill-opacity 0.3s ease, stroke-width 0.2s ease !important;
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

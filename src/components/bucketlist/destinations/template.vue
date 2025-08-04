<script setup>
import { onMounted, ref, nextTick, computed } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ArticleTemplate from '../../../templates/article.vue';
import SuggestionsTemplate from '../../../templates/suggestions.vue';
import suggestions from './suggestions.json';
import destinationsData from '../../../data/destinations.json';

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

// Generate country colors from destinations data
const countryColors = computed(() => {
  return Object.fromEntries(
    destinationsData.destinations.map(destination => [
      destination.iso,
      countryColorsByStatus[destination.status] || '#d3d3d3'
    ])
  );
});

const getCountryColor = (countryId) => countryColors.value[countryId] || '#d3d3d3';

// Helper function to find destination data by ISO code
const findDestination = (iso) => {
  return destinationsData.destinations.find(d => d.iso === iso);
};

// Variables for destinations list functionality
const statusBadgeClasses = {
  visited: 'bg-success',
  planned: 'bg-primary',
  dreaming: 'bg-warning'
};

// Group destinations by status for better organization
const destinationsByStatus = {
  visited: destinationsData.destinations.filter(d => d.status === 'visited'),
  planned: destinationsData.destinations.filter(d => d.status === 'planned'),
  dreaming: destinationsData.destinations.filter(d => d.status === 'dreaming')
};

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
      <div class="col-md-4">
        <div class="card border-success">
          <div class="card-body text-center">
            <h3 class="text-success mb-1">{{ destinationsByStatus.visited.length }}</h3>
            <small class="text-muted">✅ Visited Countries</small>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-primary">
          <div class="card-body text-center">
            <h3 class="text-primary mb-1">{{ destinationsByStatus.planned.length }}</h3>
            <small class="text-muted">📅 Planned Countries</small>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-warning">
          <div class="card-body text-center">
            <h3 class="text-warning mb-1">{{ destinationsByStatus.dreaming.length }}</h3>
            <small class="text-muted">💭 Dream Countries</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Destinations by Status -->
    <div v-for="(destinations, status) in destinationsByStatus" :key="status" class="mb-5">
      <h3 class="mb-3">
        <span :class="`badge ${statusBadgeClasses[status]} me-2`">
          {{ statusLabels[status] }}
        </span>
        {{ destinations.length }} {{ destinations.length === 1 ? 'Country' : 'Countries' }}
      </h3>

      <div class="row">
        <div v-for="destination in destinations" :key="destination.iso" class="col-lg-6 mb-4">
          <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">{{ destination.country }}</h5>
              <span :class="`badge ${statusBadgeClasses[destination.status]}`">
                {{ statusLabels[destination.status] }}
              </span>
            </div>
            
            <div class="card-body" v-if="destination.cities">
              <h6 class="card-subtitle mb-3 text-muted">
                {{ destination.cities.length }} {{ destination.cities.length === 1 ? 'City' : 'Cities' }} to Explore
              </h6>
              
              <div class="accordion" :id="`accordion-${destination.iso}`">
                <div v-for="(city, cityIndex) in destination.cities" :key="city.name" class="accordion-item">
                  <h2 class="accordion-header">
                    <button 
                      class="accordion-button collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      :data-bs-target="`#collapse-${destination.iso}-${cityIndex}`"
                      :aria-expanded="false"
                      :aria-controls="`collapse-${destination.iso}-${cityIndex}`"
                    >
                      <strong>{{ city.name }}</strong>
                      <span :class="`badge ${statusBadgeClasses[city.status]} ms-2`" style="font-size: 0.7em;">
                        {{ statusLabels[city.status] }}
                      </span>
                    </button>
                  </h2>
                  <div 
                    :id="`collapse-${destination.iso}-${cityIndex}`" 
                    class="accordion-collapse collapse"
                    :data-bs-parent="`#accordion-${destination.iso}`"
                  >
                    <div class="accordion-body">
                      <ul class="list-unstyled mb-0" v-if="city.attractions">
                        <li v-for="attraction in city.attractions" :key="attraction.name" class="d-flex justify-content-between align-items-center mb-2">
                          <span>{{ attraction.name }}</span>
                          <span :class="`badge ${statusBadgeClasses[attraction.status]}`" style="font-size: 0.65em;">
                            {{ statusLabels[attraction.status] }}
                          </span>
                        </li>
                      </ul>
                      <p v-else class="text-muted mb-0">No specific attractions listed yet.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="card-body" v-else>
              <p class="text-muted mb-0">No specific cities or attractions listed yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats Footer -->
    <div class="alert alert-info mt-4">
      <h6 class="alert-heading">📊 Travel Statistics</h6>
      <div class="row text-center">
        <div class="col-md-3">
          <strong>{{ destinationsData.destinations.length }}</strong><br>
          <small>Total Countries</small>
        </div>
        <div class="col-md-3">
          <strong>{{ destinationsData.destinations.reduce((sum, d) => sum + (d.cities?.length || 0), 0) }}</strong><br>
          <small>Total Cities</small>
        </div>
        <div class="col-md-3">
          <strong>{{ destinationsData.destinations.reduce((sum, d) => sum + (d.cities?.reduce((citySum, c) => citySum + (c.attractions?.length || 0), 0) || 0), 0) }}</strong><br>
          <small>Total Attractions</small>
        </div>
        <div class="col-md-3">
          <strong>{{ Math.round((destinationsByStatus.visited.length / destinationsData.destinations.length) * 100) }}%</strong><br>
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

/* Destinations list styles */
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.accordion-button:not(.collapsed) {
  background-color: rgba(var(--bs-primary-rgb), 0.1);
}

.badge {
  font-size: 0.75em;
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

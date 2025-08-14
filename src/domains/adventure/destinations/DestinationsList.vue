<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'

  defineOptions({
    name: 'DestinationsList',
  })

  defineProps({
    destinationsByStatus: {
      type: Object,
      required: true,
    },
    statusLabels: {
      type: Object,
      required: true,
    },
    statusBadgeClasses: {
      type: Object,
      required: true,
    },
    getPriorityStars: {
      type: Function,
      required: true,
    },
  })
</script>

<template>
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
</template>
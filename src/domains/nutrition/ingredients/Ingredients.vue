<script setup>
  import { ref, computed, watch } from 'vue'
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'
  import ingredients from './ingredients.json'

  defineOptions({
    name: 'IngredientsTemplate',
  })

  const normalizeRomanianText = (text) => {
    if (!text) return ''
    return String(text).toLowerCase().replace(/ă/g, 'a').replace(/â/g, 'a').replace(/î/g, 'i').replace(/ș/g, 's').replace(/ț/g, 't')
  }

  const searchIndex = ingredients.map((ingredient) => ({
    ...ingredient,
    search: normalizeRomanianText(Object.values(ingredient).join(' ')),
  }))

  // Table filtering and sorting
  const searchFilter = ref('')
  const preferatFilter = ref('') // '' = all, 'true' = preferred only, 'false' = non-preferred only
  const sortColumn = ref('')
  const sortDirection = ref('asc')

  // Pagination
  const currentPage = ref(1)
  const itemsPerPage = ref(10)

  const filteredIngredients = computed(() => {
    let filtered = [...searchIndex]

    // Apply search filter
    if (searchFilter.value) {
      const normalizedSearch = normalizeRomanianText(searchFilter.value)
      filtered = filtered.filter((ingredient) => ingredient.search.includes(normalizedSearch))
    }

    // Apply preferred filter
    if (preferatFilter.value !== '') {
      const showPreferred = preferatFilter.value === 'true'
      filtered = filtered.filter((ingredient) => Boolean(ingredient.preferred) === showPreferred)
    }

    // Apply sorting
    if (sortColumn.value) {
      filtered.sort((firstIngredient, secondIngredient) => {
        let firstValue = firstIngredient[sortColumn.value]
        let secondValue = secondIngredient[sortColumn.value]

        // Handle boolean sorting for preferred field
        if (sortColumn.value === 'preferred') {
          firstValue = Boolean(firstValue)
          secondValue = Boolean(secondValue)
          const result = firstValue === secondValue ? 0 : firstValue ? 1 : -1
          return sortDirection.value === 'asc' ? result : -result
        }

        // Handle numeric sorting for nutritional value fields
        if (['protein', 'soluble_fiber', 'insoluble_fiber', 'unsaturated_fats'].includes(sortColumn.value)) {
          firstValue = Number(firstValue) || 0
          secondValue = Number(secondValue) || 0
          const result = firstValue - secondValue
          return sortDirection.value === 'asc' ? result : -result
        }

        // Handle string sorting for other fields
        firstValue = String(firstValue || '')
        secondValue = String(secondValue || '')
        const result = firstValue.localeCompare(secondValue)
        return sortDirection.value === 'asc' ? result : -result
      })
    }

    return filtered
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredIngredients.value.length / itemsPerPage.value)
  })

  const paginatedIngredients = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredIngredients.value.slice(start, end)
  })

  const visiblePages = computed(() => {
    const pages = []
    const maxVisible = 5
    const total = totalPages.value
    const current = currentPage.value

    if (total <= maxVisible) {
      for (let pageNumber = 1; pageNumber <= total; pageNumber++) {
        pages.push(pageNumber)
      }
    } else {
      let start = Math.max(1, current - Math.floor(maxVisible / 2))
      const end = Math.min(total, start + maxVisible - 1)

      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }

      for (let page = start; page <= end; page++) {
        pages.push(page)
      }
    }

    return pages
  })

  // Reset pagination when filters change
  watch([searchFilter, preferatFilter], () => {
    currentPage.value = 1
  })

  const sortBy = (column) => {
    if (sortColumn.value === column) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortColumn.value = column
      sortDirection.value = ['protein', 'soluble_fiber', 'insoluble_fiber', 'unsaturated_fats'].includes(column) ? 'desc' : 'asc'
    }
  }

  const getSortIcon = (column) => {
    if (sortColumn.value !== column) return 'bi-arrow-down-up'
    return sortDirection.value === 'asc' ? 'bi-arrow-up' : 'bi-arrow-down'
  }

  const togglePreferatFilter = () => {
    if (preferatFilter.value === '') {
      preferatFilter.value = 'true' // Show only preferred
    } else if (preferatFilter.value === 'true') {
      preferatFilter.value = 'false' // Show only non-preferred
    } else {
      preferatFilter.value = '' // Show all
    }
  }

  const getPreferatFilterIcon = () => {
    if (preferatFilter.value === 'true') return 'bi-star-fill text-warning'
    if (preferatFilter.value === 'false') return 'bi-star text-muted'
    return 'bi-star-half'
  }

  const getPreferatFilterTitle = () => {
    if (preferatFilter.value === 'true') return 'Doar preferate (click pentru nepreferate)'
    if (preferatFilter.value === 'false') return 'Doar nepreferate (click pentru toate)'
    return 'Toate (click pentru preferate)'
  }

  const calculateProteinScore = (value) => {
    if (!value && value !== 0) return '—'
    const numValue = Number(value)
    if (isNaN(numValue)) return '—'

    if (numValue >= 25.0) return 'Superior'
    if (numValue >= 12.5) return 'Ridicat'
    if (numValue >= 5.0) return 'Mediu'
    return 'Limitat'
  }

  const calculateSolubleFiberScore = (value) => {
    if (!value && value !== 0) return '—'
    const numValue = Number(value)
    if (isNaN(numValue)) return '—'

    if (numValue >= 5.0) return 'Superior'
    if (numValue >= 2.5) return 'Ridicat'
    if (numValue >= 1.0) return 'Mediu'
    return 'Limitat'
  }

  const calculateInsolubleFiberScore = (value) => {
    if (!value && value !== 0) return '—'
    const numValue = Number(value)
    if (isNaN(numValue)) return '—'

    if (numValue >= 10.0) return 'Superior'
    if (numValue >= 5.0) return 'Ridicat'
    if (numValue >= 2.0) return 'Mediu'
    return 'Limitat'
  }

  const calculateUnsaturatedFatsScore = (value) => {
    if (!value && value !== 0) return '—'
    const numValue = Number(value)
    if (isNaN(numValue)) return '—'

    if (numValue >= 15.0) return 'Superior'
    if (numValue >= 7.5) return 'Ridicat'
    if (numValue >= 3.0) return 'Mediu'
    return 'Limitat'
  }

  const getNutritionalValueClass = (value) => {
    if (!value || value === '—') return ''
    const valueStr = String(value).toLowerCase()
    if (valueStr.includes('superior')) return 'text-success-emphasis'
    if (valueStr.includes('ridicat')) return 'text-info-emphasis'
    if (valueStr.includes('mediu')) return 'text-warning-emphasis'
    if (valueStr.includes('limitat')) return 'text-secondary'
    return ''
  }
</script>

<template>
  <ArticleTemplate title="Ingredients Actions" meta="July 31, 2025 by G. D. Ungureanu">
    <ActionsTemplate list-id="7c2e4a8b-9f1d-4e3a-b5c6-8d9f2a1e4c7b" />
  </ArticleTemplate>

  <ArticleTemplate title="Ingredients" meta="July 31, 2025 by G. D. Ungureanu">
    <!-- Search Filter -->
    <div class="mb-4">
      <div class="input-group mb-3">
        <span class="input-group-text">
          <i class="bi bi-search"></i>
        </span>
        <input id="ingredients-search" name="ingredients-search" type="text" class="form-control" placeholder="Search ingredients..." v-model="searchFilter" autocomplete="off" style="border: 1px solid #dee2e6" />
      </div>
      <small class="text-muted"> Found {{ filteredIngredients.length }} of {{ ingredients.length }} ingredients </small>
    </div>

    <!-- Ingredients Table -->
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead class="table-dark">
          <tr>
            <th scope="col" class="text-center" style="width: 60px">
              <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="togglePreferatFilter" :title="getPreferatFilterTitle()">
                <i class="bi" :class="getPreferatFilterIcon()"></i>
              </button>
            </th>
            <th scope="col">
              <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('ingredient')">Ingredient <i class="bi" :class="getSortIcon('ingredient')"></i></button>
            </th>
            <th scope="col" class="d-none d-sm-table-cell fw-bold">Porție</th>
            <th scope="col" class="d-none d-md-table-cell fw-bold">Formă</th>
            <th scope="col" class="d-none d-sm-table-cell">
              <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('type')">Tip <i class="bi" :class="getSortIcon('type')"></i></button>
            </th>
            <th scope="col">
              <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('protein')">Proteină <i class="bi" :class="getSortIcon('protein')"></i></button>
            </th>
            <th scope="col">
              <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('unsaturated_fats')">Grăsimi Nesaturate <i class="bi" :class="getSortIcon('unsaturated_fats')"></i></button>
            </th>
            <th scope="col">
              <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('soluble_fiber')">Fibră Solubilă <i class="bi" :class="getSortIcon('soluble_fiber')"></i></button>
            </th>
            <th scope="col">
              <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('insoluble_fiber')">Fibră insolubilă <i class="bi" :class="getSortIcon('insoluble_fiber')"></i></button>
            </th>
            <th scope="col">
              <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('vitamins_minerals')">Vitamine & Minerale <i class="bi" :class="getSortIcon('vitamins_minerals')"></i></button>
            </th>
            <th scope="col" class="d-none d-md-table-cell fw-bold">Notițe</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(ingredient, index) in paginatedIngredients" :key="`${sortColumn}-${sortDirection}-${index}-${ingredient.ingredient}`">
            <td class="text-center">
              <i v-if="ingredient.preferred" class="bi bi-star-fill text-warning" title="Preferat"></i>
              <i v-else class="bi bi-star text-muted" title="Nu este preferat"></i>
            </td>
            <th scope="row">{{ ingredient.ingredient }}</th>
            <td class="d-none d-sm-table-cell">{{ ingredient.portion }}g</td>
            <td class="d-none d-md-table-cell">{{ ingredient.form }}</td>
            <td class="d-none d-sm-table-cell">{{ ingredient.type }}</td>
            <td :class="getNutritionalValueClass(calculateProteinScore(ingredient.protein))">{{ calculateProteinScore(ingredient.protein) }} ({{ ingredient.protein }}g)</td>
            <td :class="getNutritionalValueClass(calculateUnsaturatedFatsScore(ingredient.unsaturated_fats))">{{ calculateUnsaturatedFatsScore(ingredient.unsaturated_fats) }} ({{ ingredient.unsaturated_fats }}g)</td>
            <td :class="getNutritionalValueClass(calculateSolubleFiberScore(ingredient.soluble_fiber))">{{ calculateSolubleFiberScore(ingredient.soluble_fiber) }} ({{ ingredient.soluble_fiber }}g)</td>
            <td :class="getNutritionalValueClass(calculateInsolubleFiberScore(ingredient.insoluble_fiber))">{{ calculateInsolubleFiberScore(ingredient.insoluble_fiber) }} ({{ ingredient.insoluble_fiber }}g)</td>
            <td :class="getNutritionalValueClass(ingredient.vitamins_minerals)">
              {{ ingredient.vitamins_minerals }}
            </td>
            <td class="d-none d-md-table-cell">{{ ingredient.notes || '—' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-4 d-flex justify-content-between align-items-center">
      <div class="text-muted">Showing {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, filteredIngredients.length) }} of {{ filteredIngredients.length }} ingredients</div>
      <nav aria-label="Ingredients pagination" v-if="totalPages > 1">
        <ul class="pagination mb-0">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="currentPage = 1" :disabled="currentPage === 1" aria-label="First">
              <span aria-hidden="true">&laquo;&laquo;</span>
            </button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="currentPage--" :disabled="currentPage === 1" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>

          <li v-for="page in visiblePages" :key="page" class="page-item" :class="{ active: currentPage === page }">
            <button class="page-link" @click="currentPage = page">{{ page }}</button>
          </li>

          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="currentPage = totalPages" :disabled="currentPage === totalPages" aria-label="Last">
              <span aria-hidden="true">&raquo;&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Legend -->
    <div class="mt-4">
      <h4>Legendă:</h4>
      <div class="table-responsive">
        <table class="table table-sm table-bordered">
          <thead class="table-dark">
            <tr>
              <th>Categorie</th>
              <th>Țintă per masă</th>
              <th class="text-success-emphasis">Superior</th>
              <th class="text-info-emphasis">Ridicat</th>
              <th class="text-warning-emphasis">Mediu</th>
              <th class="text-secondary">Limitat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Proteină</strong></td>
              <td>25 g</td>
              <td class="text-success-emphasis">≥25.0 g</td>
              <td class="text-info-emphasis">12.5-24.9 g</td>
              <td class="text-warning-emphasis">5.0-12.4 g</td>
              <td class="text-secondary">&lt;5.0 g</td>
            </tr>
            <tr>
              <td><strong>Grăsimi Nesaturate</strong></td>
              <td>15 g</td>
              <td class="text-success-emphasis">≥15.0 g</td>
              <td class="text-info-emphasis">7.5-14.9 g</td>
              <td class="text-warning-emphasis">3.0-7.4 g</td>
              <td class="text-secondary">&lt;3.0 g</td>
            </tr>
            <tr>
              <td><strong>Fibră Solubilă</strong></td>
              <td>5 g</td>
              <td class="text-success-emphasis">≥5.0 g</td>
              <td class="text-info-emphasis">2.5-4.9 g</td>
              <td class="text-warning-emphasis">1.0-2.4 g</td>
              <td class="text-secondary">&lt;1.0 g</td>
            </tr>
            <tr>
              <td><strong>Fibră Insolubilă</strong></td>
              <td>10 g</td>
              <td class="text-success-emphasis">≥10.0 g</td>
              <td class="text-info-emphasis">5.0-9.9 g</td>
              <td class="text-warning-emphasis">2.0-4.9 g</td>
              <td class="text-secondary">&lt;2.0 g</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </ArticleTemplate>
</template>

<style scoped>
  /* Minimal custom styles - leveraging Bootstrap defaults */
  .btn-link:focus {
    box-shadow: none;
  }
</style>
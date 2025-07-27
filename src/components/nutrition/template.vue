<script setup>
import { ref, computed } from 'vue';
import ArticleTemplate from '../../templates/article.vue';
import ActionsTemplate from '../../templates/actions.vue';
import SuggestionsTemplate from '../../templates/suggestions.vue';
import suggestions from './suggestions.json';
import ingredients from './ingredients.json';

defineOptions({
    name: 'NutritionTemplate'
});

// Table filtering and sorting
const searchFilter = ref('');
const sortColumn = ref('');
const sortDirection = ref('asc');

const filteredIngredients = computed(() => {
    let filtered = ingredients;
    
    // Apply search filter
    if (searchFilter.value) {
        const search = searchFilter.value.toLowerCase();
        filtered = filtered.filter(item => 
            Object.values(item).some(value => 
                value.toLowerCase().includes(search)
            )
        );
    }
    
    // Apply sorting
    if (sortColumn.value) {
        filtered = [...filtered].sort((a, b) => {
            const aVal = a[sortColumn.value] || '';
            const bVal = b[sortColumn.value] || '';
            
            const result = aVal.localeCompare(bVal);
            return sortDirection.value === 'asc' ? result : -result;
        });
    }
    
    return filtered;
});

const sortBy = (column) => {
    if (sortColumn.value === column) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn.value = column;
        sortDirection.value = 'asc';
    }
};

const getSortIcon = (column) => {
    if (sortColumn.value !== column) return 'bi-arrow-down-up';
    return sortDirection.value === 'asc' ? 'bi-arrow-up' : 'bi-arrow-down';
};
</script>

<template>

    <ArticleTemplate title="Actions" meta="July 27, 2025 by G. D. Ungureanu">
        <ActionsTemplate list-id="7c2e4a8b-9f1d-4e3a-b5c6-8d9f2a1e4c7b" />
    </ArticleTemplate>

    <ArticleTemplate title="Notes" meta="July 27, 2025 by G. D. Ungureanu">
        <SuggestionsTemplate :suggestions="suggestions" />
    </ArticleTemplate>

    <ArticleTemplate title="Nutrition Guidelines" meta="July 27, 2025 by G. D. Ungureanu">
        
        <p class="mb-0"><strong>What does healthy nutrition mean to you?</strong></p>
        <p>Healthy nutrition means fueling my body with nutrient-dense foods that provide energy, support recovery, and promote long-term health while still being enjoyable and sustainable.</p>

        <h4>Nutrition Principles:</h4>
        <ul>
            <li><strong><u>Eat whole, unprocessed foods</u></strong></li>
            <li><u>Stay hydrated with plenty of water</u></li>
            <li><u>Include plenty of vegetables and fruits</u></li>
            <li><u>Choose lean proteins</u></li>
            <li><u>Incorporate healthy fats</u></li>
            <li><u>Practice portion control</u></li>
            <li><s>Avoid excessive sugar</s></li>
            <li><s>Limit processed foods</s></li>
            <li><s>Reduce sodium intake</s></li>
            <li><s>Minimize alcohol consumption</s></li>
        </ul>

        <h4>Meal Planning:</h4>
        <ul>
            <li><strong>Breakfast:</strong> High protein, complex carbs, healthy fats</li>
            <li><strong>Lunch:</strong> Balanced macro nutrients, plenty of vegetables</li>
            <li><strong>Dinner:</strong> Lighter portions, focus on vegetables and lean protein</li>
            <li><strong>Snacks:</strong> Nutrient-dense options like nuts, fruits, or yogurt</li>
        </ul>

    </ArticleTemplate>

    <ArticleTemplate title="Ingredients Database" meta="July 27, 2025 by G. D. Ungureanu">
        
        <!-- Search Filter -->
        <div class="mb-3">
            <div class="input-group mb-3">
                <span class="input-group-text">
                    <i class="bi bi-search"></i>
                </span>
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Search ingredients..." 
                    v-model="searchFilter"
                >
            </div>
            <small class="text-muted">
                Showing {{ filteredIngredients.length }} of {{ ingredients.length }} ingredients
            </small>
        </div>

        <!-- Ingredients Table -->
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th scope="col">
                            <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('ingredient')">
                                Ingredient (ro) <i class="bi" :class="getSortIcon('ingredient')"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('proteine_hq')">
                                Proteine HQ <i class="bi" :class="getSortIcon('proteine_hq')"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('fibra_solubila')">
                                Fibră solubilă <i class="bi" :class="getSortIcon('fibra_solubila')"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('fibra_insolubila')">
                                Fibră insolubilă <i class="bi" :class="getSortIcon('fibra_insolubila')"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('grasimi_sanatoase')">
                                Grăsimi sănătoase <i class="bi" :class="getSortIcon('grasimi_sanatoase')"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('vitamine_minerale')">
                                Vitamine-Minerale <i class="bi" :class="getSortIcon('vitamine_minerale')"></i>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="item in filteredIngredients" :key="item.ingredient">
                        <th scope="row">{{ item.ingredient }}</th>
                        <td>{{ item.proteine_hq || '—' }}</td>
                        <td>{{ item.fibra_solubila }}</td>
                        <td>{{ item.fibra_insolubila }}</td>
                        <td>{{ item.grasimi_sanatoase }}</td>
                        <td>{{ item.vitamine_minerale }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Legend -->
        <div class="mt-3">
            <h6>Legend:</h6>
            <div class="row">
                <div class="col-md-6">
                    <ul class="list-unstyled small">
                        <li><strong>LW:</strong> Low</li>
                        <li><strong>GD:</strong> Good</li>
                        <li><strong>HG:</strong> High</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <ul class="list-unstyled small">
                        <li><strong>lț:</strong> linguriță (teaspoon)</li>
                        <li><strong>Lg:</strong> lingură (tablespoon)</li>
                        <li><strong>±:</strong> approximate value</li>
                    </ul>
                </div>
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
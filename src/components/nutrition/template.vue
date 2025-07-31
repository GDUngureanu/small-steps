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
const preferatFilter = ref(''); // '' = all, 'true' = preferred only, 'false' = non-preferred only
const sortColumn = ref('');
const sortDirection = ref('asc');

const filteredIngredients = computed(() => {
    let filtered = [...ingredients];
    
    // Apply search filter
    if (searchFilter.value) {
        const search = searchFilter.value.toLowerCase();
        filtered = filtered.filter(item => 
            Object.values(item).some(value => 
                String(value).toLowerCase().includes(search)
            )
        );
    }
    
    // Apply preferat filter
    if (preferatFilter.value !== '') {
        const showPreferred = preferatFilter.value === 'true';
        filtered = filtered.filter(item => 
            Boolean(item.preferat) === showPreferred
        );
    }
    
    // Apply sorting
    if (sortColumn.value) {
        filtered.sort((a, b) => {
            let aVal = a[sortColumn.value];
            let bVal = b[sortColumn.value];
            
            // Handle boolean sorting for preferat field
            if (sortColumn.value === 'preferat') {
                aVal = Boolean(aVal);
                bVal = Boolean(bVal);
                const result = aVal === bVal ? 0 : (aVal ? 1 : -1);
                return sortDirection.value === 'asc' ? result : -result;
            }
            
            // Handle string sorting for other fields
            aVal = String(aVal || '');
            bVal = String(bVal || '');
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

const togglePreferatFilter = () => {
    if (preferatFilter.value === '') {
        preferatFilter.value = 'true'; // Show only preferred
    } else if (preferatFilter.value === 'true') {
        preferatFilter.value = 'false'; // Show only non-preferred  
    } else {
        preferatFilter.value = ''; // Show all
    }
};

const getPreferatFilterIcon = () => {
    if (preferatFilter.value === 'true') return 'bi-star-fill text-warning';
    if (preferatFilter.value === 'false') return 'bi-star text-muted';
    return 'bi-star-half';
};

const getPreferatFilterTitle = () => {
    if (preferatFilter.value === 'true') return 'Doar preferate (click pentru nepreferate)';
    if (preferatFilter.value === 'false') return 'Doar nepreferate (click pentru toate)';
    return 'Toate (click pentru preferate)';
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
                        <th scope="col" class="text-center" style="width: 60px;">
                            <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="togglePreferatFilter" :title="getPreferatFilterTitle()">
                                <i class="bi" :class="getPreferatFilterIcon()"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('ingredient')">
                                Ingredient (ro) <i class="bi" :class="getSortIcon('ingredient')"></i>
                            </button>
                        </th>
                        <th scope="col" class="d-none d-sm-table-cell fw-bold">
                            Porție
                        </th>
                        <th scope="col" class="d-none d-md-table-cell fw-bold">
                            Format
                        </th>
                        <th scope="col" class="d-none d-sm-table-cell">
                            <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('tip')">
                                Tip <i class="bi" :class="getSortIcon('tip')"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('proteina')">
                                Proteină <i class="bi" :class="getSortIcon('proteina')"></i>
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
                            <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('grasimi_nesaturate')">
                                Grăsimi nesaturate <i class="bi" :class="getSortIcon('grasimi_nesaturate')"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('vitamine_minerale')">
                                Vitamine-Minerale <i class="bi" :class="getSortIcon('vitamine_minerale')"></i>
                            </button>
                        </th>
                        <th scope="col" class="d-none d-md-table-cell fw-bold">
                            Notițe
                        </th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="(item, index) in filteredIngredients" :key="`${sortColumn}-${sortDirection}-${index}-${item.ingredient}`">
                        <td class="text-center">
                            <i v-if="item.preferat" class="bi bi-star-fill text-warning" title="Preferat"></i>
                            <i v-else class="bi bi-star text-muted" title="Nu este preferat"></i>
                        </td>
                        <th scope="row">{{ item.ingredient }}</th>
                        <td class="d-none d-sm-table-cell">{{ item.portie }}</td>
                        <td class="d-none d-md-table-cell">{{ item.format }}</td>
                        <td class="d-none d-sm-table-cell">{{ item.tip }}</td>
                        <td>{{ item.proteina }}</td>
                        <td>{{ item.fibra_solubila }}</td>
                        <td>{{ item.fibra_insolubila }}</td>
                        <td>{{ item.grasimi_nesaturate }}</td>
                        <td>{{ item.vitamine_minerale }}</td>
                        <td class="d-none d-md-table-cell">{{ item.notite || '—' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Legend -->
        <div class="mt-3">
            <h6>Legendă:</h6>
            <div class="row">
                <div class="col-md-6">
                    <ul class="list-unstyled small">
                        <li><strong>Limitat:</strong> Valori mici</li>
                        <li><strong>Mediu:</strong> Valori moderate</li>
                        <li><strong>Ridicat:</strong> Valori mari</li>
                        <li><strong>Superior:</strong> Valori foarte mari</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <ul class="list-unstyled small">
                        <li><strong>g:</strong> grame</li>
                        <li><strong>—:</strong> lipsă informații</li>
                        <li><strong>Procesat:</strong> Aliment procesat industrial</li>
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
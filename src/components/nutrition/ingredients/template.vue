<script setup>
import { ref, computed } from 'vue';
import ArticleTemplate from '../../../templates/article.vue';
import ActionsTemplate from '../../../templates/actions.vue';
import ingredients from './ingredients.json';

defineOptions({
    name: 'IngredientsTemplate'
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

const getNutritionalValueClass = (value) => {
    if (!value || value === '—') return '';
    const valueStr = String(value).toLowerCase();
    if (valueStr.includes('superior')) return 'text-success-emphasis';
    if (valueStr.includes('ridicat')) return 'text-info-emphasis';
    if (valueStr.includes('mediu')) return 'text-warning-emphasis';
    if (valueStr.includes('limitat')) return 'text-secondary';
    return '';
};
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
                <input type="text" class="form-control" placeholder="Search ingredients..." v-model="searchFilter" style="border: 1px solid #dee2e6;">
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
                                Ingredient <i class="bi" :class="getSortIcon('ingredient')"></i>
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
                                Fibră Solubilă <i class="bi" :class="getSortIcon('fibra_solubila')"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('fibra_insolubila')">
                                Fibră insolubilă <i class="bi" :class="getSortIcon('fibra_insolubila')"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="btn btn-link text-white text-decoration-none p-0 fw-bold" @click="sortBy('grasimi_nesaturate')">
                                Grăsimi Nesaturate <i class="bi" :class="getSortIcon('grasimi_nesaturate')"></i>
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
                        <td :class="getNutritionalValueClass(item.proteina)">{{ item.proteina }}</td>
                        <td :class="getNutritionalValueClass(item.fibra_solubila)">{{ item.fibra_solubila }}</td>
                        <td :class="getNutritionalValueClass(item.fibra_insolubila)">{{ item.fibra_insolubila }}</td>
                        <td :class="getNutritionalValueClass(item.grasimi_nesaturate)">{{ item.grasimi_nesaturate }}</td>
                        <td :class="getNutritionalValueClass(item.vitamine_minerale)">{{ item.vitamine_minerale }}</td>
                        <td class="d-none d-md-table-cell">{{ item.notite || '—' }}</td>
                    </tr>
                </tbody>
            </table>
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
                        <tr>
                            <td><strong>Grăsimi Nesaturate</strong></td>
                            <td>15 g</td>
                            <td class="text-success-emphasis">≥15.0 g</td>
                            <td class="text-info-emphasis">7.5-14.9 g</td>
                            <td class="text-warning-emphasis">3.0-7.4 g</td>
                            <td class="text-secondary">&lt;3.0 g</td>
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
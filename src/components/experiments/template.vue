<script setup>
import articleTemp from '../../templates/article.vue';
import suggestionsTemp from '../../templates/suggestions.vue';
</script>

<script>
import suggestions from './suggestions.json';

import experiment1 from './assets/Visinata_Experient_1_2025-06-28.jpeg'
import experiment2 from './assets/Visinata_Experient_2_2025-06-28.jpeg'


export default {
    name: 'ExperimentTemplate',
    data() {
        return {
            suggestions: suggestions
        };
    }
};
</script>

<template>

    <articleTemp title="Working on Experiments" meta="June 28, 2025 by G. D. Ungureanu">
        <suggestionsTemp :suggestions="suggestions" />
    </articleTemp>

    <articleTemp title="Vișinată" meta="June 28, 2025 by G. D. Ungureanu">

        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-2">
                    <img :src="experiment1" class="img-fluid rounded-start">
                </div>
                <div class="col-md-10">
                    <div class="card-body">
                        <h5 class="card-title">Experiment 1 - Vișinată - June 28, 2025</h5>
                        <ul>
                            <li>440g sour cherries (pitted and whole with stems)</li>
                            <li>110g sugar (a mix of unrefined brown sugar and coconut sugar)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-10">
                    <div class="card-body">
                        <h5 class="card-title">Experiment 2 - Vișinată - June 28, 2025</h5>
                        <ul>
                            <li>440g sour cherries (pitted and whole with stems)</li>
                            <li>250g 96° alcohol</li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-2">
                    <img :src="experiment2" class="img-fluid rounded-start">
                </div>
            </div>
        </div>
    </articleTemp>

</template>
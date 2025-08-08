<script setup>
  import ArticleTemplate from '../../templates/Article.vue'
  import SuggestionsTemplate from '../../templates/Suggestions.vue'
  import ActionsTemplate from '../../templates/Actions.vue'
  import suggestions from './suggestions.json'
  import experiment1 from './assets/Visinata_Experient_1_2025-06-28.jpeg'
  import experiment2 from './assets/Visinata_Experient_2_2025-06-28.jpeg'

  defineOptions({
    name: 'ExperimentTemplate',
  })
</script>

<template>
  <ArticleTemplate title="Actions Experiments" meta="July 24, 2025 by G. D. Ungureanu">
    <ActionsTemplate list-id="4fe4c03f-ada9-4a08-b222-04842e2a8e12" />
  </ArticleTemplate>

  <ArticleTemplate title="Working on Experiments" meta="June 28, 2025 by G. D. Ungureanu">
    <SuggestionsTemplate :suggestions="suggestions" />
  </ArticleTemplate>

  <ArticleTemplate title="Vișinată" meta="June 28, 2025 by G. D. Ungureanu">
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-2">
          <img :src="experiment1" class="img-fluid rounded-start" />
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
          <img :src="experiment2" class="img-fluid rounded-start" />
        </div>
      </div>
    </div>
  </ArticleTemplate>
</template>

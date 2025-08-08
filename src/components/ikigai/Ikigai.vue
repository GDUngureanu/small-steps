<script setup>
  import ArticleTemplate from '../../templates/Article.vue'
  import ActionsTemplate from '../../templates/Actions.vue'
  import SuggestionsTemplate from '../../templates/Suggestions.vue'
  import suggestions from './suggestions.json'

  defineOptions({
    name: 'IkigaiTemplate',
  })
</script>

<template>
  <ArticleTemplate title="Actions" meta="July 24, 2025 by G. D. Ungureanu">
    <ActionsTemplate list-id="15558a7c-1af5-4c35-9207-488c8742b99b" />
  </ArticleTemplate>

  <ArticleTemplate title="Notes" meta="Jav 7, 2025 by G. D. Ungureanu">
    <SuggestionsTemplate :suggestions="suggestions" />
  </ArticleTemplate>

  <ArticleTemplate title="Career / Work" meta="Jun 7, 2025 by G. D. Ungureanu">
    <p class="mb-0">
      <strong>Would you like to spend the rest of your life solving other peoples problems/puzzles while getting payed for it?</strong>
    </p>
    <p>For the rest of my life, no; But for the next couple of years, yes. I love solving puzzles, and if I can be paid handsomely for it, that's a bonus.</p>

    <h4>Career Paths:</h4>
    <ul>
      <li>
        <strong><u>Programmer</u></strong>
      </li>
      <li><u>Developer Lead</u></li>
      <li><u>Architect</u></li>
      <li><s>UI/UX Developer</s></li>
      <li><s>Business Analyst</s></li>
      <li><s>Professor</s></li>
      <li><s>Barista</s></li>
      <li><s>Cook</s></li>
      <li><s>Masseur</s></li>
      <li><s>Reiki Master</s></li>
      <li><s>Booking Host</s></li>
      <li>(?) <s>Land Lord</s></li>
    </ul>
  </ArticleTemplate>
</template>

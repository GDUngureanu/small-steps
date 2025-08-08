<script setup>
  import ArticleTemplate from '@/components/shared/templates/Article.vue'

  defineOptions({
    name: 'RandomTemplate',
  })
</script>

<template>
  <ArticleTemplate title="Daily Routine" meta="May 27, 2025 by G. D. Ungureanu">
    <p>Taking small steps towards building a healthy life!</p>

    <h5>Daily</h5>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <em>"If you want to change the world, start off by making your bed."</em>
      </li>
      <li class="list-group-item">Get rid of distractions.</li>
      <li class="list-group-item">Consider doing digital detox from 9PM to 9AM.</li>
    </ul>

    <br />

    <h5>Morning Routine</h5>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Start your day with a refreshing workout.</li>
      <li class="list-group-item">Consider having a healthy breakfast.</li>
      <li class="list-group-item">Consider using the pomodoro technique for heavy tasks.</li>
    </ul>

    <br />

    <h5>Afternoon Routine</h5>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">TBD.</li>
    </ul>

    <br />

    <h5>Evening Routine</h5>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">TBD.</li>
    </ul>
  </ArticleTemplate>

  <ArticleTemplate title="Useful Links" meta="May 27, 2025 by G. D. Ungureanu">
    <p>Here are some useful links that helped me while working on this site:</p>

    <ul class="list-group list-group-flush">
      <li class="list-group-item"><a href="https://vuejs.org/guide/" class="text-decoration-none">Vue.Js</a> - Vue Documentation.</li>
      <li class="list-group-item"><a href="https://getbootstrap.com/docs/" class="text-decoration-none">Bootstrap</a> - Bootstrap Documentation.</li>
      <li class="list-group-item"><a href="https://themewagon.com/" class="text-decoration-none">Theme Wagon</a> - Bootstrap Templates.</li>
      <li class="list-group-item"><a href="https://html5up.net/" class="text-decoration-none">HTML5 UP!</a> - HTML Templates.</li>
    </ul>
  </ArticleTemplate>
</template>

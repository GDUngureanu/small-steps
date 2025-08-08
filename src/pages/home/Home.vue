<script setup>
  import ArticleTemplate from '@/components/shared/templates/Article.vue'
  import ActionsTemplate from '@/components/shared/templates/actions/Actions.vue'

  defineOptions({
    name: 'HomeTemplate',
  })
</script>

<template>
  <ArticleTemplate title="Coding my passions" meta="May 26, 2025 by G. D. Ungureanu">
    <p>I'm coding because I like to.</p>

    <ActionsTemplate list-id="d9774487-b6e0-4e6e-a1b8-2b4fddf45a5f" />
  </ArticleTemplate>

  <ArticleTemplate title="Play the most Magnificent Game that you can!" meta="Jun 4, 2025 by G. D. Ungureanu">
    <!-- <div class="row mb-4 embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" title="The Gift of Life" src="https://www.youtube.com/embed/5xbADDvciko" allowfullscreen></iframe>
        </div> -->

    <h4>Prioritize With Intention</h4>
    <ul>
      <li>Career / Work</li>
      <li>Self</li>
      <ul>
        <li>Physical Health</li>
        <li>Mental & Emotional Health</li>
        <li>Personal Growth / Creativity</li>
      </ul>
      <li>Relationships</li>
      <ul>
        <li>Intimate Relationship</li>
        <li>Family</li>
        <li>Friends</li>
      </ul>
    </ul>

    <h4>The 1-3-5 Rule</h4>
    <p>The 1-3-5 rule is simple: in order to stay productive at work every day, you just need to commit to accomplishing 1 Major Task, 3 Medium Tasks and 5 Small Tasks.</p>

    <ul>
      <li><strong>1 Major Task</strong> - 2-3 hours</li>
      <li><strong>3 Medium Tasks</strong> - 35-60 min</li>
      <li><strong>5 Small Tasks</strong> - 10-20 min</li>
    </ul>

    <a href="https://www.timedoctor.com/blog/1-3-5-rule/">What is the 1-3-5 Rule?</a> <br />
    <a href="https://www.developgoodhabits.com/1-3-5-rule/">How to Use the 1-3-5 Rule?</a> <br />
    <br />

    <h4>Choose Hobbies That Energize</h4>
    <p>You don't need 5 hobbies. Just pick 1-2 that deeply satisfy you and fit your schedule. Even 30 minutes a day is enough to feel restored and connected.</p>
    <ul>
      <li><strong>Creative</strong>: writing, music, cooking, coding</li>
      <li><strong>Physical</strong>: sports, dance, hiking</li>
      <li><strong>Relaxing</strong>: reading, gardening, drawing</li>
      <li><strong>Social</strong>: games, group classes, clubs</li>
    </ul>
  </ArticleTemplate>
</template>

<script setup>
  import ArticleTemplate from '@/shared/components/ui/templates/Article.vue'
  import ActionsTemplate from '@/shared/components/ui/templates/actions/Actions.vue'

  defineOptions({
    name: 'Home',
  })
</script>

<template>
  <ArticleTemplate title="Coding my passions" meta="May 26, 2025 by G. D. Ungureanu">
    <p>I'm coding because I like to.</p>

    <ActionsTemplate list-id="d9774487-b6e0-4e6e-a1b8-2b4fddf45a5f" />
  </ArticleTemplate>

  <ArticleTemplate title="Play the most Magnificent Game that you can!" meta="Jun 4, 2025 by G. D. Ungureanu">
    <h4>Prioritize With Intention</h4>
    <ul>
      <li>Career / Work</li>
      <li>
        Self
        <ul>
          <li>Physical Health</li>
          <li>Mental & Emotional Health</li>
          <li>Personal Growth / Creativity</li>
        </ul>
      </li>
      <li>
        Relationships
        <ul>
          <li>Intimate Relationship</li>
          <li>Family</li>
          <li>Friends</li>
        </ul>
      </li>
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

  <ArticleTemplate title="Available Domains" meta="Navigate through different aspects of life">
    <ul>
      <li><router-link to="/growth">Growth</router-link> - Personal development through books and poems</li>
      <li><router-link to="/health">Health</router-link> - Health and wellness through nutrition, fitness, and habits</li>
      <li><router-link to="/curiosity">Curiosity</router-link> - Discover new territories through anime, movies, destinations, and experiments</li>
      <li><router-link to="/vocation">Vocation</router-link> - Align your purpose with ikigai and ippo goal tracking</li>
      <li><router-link to="/foundation">Foundation</router-link> - Build stability through financial planning and security measures</li>
      <li><router-link to="/inner-circle">Inner Circle</router-link> - Technology and laptop research</li>
    </ul>

    <p><em>Navigate through different aspects of life with purpose and intention.</em></p>
  </ArticleTemplate>
</template>

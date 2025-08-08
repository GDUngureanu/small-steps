<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div v-if="route.path === '/'" class="px-3 py-3 my-5 text-center">
    <h1 class="display-5 fw-bold text-body-emphasis">Memento Mori</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4 fst-italic">As a Man among Men <br />
        I want to create a world of Growth and Playfulness <br />
        By striving to be the best that I can. <br />
        By being thoughtful. <br />
        By being truthful. <br />
        By being present. <br />
        By being playful. <br />
        By hunting knowledge. </p>
    </div>
  </div>
</template>

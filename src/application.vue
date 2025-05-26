<script setup>
import AppNavigation from './components/navigation/template.vue'
import AppHeader from './components/header/template.vue'
import AppFooter from './components/footer/template.vue'
</script>

<template>
  <AppNavigation />
  <AppHeader />

  <div class="container my-5">
    <RouterView />
  </div>

  <AppFooter />
</template>

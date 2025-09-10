<template>
  <div>
    <Navigation v-if="!isPortfolioPage" />
    <NuxtPage />
    <Footer v-if="!isHomePage" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Vérifier si on est sur la page home
const isHomePage = computed(() => {
  return route.path === '/'
})

// Vérifier si on est sur la page portfolio
const isPortfolioPage = computed(() => {
  return route.path === '/portfolio' || route.path.startsWith('/portfolio/')
})
</script>


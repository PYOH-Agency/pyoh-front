<template>
  <div>
    <Navigation />
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
</script>


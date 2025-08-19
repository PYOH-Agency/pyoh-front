<template>
  <div class="min-h-screen bg-white text-gray-900 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-light mb-4">Projet : {{ $route.params.slug }}</h1>
      <p class="text-gray-600 mb-8">Page dynamique chargée avec succès !</p>
      <NuxtLink to="/portfolio" class="px-6 py-3 bg-gray-900 text-white rounded-none hover:bg-gray-800 transition-all duration-300">
        Retour au portfolio
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

// Route
const route = useRoute()

// Logs de debug
onMounted(() => {
  console.log('🚀 Page slug.vue chargée');
  console.log('📝 Slug reçu:', route.params.slug);
})
</script>

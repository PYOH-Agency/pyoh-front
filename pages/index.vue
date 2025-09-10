<template>
  <div class="min-h-screen bg-black text-white overflow-hidden">
    <!-- Navigation spécifique à la home -->
    <HomeNavigation backgroundColor="black" />
    
    <!-- Debug: Types de projets -->
    <div v-if="uniqueProjectTypes.length > 0" class="fixed top-20 right-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg z-50 text-xs">
      <h3 class="text-white font-bold mb-2">Types de projets récupérés:</h3>
      <ul class="text-white/80">
        <li v-for="type in uniqueProjectTypes" :key="type.id" class="mb-1">
          {{ type.attributes.name }} ({{ type.attributes.label }})
        </li>
      </ul>
    </div>

    <!-- Hero Section avec projets -->
    <ProjectSlider 
      :projects="featuredProjects" 
      :auto-play="false"
      :auto-play-interval="6000"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProjects } from '~/composables/useProjects'

// Configuration de la page
useHead({
  title: 'PYOH - Agence Créative',
  meta: [
    { name: 'description', content: 'PYOH - Agence créative spécialisée dans la conception de sites web, l\'identité visuelle et l\'expérience utilisateur.' }
  ]
})

// Utilisation du composable
const { 
  featuredProjects, 
  fetchFeaturedProjects,
  getUniqueProjectTypes
} = useProjects()

// Récupération des types de projets uniques
const uniqueProjectTypes = getUniqueProjectTypes()

// Lifecycle
onMounted(async () => {
  await fetchFeaturedProjects()
})
</script>

<style scoped>
/* Styles minimaux pour la homepage */
</style>

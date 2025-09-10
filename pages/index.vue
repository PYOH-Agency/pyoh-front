<template>
  <div class="min-h-screen bg-black text-white overflow-hidden">
    <!-- Navigation spécifique à la home -->
    <HomeNavigation backgroundColor="black" />
    
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

<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Header de la page -->
    <header class="py-20 bg-black">
      <div class="container mx-auto px-8 text-center">
        <h1 class="text-6xl md:text-7xl font-light mb-6 tracking-tight">Portfolio</h1>
        <p class="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light mb-4">
          Découvrez notre sélection de projets créatifs et innovants
        </p>
        <!-- Indicateur de projets Strapi -->
        <div v-if="!loading && !error" class="text-sm text-white/40 font-light">
          {{ projects.length }} projet(s) disponible(s)
        </div>
      </div>
    </header>

    <!-- Filtres -->
    <section class="py-16 border-b border-white/5">
      <div class="container mx-auto px-8">
        <div class="flex flex-wrap gap-6 justify-center">
          <button 
            @click="setActiveFilter('all')"
            class="text-lg font-light transition-all duration-300 hover:text-pyoh-yellow"
            :class="activeFilter === 'all' 
              ? 'text-pyoh-yellow' 
              : 'text-white/60'"
          >
            Tous
          </button>
          <button 
            v-for="type in projectTypes" 
            :key="type.id"
            @click="setActiveFilter(type.label)"
            class="text-lg font-light transition-all duration-300 hover:text-pyoh-yellow"
            :class="activeFilter === type.label 
              ? 'text-pyoh-yellow' 
              : 'text-white/60'"
          >
            {{ type.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Grille des projets -->
    <section class="py-20">
      <div class="container mx-auto px-8">
        <!-- État de chargement -->
        <div v-if="loading" class="text-center py-20">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pyoh-yellow"></div>
          <p class="mt-4 text-white/60 font-light">Chargement des projets...</p>
        </div>

        <!-- État d'erreur -->
        <div v-else-if="error" class="text-center py-20">
          <p class="text-red-400 text-lg">{{ error }}</p>
          <button @click="fetchProjects" class="mt-4 px-6 py-3 bg-pyoh-yellow text-black rounded-lg hover:bg-pyoh-yellow/90 font-light">
            Réessayer
          </button>
        </div>

        <!-- Grille des projets -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="group cursor-pointer project-card"
            @click="openProjectModal(project)"
          >
            <!-- Image du projet -->
            <div class="relative overflow-hidden rounded-none mb-8 aspect-[4/3] bg-gray-900">
              <!-- Image depuis le champ coverPicture -->
              <img 
                v-if="project?.coverPicture?.data?.attributes?.url"
                :src="strapiMediaUrl(project.coverPicture.data.attributes.url)"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <!-- Test structure alternative coverPicture -->
              <img 
                v-else-if="project?.coverPicture?.url"
                :src="strapiMediaUrl(project.coverPicture.url)"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <!-- Test structure directe coverPicture -->
              <img 
                v-else-if="project?.coverPicture && typeof project.coverPicture === 'string'"
                :src="strapiMediaUrl(project.coverPicture)"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <!-- Fallback vers le premier élément du champ media -->
              <img 
                v-else-if="project?.media?.[0]?.url"
                :src="strapiMediaUrl(project.media[0].url)"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <!-- Vidéo depuis media -->
              <video
                v-else-if="project?.media?.[0]?.url && isVideo(project.media[0].mime)"
                :src="strapiMediaUrl(project.media[0].url)"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                preload="metadata"
                @loadedmetadata="handleVideoLoad"
                @click="toggleVideoPlayback"
                ref="videoElement"
              >
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
              
              <!-- Placeholder élégant si pas de média -->
              <div v-else class="w-full h-full flex flex-col items-center justify-center text-white/30 group-hover:text-white/50 transition-colors duration-500">
                <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span class="text-sm font-light">{{ project?.title || 'Projet' }}</span>
              </div>
              
              <!-- Overlay au hover -->
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
            </div>

            <!-- Informations du projet -->
            <div class="space-y-4">
              <div class="flex items-center gap-4 text-sm text-white/40 font-light">
                <!-- Types multiples avec couleurs -->
                <div v-if="project?.project_types && Array.isArray(project.project_types)" class="flex items-center gap-2">
                  <span 
                    v-for="type in project.project_types" 
                    :key="type.id"
                    class="px-2 py-1 rounded-full text-xs font-medium"
                    :style="{ 
                      backgroundColor: type.color + '20',
                      color: type.color,
                      border: `1px solid ${type.color}40`
                    }"
                  >
                    {{ type.label }}
                  </span>
                </div>
                
                <!-- Fallback vers l'ancien système -->
                <span v-else>{{ getTypeLabel(project?.type) || 'Projet' }}</span>
                
                <span>•</span>
                <span>{{ project?.year || 'N/A' }}</span>
                <span v-if="project?.client">•</span>
                <span v-if="project?.client">{{ project.client }}</span>
              </div>
              
              <h3 class="text-2xl md:text-3xl font-light text-white group-hover:text-pyoh-yellow transition-colors duration-300">
                {{ project?.title || 'Titre non défini' }}
              </h3>
            </div>
          </div>
        </div>

        <!-- Message si aucun projet -->
        <div 
          v-if="filteredProjects.length === 0 && !loading && !error" 
          class="text-center py-20"
        >
          <div v-if="projects.length === 0" class="space-y-4">
            <p class="text-xl text-white/40 font-light">Aucun projet trouvé dans Strapi</p>
            <p class="text-sm text-white/30 font-light">Vérifiez que votre CMS Strapi contient des projets</p>
            <button @click="fetchProjects" class="px-6 py-3 bg-pyoh-yellow text-black rounded-none hover:bg-pyoh-yellow/90 font-light">
              Actualiser
            </button>
          </div>
          <div v-else class="space-y-4">
            <p class="text-xl text-white/40 font-light">Aucun projet trouvé dans cette catégorie</p>
            <p class="text-sm text-white/30 font-light">{{ projects.length }} projet(s) disponible(s) au total</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal du projet -->
    <div 
      v-if="selectedProject"
      class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-8"
      @click="closeProjectModal"
    >
      <div 
        class="bg-black border border-white/10 rounded-none max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Header du modal -->
        <div class="p-8 border-b border-white/5 flex justify-between items-start">
          <div>
            <h2 class="text-4xl font-light text-white mb-4">
              {{ selectedProject?.title || 'Titre non défini' }}
            </h2>
            <div class="flex items-center gap-4 text-white/50 font-light">
              <!-- Types multiples avec couleurs -->
              <div v-if="selectedProject?.project_types && Array.isArray(selectedProject.project_types)" class="flex items-center gap-2">
                <span 
                  v-for="type in selectedProject.project_types" 
                  :key="type.id"
                  class="px-2 py-1 rounded-full text-xs font-medium"
                  :style="{ 
                    backgroundColor: type.color + '20',
                    color: type.color,
                    border: `1px solid ${type.color}40`
                  }"
                >
                  {{ type.label }}
                </span>
              </div>
              
              <!-- Fallback vers l'ancien système -->
              <span v-else>{{ getTypeLabel(selectedProject?.type) }}</span>
              
              <span>•</span>
              <span>{{ selectedProject?.year || 'N/A' }}</span>
              <span v-if="selectedProject?.client">•</span>
              <span v-if="selectedProject?.client">{{ selectedProject.client }}</span>
            </div>
          </div>
          <button 
            @click="closeProjectModal"
            class="text-white/50 hover:text-white transition-colors duration-300"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Contenu du modal -->
        <div class="p-8">
          <!-- Image principale -->
          <div class="mb-8 rounded-none overflow-hidden">
            <img 
              v-if="selectedProject?.coverPicture?.data?.attributes?.url"
              :src="strapiMediaUrl(selectedProject.coverPicture.data.attributes.url)"
              :alt="selectedProject?.title || 'Projet'"
              class="w-full h-auto"
            />
            <!-- Fallback vers le premier élément media -->
            <img 
              v-else-if="selectedProject?.media?.[0]?.url"
              :src="strapiMediaUrl(selectedProject.media[0].url)"
              :alt="selectedProject?.title || 'Projet'"
              class="w-full h-auto"
            />
            <!-- Placeholder si pas d'image -->
            <div v-else class="w-full h-96 bg-gray-900 flex flex-col items-center justify-center text-white/30">
              <svg class="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span class="text-lg font-light">{{ selectedProject?.title || 'Projet' }}</span>
            </div>
          </div>

          <!-- Technologies -->
          <div v-if="selectedProject?.technologies && selectedProject.technologies.length > 0" class="mb-8">
            <h3 class="text-xl font-light text-white mb-4">Technologies utilisées</h3>
            <div class="flex flex-wrap gap-3">
              <span 
                v-for="tech in selectedProject.technologies" 
                :key="tech"
                class="px-4 py-2 bg-white/5 border border-white/10 rounded-none text-white/70 font-light"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Lien vers le projet -->
          <div v-if="selectedProject?.projectUrl" class="text-center">
            <a 
              :href="selectedProject.projectUrl" 
              target="_blank"
              class="inline-flex items-center px-8 py-4 bg-white text-black font-light rounded-none hover:bg-white/90 transition-all duration-300"
            >
              Voir le projet en ligne
              <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useProjects } from '~/composables/useProjects'
import gsap from 'gsap'

// Configuration de la page
useHead({
  title: 'Portfolio - PYOH',
  meta: [
    { name: 'description', content: 'Découvrez notre portfolio de projets créatifs et innovants - PYOH Agence Créative' }
  ]
})

// Utilisation du composable
const { 
  projects, 
  loading, 
  error, 
  fetchProjects, 
  getUniqueCategories,
  getStrapiMediaUrl: strapiMediaUrl 
} = useProjects()

// État réactif
const activeFilter = ref('all')
const selectedProject = ref(null)
const videoElement = ref(null) // Ref for video element

// Types de projets Strapi (maintenant depuis l'API)
const projectTypes = ref([])

// Récupérer les types de projets depuis Strapi
const fetchProjectTypes = async () => {
  try {
    const config = useRuntimeConfig()
    const response = await $fetch(`${config.public.strapiUrl}/api/project-types`)
    
    if (response.data) {
      projectTypes.value = response.data
    } else {
      throw new Error('Pas de données dans la réponse')
    }
  } catch (err) {
    console.error('Erreur lors de la récupération des types:', err)
    
    // Fallback vers les types statiques
    projectTypes.value = [
      { id: 1, label: 'Identité Visuelle', color: '#fddb00' },
      { id: 2, label: 'Vidéo', color: '#ff6b6b' },
      { id: 3, label: 'Web', color: '#4ecdc4' }
    ]
  }
}

// Utiliser les projets Strapi uniquement
const displayProjects = computed(() => {
  return projects.value
})

// Filtrage des projets avec types multiples
const filteredProjects = computed(() => {
  if (!displayProjects.value || displayProjects.value.length === 0) {
    return []
  }
  
  if (activeFilter.value === 'all') {
    return displayProjects.value
  }
  
  const filtered = displayProjects.value.filter(project => {
    // Nouvelle structure avec types multiples
    if (project?.project_types && Array.isArray(project.project_types)) {
      const hasType = project.project_types.some(type => {
        return type.label === activeFilter.value || type.id === activeFilter.value
      })
      return hasType
    }
    
    // Fallback vers l'ancienne structure
    const hasSimpleType = project?.type === activeFilter.value
    return hasSimpleType
  })
  
  return filtered
})

// Catégories uniques depuis Strapi (types multiples)
const uniqueCategories = computed(() => {
  if (!displayProjects.value || displayProjects.value.length === 0) {
    return []
  }
  
  const allTypes = new Set()
  
  displayProjects.value.forEach(project => {
    if (project?.project_types && Array.isArray(project.project_types)) {
      project.project_types.forEach(type => {
        allTypes.add(type.name)
      })
    } else if (project?.type) {
      allTypes.add(project.type)
    }
  })
  
  return Array.from(allTypes)
})

// Gestion des filtres
const setActiveFilter = (filter) => {
  activeFilter.value = filter

  // Animation des projets filtrés avec GSAP
  nextTick(() => {
    const projectElements = document.querySelectorAll('.project-card')
    gsap.fromTo(projectElements,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.1
      }
    )
  })
}

// Gestion du modal
const openProjectModal = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
  
  // Animation d'entrée du modal
  gsap.fromTo('.modal', 
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
  )
}

const closeProjectModal = () => {
  selectedProject.value = null
  document.body.style.overflow = 'auto'
}

// Helper to get label from type (nouvelle structure)
const getTypeLabel = (typeName) => {
  if (!typeName) return 'Projet'
  
  // Chercher dans les types récupérés depuis Strapi
  const foundType = projectTypes.value.find(type => type.name === typeName)
  if (foundType) {
    return foundType.label
  }
  
  // Fallback vers les labels statiques
  const staticTypes = {
    'visual-identity': 'Identité Visuelle',
    'video': 'Vidéo',
    'web': 'Web'
  }
  
  return staticTypes[typeName] || typeName
}

// Helper to get count of projects by type
const getProjectsCountByType = (typeName) => {
  if (!displayProjects.value || displayProjects.value.length === 0) {
    return 0
  }
  
  return displayProjects.value.filter(project => {
    if (project?.types && Array.isArray(project.types)) {
      return project.types.some(type => type.name === typeName)
    }
    return project?.type === typeName
  }).length
}

// Helper to check if a media is a video
const isVideo = (mimeType) => {
  if (!mimeType) return false
  return mimeType.startsWith('video/')
}

// Handle video loadedmetadata event
const handleVideoLoad = () => {
  // This function is called when the video metadata (like duration) is loaded.
  // We can use this to set the video element's duration for playback control.
  // For now, we'll just log it.
  console.log('Video metadata loaded:', videoElement.value.duration);
}

// Toggle video playback
const toggleVideoPlayback = () => {
  if (videoElement.value) {
    if (videoElement.value.paused) {
      videoElement.value.play();
    } else {
      videoElement.value.pause();
    }
  }
}


// Lifecycle
onMounted(async () => {
  try {
    // Récupérer d'abord les types de projets
    await fetchProjectTypes()
    
    // Récupérer les projets avec populate=* pour inclure coverPicture et types
    const config = useRuntimeConfig()
    const directResponse = await $fetch(`${config.public.strapiUrl}/api/projects?populate[0]=coverPicture&populate[1]=media&populate[2]=project_types`)
    
    if (directResponse.data && directResponse.data.length > 0) {
      projects.value = directResponse.data
    }
  } catch (err) {
    console.error('Erreur lors du chargement des projets:', err)
    // Fallback vers le composable
    await fetchProjects()
  }
})
</script>

<style scoped>
/* Styles pour les cartes de projet */
.project-card {
  transition: all 0.5s ease-in-out;
}

.project-card:hover {
  transform: translateY(-8px);
}

/* Animation d'entrée des projets */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.project-card {
  animation: fadeInUp 0.8s ease-out;
}

/* Animation des images au hover */
.group:hover img,
.group:hover video {
  transform: scale(1.05);
}

/* Scrollbar personnalisée */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #000;
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 0;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Styles pour les filtres actifs */
.text-pyoh-yellow {
  color: var(--pyoh-yellow);
}

/* Responsive */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .project-card {
    margin-bottom: 0;
  }
  
  .project-card:hover {
    transform: none;
  }
}

/* Transitions fluides */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Hover effects subtils */
.project-card:hover .text-white {
  color: var(--pyoh-yellow);
}

/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

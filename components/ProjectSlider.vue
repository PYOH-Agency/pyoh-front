<template>
  <div class="relative h-screen w-full overflow-hidden project-slider">
    <!-- Logo PYOH en haut à gauche -->
    <div class="absolute top-8 left-8 z-30">
      <img 
        src="/images/Logos Pyoh-04.png" 
        alt="PYOH Logo" 
        class="h-20 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
      />
    </div>


    <!-- Projets -->
    <div class="relative h-full w-full">
      <div class="relative h-full w-full overflow-hidden">
        <div 
          v-for="(project, index) in projects" 
          class="absolute inset-0 h-full w-full transition-all duration-1000 ease-in-out"
          :class="{
            'translate-y-0 z-10 opacity-100': currentProjectIndex === index,
            'translate-y-full z-0 opacity-0': currentProjectIndex > index,
            '-translate-y-full z-0 opacity-0': currentProjectIndex < index
          }"
        >
          <!-- Media de fond avec parallax -->
          <div class="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/70">
            <!-- Image -->
            <img 
              v-if="getProjectMedia(project)?.data?.attributes?.url && getProjectMedia(project).data.attributes.mime?.startsWith('image')"
              :src="getStrapiMediaUrl(getProjectMedia(project).data.attributes.url)"
              :alt="getProjectTitle(project)"
              class="w-full h-full object-cover transform scale-110"
              ref="projectImage"
            />
            <!-- Vidéo -->
            <video 
              v-else-if="getProjectMedia(project)?.data?.attributes?.url && getProjectMedia(project).data.attributes.mime?.startsWith('video')"
              :src="getStrapiMediaUrl(getProjectMedia(project).data.attributes.url)"
              class="w-full h-full object-cover transform scale-110"
              autoplay
              muted
              loop
              playsinline
              ref="projectVideo"
            />
            <!-- Fallback si pas d'image -->
            <div v-else class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div class="text-center text-white/60">
                <svg class="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-lg">Aucun media</p>
              </div>
            </div>
          </div>

          <!-- Contenu du projet - Textes repositionnés -->
          <div class="relative z-10 h-full flex items-end">
            <div class="container mx-auto px-8 pb-32">
              <div class="max-w-4xl">
                <!-- Catégorie -->
                <div class="mb-4">
                  <span class="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white/80">
                    {{ getProjectCategory(project) }}
                  </span>
                </div>

                <!-- Titre principal -->
                <div class="mb-4">
                  <h1 class="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-white break-words hyphens-none max-w-full">
                    {{ getProjectTitle(project) }}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <!-- Bouton au centre en bas -->
          <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
            <NuxtLink 
              to="/portfolio" 
              class="inline-flex items-center px-8 py-4 text-white font-semibold rounded-lg hover:text-white/80 transition-all duration-300 transform hover:scale-105 border border-white/30 hover:border-white/50"
            >
              Voir tous les projets
              <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Indicateur de progression discret à droite au milieu -->
          <div class="absolute right-8 top-1/2 -translate-y-1/2 z-20">
            <div class="flex flex-col items-center space-y-4">
              <!-- Numérotation -->
              <div class="text-sm text-white/40 font-medium tracking-widest">
                {{ currentProjectIndex + 1 }} / {{ projects.length }}
              </div>
              
              <!-- Indicateurs de position -->
              <div class="flex flex-col items-center space-y-2">
                <div 
                  v-for="(project, index) in [...projects].reverse()" 
                  :key="projects.length - 1 - index"
                  class="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
                  :class="{
                    'bg-white scale-125': currentProjectIndex === (projects.length - 1 - index),
                    'bg-white/30 scale-100': currentProjectIndex !== (projects.length - 1 - index)
                  }"
                  @click="goToProject(projects.length - 1 - index)"
                  :title="`Projet ${projects.length - index}: ${getProjectTitle(project)}`"
                ></div>
              </div>
            </div>
          </div>




        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

// Props
const props = defineProps({
  projects: {
    type: Array,
    required: true
  },
  autoPlay: {
    type: Boolean,
    default: false
  },
  autoPlayInterval: {
    type: Number,
    default: 5000
  }
})

// État réactif
const currentProjectIndex = ref(0)
const isTransitioning = ref(false)



// Références pour les éléments
const projectImage = ref(null)

// Navigation directe vers un projet
const goToProject = (index) => {
  if (index !== currentProjectIndex.value && !isTransitioning.value) {
    currentProjectIndex.value = index
    animateProjectTransition()
    emitProjectChange()
  }
}

// Aller au projet suivant
const nextProject = () => {
  if (currentProjectIndex.value < props.projects.length - 1 && !isTransitioning.value) {
    currentProjectIndex.value++
    animateProjectTransition()
    emitProjectChange()
  }
}

// Aller au projet précédent
const previousProject = () => {
  if (currentProjectIndex.value > 0 && !isTransitioning.value) {
    currentProjectIndex.value--
    animateProjectTransition()
    emitProjectChange()
  }
}

// Émettre un événement pour informer la navigation du changement de projet
const emitProjectChange = () => {
  const currentProject = props.projects[currentProjectIndex.value]
  if (currentProject) {
    const client = getProjectClient(currentProject)
    const year = getProjectYear(currentProject)
    
    // Émettre un événement personnalisé
    const event = new CustomEvent('project-change', {
      detail: { client, year }
    })
    window.dispatchEvent(event)
  }
}

// Animation de transition entre projets (gérée par CSS)
const animateProjectTransition = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true

  // La transition est maintenant gérée par CSS
  // On attend juste la fin de la transition
  setTimeout(() => {
    isTransitioning.value = false
  }, 1200) // Légèrement plus long pour une transition plus fluide
}

// Gestion du scroll
let scrollTimeout
const handleScroll = (event) => {
  // Empêcher le scroll par défaut
  event.preventDefault()
  
  if (isTransitioning.value) return
  
  const delta = event.deltaY
  const threshold = 50 // Seuil plus élevé pour éviter les déclenchements accidentels
  
  if (Math.abs(delta) > threshold) {
    if (delta > 0) {
      // Scroll down - projet suivant
      nextProject()
    } else {
      // Scroll up - projet précédent
      previousProject()
    }
    
    // Délai pour éviter les transitions trop rapides
    isTransitioning.value = true
    scrollTimeout = setTimeout(() => {
      isTransitioning.value = false
    }, 1200) // Légèrement plus long que la transition CSS
  }
}

// Gestion des touches clavier
const handleKeydown = (event) => {
  if (event.key === 'ArrowLeft') {
    previousProject()
  } else if (event.key === 'ArrowRight') {
    nextProject()
  }
}



// Utilitaires
const getStrapiMediaUrl = (url) => {
  if (url.startsWith('http')) return url
  const config = useRuntimeConfig()
  return `${config.public.strapiUrl}${url}`
}

// Fonctions utilitaires pour gérer les deux structures de données
const getProjectTitle = (project) => {
  // Structure Strapi directe
  if (project.title) return project.title
  // Structure transformée
  if (project.attributes?.title) return project.attributes.title
  return 'Titre manquant'
}

const getProjectSubtitle = (project) => {
  // Structure Strapi directe
  if (project.subtitle) return project.subtitle
  // Structure transformée
  if (project.attributes?.subtitle) return project.attributes.subtitle
  return 'Sous-titre manquant'
}

const getProjectCategory = (project) => {
  // Structure Strapi directe
  if (project.type) return project.type
  // Structure transformée
  if (project.attributes?.category) return project.attributes.category
  return 'Catégorie manquante'
}

const getProjectMedia = (project) => {
  // Structure Strapi directe
  if (project.media && project.media.length > 0) {
    return {
      data: {
        id: project.media[0].id,
        attributes: {
          url: project.media[0].url,
          mime: project.media[0].mime,
          name: project.media[0].name
        }
      }
    }
  }
  // Structure transformée
  if (project.attributes?.media) return project.attributes.media
  return null
}

const getProjectClient = (project) => {
  // Structure Strapi directe
  if (project.client) return project.client
  // Structure transformée
  if (project.attributes?.client) return project.attributes.client
  return null
}

const getProjectYear = (project) => {
  // Structure Strapi directe
  if (project.year) return project.year
  // Structure transformée
  if (project.attributes?.year) return project.attributes.year
  return null
}

// Watchers
watch(() => props.projects, (newProjects) => {
  if (newProjects.length > 0) {
    currentProjectIndex.value = 0
    // Émettre les informations du premier projet
    nextTick(() => {
      emitProjectChange()
    })
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  // Écouter le scroll sur le composant lui-même plutôt que sur window
  const sliderElement = document.querySelector('.project-slider')
  if (sliderElement) {
    sliderElement.addEventListener('wheel', handleScroll, { passive: false })
  }
  
  // Écouter les touches clavier sur window
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  const sliderElement = document.querySelector('.project-slider')
  if (sliderElement) {
    sliderElement.removeEventListener('wheel', handleScroll)
  }
  
  window.removeEventListener('keydown', handleKeydown)
  clearTimeout(scrollTimeout)
})
</script>

<style scoped>
/* Responsive */
@media (max-width: 768px) {
  .text-5xl {
    font-size: 2.5rem;
  }
  
  .text-7xl {
    font-size: 3.5rem;
  }
}
</style>

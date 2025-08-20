<template>
  <div class="min-h-screen bg-white text-gray-900">
    <!-- Header minimaliste style Nicex -->
    <header class="py-32 bg-white">
      <div class="container mx-auto px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-6xl md:text-7xl font-light mb-8 tracking-tight text-gray-900 leading-tight">
            Portfolio
          </h1>
        </div>
      </div>
    </header>

    <!-- Filtres style Nicex -->
    <section class="py-4 border-b border-gray-100">
      <div class="container mx-auto px-8">
        <div class="flex flex-wrap gap-8 justify-center">
          <button 
            @click="setActiveFilter('all')"
            class="text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:text-gray-900"
            :class="activeFilter === 'all' 
              ? 'text-gray-900' 
              : 'text-gray-400'"
          >
            All
          </button>
          
          <button 
            v-for="type in projectTypes" 
            :key="type.id"
            @click="setActiveFilter(type.label)"
            class="text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:text-gray-900"
            :class="activeFilter === type.label 
              ? 'text-gray-900' 
              : 'text-gray-400'"
          >
            {{ type.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Grille masonry des projets -->
    <section class="py-24">
      <div class="container mx-auto px-8">
        <!-- État de chargement -->
        <div v-if="loading" class="text-center py-32">
          <div class="inline-block">
            <div class="w-8 h-8 border-2 border-gray-200 rounded-full"></div>
            <div class="absolute inset-0 w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p class="mt-6 text-gray-500 font-light">Chargement...</p>
        </div>

        <!-- État d'erreur -->
        <div v-else-if="error" class="text-center py-32">
          <div class="max-w-md mx-auto">
            <p class="text-gray-600 text-lg mb-4">{{ error }}</p>
            <button @click="fetchProjects" class="px-6 py-3 bg-gray-900 text-white rounded-none hover:bg-gray-800 font-light transition-all duration-300">
              Réessayer
            </button>
          </div>
        </div>

        <!-- Galerie simple avec 3 projets par ligne -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink 
            v-for="(project, index) in filteredProjects" 
            :key="project.id"
            :to="`/projects/${createSlug(project.title)}`"
            class="group cursor-pointer project-card relative overflow-hidden block"
          >
            <!-- Debug info -->
            <div class="absolute top-2 left-2 bg-black/80 text-white text-xs p-2 z-20">
              <div>ID: {{ project.id }}</div>
              <div>Titre: {{ project.title }}</div>
              <div>Slug: {{ createSlug(project.title) }}</div>
              <div>URL: /portfolio/{{ createSlug(project.title) }}</div>
            </div>
            
            <!-- Image du projet en couverture -->
            <div class="relative w-full h-80 bg-gray-50">
              <!-- Image depuis le champ coverPicture -->
              <img 
                v-if="project?.coverPicture?.data?.attributes?.url"
                :src="strapiMediaUrl(project.coverPicture.data.attributes.url)"
                :alt="project.title"
                class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
              
              <!-- Test structure alternative coverPicture -->
              <img 
                v-else-if="project?.coverPicture?.url"
                :src="strapiMediaUrl(project.coverPicture.url)"
                :alt="project.title"
                class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
              
              <!-- Test structure directe coverPicture -->
              <img 
                v-else-if="project?.coverPicture && typeof project.coverPicture === 'string'"
                :src="strapiMediaUrl(project.coverPicture)"
                :alt="project.title"
                class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
              
              <!-- Fallback vers le premier élément du champ media -->
              <img 
                v-else-if="project?.media?.[0]?.url"
                :src="strapiMediaUrl(project.media[0].url)"
                :alt="project.title"
                class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
              
              <!-- Vidéo depuis media -->
              <video
                v-else-if="project?.media?.[0]?.url && isVideo(project.media[0].mime)"
                :src="strapiMediaUrl(project.media[0].url)"
                class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                preload="metadata"
                @loadedmetadata="handleVideoLoad"
                @click="toggleVideoPlayback"
                ref="videoElement"
              >
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
              
              <!-- Placeholder élégant si pas de média -->
              <div v-else class="w-full h-full flex flex-col items-center justify-center text-gray-300 group-hover:text-gray-400 transition-colors duration-500">
                <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span class="text-sm font-light">{{ project?.title || 'Projet' }}</span>
              </div>

              <!-- Overlay avec informations au hover -->
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500 flex items-center justify-center">
                <div class="w-full p-6 text-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <!-- Titre du projet -->
                  <h3 class="text-xl font-light text-white mb-4 leading-tight">
                    {{ project?.title || 'Titre non défini' }}
                  </h3>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Message si aucun projet -->
        <div 
          v-if="filteredProjects.length === 0 && !loading && !error" 
          class="text-center py-32"
        >
          <div v-if="projects.length === 0" class="max-w-md mx-auto">
            <p class="text-lg text-gray-500 font-light mb-4">Aucun projet trouvé</p>
            <button @click="fetchProjects" class="px-6 py-3 bg-gray-900 text-white rounded-none hover:bg-gray-800 font-light transition-all duration-300">
              Actualiser
            </button>
          </div>
          <div v-else class="max-w-md mx-auto">
            <p class="text-lg text-gray-500 font-light mb-4">Aucun projet dans cette catégorie</p>
            <button @click="setActiveFilter('all')" class="px-6 py-3 bg-gray-900 text-white rounded-none hover:bg-gray-800 font-light transition-all duration-300">
              Voir tous les projets
            </button>
          </div>
        </div>
      </div>
    </section>
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
    'web': 'Web',
    'brand-identity': 'Identité de Marque',
    'design': 'Design',
    'photography': 'Photographie'
  }
  
  return staticTypes[typeName] || typeName
}

// Helper to get count of projects by type
const getProjectsCountByType = (typeName) => {
  if (!displayProjects.value || displayProjects.value.length === 0) {
    return 0
  }
  
  return displayProjects.value.filter(project => {
    // Nouvelle structure avec types multiples
    if (project?.project_types && Array.isArray(project.project_types)) {
      return project.project_types.some(type => 
        type.label === typeName || type.name === typeName
      )
    }
    
    // Fallback vers l'ancienne structure
    if (project?.type) {
      return project.type === typeName
    }
    
    // Fallback vers la catégorie
    if (project?.category) {
      return project.category === typeName
    }
    
    return false
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

// Helper functions
const createSlug = (title) => {
  if (!title) return '';
  console.log('🔍 Création du slug pour:', title);
  
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, ''); // Corriger trim('-') qui n'existe pas
  
  console.log('📝 Slug généré:', slug);
  return slug;
};

// Redirection vers la page dédiée du projet
const goToProject = (project) => {
  console.log('🚀 Redirection vers le projet:', project);
  
  // Créer un slug à partir du titre du projet
  const slug = createSlug(project.title) || project.id;
  console.log('📝 Slug généré:', slug);
  console.log('🔗 URL de destination:', `/portfolio/${slug}`);
  
  try {
    // Essayer d'abord avec router.push
    const router = useRouter();
    router.push(`/portfolio/${slug}`);
  } catch (error) {
    console.error('❌ Erreur avec router.push:', error);
    
    // Fallback avec window.location
    console.log('🔄 Fallback avec window.location');
    window.location.href = `/portfolio/${slug}`;
  }
};

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
  transition: all 0.3s ease-in-out;
  background: white;
  overflow: hidden;
  border-radius: 0;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* Animation d'entrée des projets */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.project-card {
  animation: fadeInUp 0.6s ease-out;
}

/* Animation des filtres */
.filter-button {
  position: relative;
  transition: all 0.3s ease;
  letter-spacing: 0.1em;
}

.filter-button:hover {
  transform: translateY(-1px);
}

/* Animation du loader */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loader-spin {
  animation: spin 1s linear infinite;
}

/* Effet de focus pour l'accessibilité */
.project-card:focus-within {
  outline: 2px solid #fddb00;
  outline-offset: 4px;
}

/* Animation d'entrée du modal */
@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-enter {
  animation: modalSlideIn 0.3s ease-out forwards;
}

/* Styles pour le bouton Load More */
.load-more-button {
  letter-spacing: 0.1em;
  font-weight: 300;
  transition: all 0.3s ease;
}

.load-more-button:hover {
  transform: translateY(-1px);
}

/* Optimisations pour l'overlay au hover */
.project-card .overlay {
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

/* Animation de l'overlay centré */
.project-card .overlay > div {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Styles pour les badges de type */
.project-card .badge {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.project-card .badge:hover {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

/* Responsive pour la grille */
@media (max-width: 1024px) {
  .grid {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .grid {
    gap: 1rem;
  }
  
  .project-card:hover {
    transform: translateY(-2px);
  }
  
  .project-card {
    animation-duration: 0.4s;
  }
}

@media (max-width: 640px) {
  .grid {
    gap: 0.75rem;
  }
  
  .project-card:hover {
    transform: translateY(-1px);
  }
}
</style>

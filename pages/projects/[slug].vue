<template>
  <div class="min-h-screen bg-white text-gray-900">
    <!-- Header avec navigation -->
    <header class="py-8 border-b border-gray-100 sticky top-0 z-40 bg-white/95 backdrop-blur-sm sticky-nav">
      <div class="container mx-auto px-8">
        <div class="flex items-center justify-end">
          <!-- Breadcrumb à droite -->
          <nav class="flex items-center space-x-4 text-sm text-gray-500">
            <button @click="goToHome" class="hover:text-gray-900 transition-colors text-left">
              Accueil
            </button>
            <span>/</span>
            <button @click="goToPortfolio" class="hover:text-gray-900 transition-colors text-left">
              Portfolio
            </button>
            <span>/</span>
            <span class="text-gray-900 font-secondary">{{ project?.title || 'Chargement...' }}</span>
          </nav>
        </div>
      </div>
    </header>

    <!-- Contenu principal -->
    <main v-if="project" class="py-16">
      <div class="container mx-auto px-8">
        <!-- Informations du projet -->
        <div class="max-w-4xl mx-auto mb-16">
          <h1 class="text-5xl md:text-6xl font-primary mb-8 text-gray-900 leading-tight">
            {{ project.title }}
          </h1>
          
          <!-- Métadonnées -->
          <div class="flex flex-wrap gap-8 mb-12 text-sm text-gray-600">
            <div v-if="project.client" class="flex items-center space-x-2">
              <span class="font-secondary">Client :</span>
              <span class="font-paragraph">{{ project.client }}</span>
            </div>
            <div v-if="project.year" class="flex items-center space-x-2">
              <span class="font-secondary">Année :</span>
              <span class="font-paragraph">{{ project.year }}</span>
            </div>
            <div v-if="project.projectUrl" class="flex items-center space-x-2">
              <span class="font-secondary">Lien :</span>
              <a 
                :href="project.projectUrl" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-blue-600 hover:text-blue-800 underline font-paragraph"
              >
                Voir le projet
              </a>
            </div>
          </div>
          
          <!-- Description -->
          <div v-if="project.description" class="prose prose-lg max-w-none">
            <p class="text-gray-700 leading-relaxed font-paragraph">{{ project.description }}</p>
          </div>
        </div>

        <!-- Galerie avec onglets -->
        <div class="max-w-6xl mx-auto">
          <!-- Onglets -->
          <div v-if="hasVideos" class="flex justify-center mb-12">
            <div class="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                @click="activeTab = 'gallery'"
                class="px-6 py-3 text-sm font-secondary transition-all duration-300"
                :class="activeTab === 'gallery' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'"
              >
                Galerie
              </button>
                          <button 
              v-if="project.url_videos && project.url_videos.length > 0"
              @click="activeTab = 'videos'"
              class="px-6 py-3 text-sm font-secondary transition-all duration-300"
              :class="activeTab === 'videos' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-900 shadow-sm'"
            >
              Vidéos
            </button>
            </div>
          </div>

          <!-- Contenu des onglets -->
          <div v-if="activeTab === 'gallery'">
            <ImageGallery 
              :images="imageMedia || []"
              :loading="loading"
              :images-per-page="10"
              @image-click="openLightbox"
            />
          </div>

          <div v-else-if="activeTab === 'videos'">
            <VideoGallery 
              :videos="project?.url_videos || []"
              @video-click="openVideoViewer"
            />
          </div>
        </div>
      </div>
    </main>

    <!-- État de chargement -->
    <div v-else-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="inline-block relative">
          <div class="w-8 h-8 border-2 border-gray-200 rounded-full"></div>
          <div class="absolute inset-0 w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p class="mt-6 text-gray-500 font-paragraph">Chargement du projet...</p>
      </div>
    </div>

    <!-- État d'erreur -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center">
      <div class="text-center max-w-md mx-auto px-8">
        <p class="text-gray-600 text-lg mb-6 font-paragraph">{{ error }}</p>
        <NuxtLink 
          to="/portfolio" 
          class="px-6 py-3 bg-gray-900 text-white rounded-none hover:bg-gray-800 transition-all duration-300 font-secondary"
        >
          Retour au portfolio
        </NuxtLink>
      </div>
    </div>

    <!-- Lightbox pour les images -->
    <div 
      v-if="lightboxOpen" 
      class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      @click="closeLightbox"
    >
      <div class="relative max-w-7xl max-h-full p-8">
        <button 
          @click="closeLightbox"
          class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div class="flex items-center justify-center h-full">
          <img 
            :src="strapiMediaUrl(imageMedia[currentImageIndex]?.url)"
            :alt="imageMedia[currentImageIndex]?.name || 'Image'"
            class="max-w-full max-h-full object-contain"
          />
        </div>
        
        <!-- Navigation -->
        <div v-if="imageMedia.length > 1" class="absolute inset-x-0 bottom-8 flex justify-center space-x-4">
          <button 
            @click="previousImage"
            class="p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors"
            :disabled="currentImageIndex === 0"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span class="px-4 py-2 bg-white/20 text-white rounded-full text-sm font-secondary">
            {{ currentImageIndex + 1 }} / {{ imageMedia.length }}
          </span>
          <button 
            @click="nextImage"
            class="p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors"
            :disabled="currentImageIndex === imageMedia.length - 1"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

            <!-- Visionneuse vidéo -->
        <VideoViewer
          :open="videoViewerOpen"
          :videos="project?.url_videos || []"
          :current-index="currentVideoIndex"
          @close="closeVideoViewer"
          @previous="currentVideoIndex = (currentVideoIndex - 1 + (project?.url_videos?.length || 0)) % (project?.url_videos?.length || 1)"
          @next="currentVideoIndex = (currentVideoIndex + 1) % (project?.url_videos?.length || 1)"
        />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Composants
import ImageGallery from '~/components/ImageGallery.vue'
import VideoGallery from '~/components/VideoGallery.vue'
import VideoViewer from '~/components/VideoViewer.vue'

// Route et router
const route = useRoute()
const router = useRouter()

// État réactif
const project = ref(null)
const loading = ref(true)
const error = ref(null)
const activeTab = ref('gallery')
const lightboxOpen = ref(false)
const currentImageIndex = ref(0)
const videoViewerOpen = ref(false)
const currentVideoIndex = ref(0)



// Définir l'onglet actif par défaut
const setDefaultActiveTab = () => {
  if (project.value?.url_videos && project.value.url_videos.length > 0) {
    activeTab.value = 'videos'
  } else {
    activeTab.value = 'gallery'
  }
}

// Configuration
const config = useRuntimeConfig()
const strapiUrl = config.public.strapiUrl

// Computed properties
const imageMedia = computed(() => {
  if (!project.value?.media) return []
  return project.value.media.filter(media => 
    media.mime?.startsWith('image/') || 
    media.attributes?.mime?.startsWith('image/')
  )
})

const videoMedia = computed(() => {
  if (!project.value?.media) return []
  return project.value.media.filter(media => 
    media.mime?.startsWith('video/') || 
    media.attributes?.mime?.startsWith('video/')
  )
})



const hasVideos = computed(() => videoMedia.value.length > 0)

// Helper functions
const strapiMediaUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${strapiUrl}${url}`
}

// Lightbox functions
const openLightbox = (index) => {
  currentImageIndex.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

// Fonction pour ouvrir la visionneuse vidéo
const openVideoViewer = (index) => {
  if (!project.value?.url_videos || !Array.isArray(project.value.url_videos)) {
    console.warn('Aucune vidéo disponible pour ce projet')
    return
  }
  currentVideoIndex.value = index
  videoViewerOpen.value = true
}

// Fonction pour fermer la visionneuse vidéo
const closeVideoViewer = () => {
  videoViewerOpen.value = false
}



const nextImage = () => {
  if (currentImageIndex.value < imageMedia.value.length - 1) {
    currentImageIndex.value++
  }
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

// Fetch project data
const fetchProject = async () => {
  try {
    loading.value = true
    error.value = null
    
            const slug = route.params.slug
        
        // Essayer de récupérer le projet par slug (titre transformé)
        let projectFound = false
        
        // Récupérer tous les projets pour chercher par titre
        const allProjectsResponse = await $fetch(`${strapiUrl}/api/projects?populate[0]=media&populate[1]=coverPicture&populate[2]=project_types&populate[3]=url_videos&populate[4]=homeMedia`)
        
        if (allProjectsResponse.data && allProjectsResponse.data.length > 0) {
          // Chercher par slug (titre transformé)
          const projectBySlug = allProjectsResponse.data.find(proj => {
            const projectSlug = createSlug(proj.title)
            return projectSlug === slug
          })
          
          if (projectBySlug) {
            project.value = projectBySlug
            projectFound = true
            setDefaultActiveTab()
          } else {
            // Fallback : essayer par ID si le slug est un nombre
            if (!isNaN(slug)) {
              const idResponse = await $fetch(`${strapiUrl}/api/projects/${slug}?populate[0]=media&populate[1]=coverPicture&populate[2]=project_types&populate[3]=url_videos&populate[4]=homeMedia`)
              if (idResponse.data) {
                project.value = idResponse.data
                projectFound = true
                setDefaultActiveTab()
              }
            }
          }
        }
        
        if (!projectFound) {
          error.value = 'Projet non trouvé'
        }
    
  } catch (err) {
    console.error('❌ Erreur lors de la récupération du projet:', err)
    error.value = 'Erreur lors du chargement du projet'
  } finally {
    loading.value = false
  }
}







// Helper function pour créer un slug
const createSlug = (title) => {
  if (!title) return ''
  
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
  
  return slug
}

// Navigation functions
const goToHome = () => {
  window.location.href = '/';
};

const goToPortfolio = () => {
  window.location.href = '/portfolio';
};

// Lifecycle
onMounted(() => {
  fetchProject()
})

// Head meta
useHead({
  title: computed(() => project.value ? `${project.value.title} - Portfolio PYOH` : 'Projet - Portfolio PYOH'),
  meta: [
    { name: 'description', content: computed(() => project.value?.description || 'Découvrez ce projet de notre portfolio') }
  ]
})
</script>

<style scoped>
/* Styles pour le breadcrumb sticky */
.sticky-nav {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

/* Styles pour la galerie en maçonnerie avec grille CSS */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 200px;
  grid-auto-flow: dense;
}

/* Responsive grid */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: 150px;
  }
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    grid-auto-rows: 180px;
  }
}

/* Animation d'entrée */
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

/* Transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>

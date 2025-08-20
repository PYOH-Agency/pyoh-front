<template>
  <div class="min-h-screen bg-white text-gray-900">
    <!-- Header avec navigation -->
    <header class="py-8 border-b border-gray-100">
      <div class="container mx-auto px-8">
        <div class="flex items-center justify-between">
          <!-- Breadcrumb -->
          <nav class="flex items-center space-x-4 text-sm text-gray-500">
            <NuxtLink to="/portfolio" class="hover:text-gray-900 transition-colors">
              Portfolio
            </NuxtLink>
            <span>/</span>
            <span class="text-gray-900 font-medium">{{ project?.title || 'Chargement...' }}</span>
          </nav>
          
          <!-- Bouton retour -->
          <NuxtLink 
            to="/portfolio" 
            class="px-6 py-3 bg-gray-900 text-white rounded-none hover:bg-gray-800 transition-all duration-300 font-light"
          >
            ← Retour au portfolio
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Contenu principal -->
    <main v-if="project" class="py-16">
      <div class="container mx-auto px-8">
        <!-- Informations du projet -->
        <div class="max-w-4xl mx-auto mb-16">
          <h1 class="text-5xl md:text-6xl font-light mb-8 text-gray-900 leading-tight">
            {{ project.title }}
          </h1>
          
          <!-- Métadonnées -->
          <div class="flex flex-wrap gap-8 mb-12 text-sm text-gray-600">
            <div v-if="project.client" class="flex items-center space-x-2">
              <span class="font-medium">Client :</span>
              <span>{{ project.client }}</span>
            </div>
            <div v-if="project.year" class="flex items-center space-x-2">
              <span class="font-medium">Année :</span>
              <span>{{ project.year }}</span>
            </div>
            <div v-if="project.projectUrl" class="flex items-center space-x-2">
              <span class="font-medium">Lien :</span>
              <a 
                :href="project.projectUrl" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-blue-600 hover:text-blue-800 underline"
              >
                Voir le projet
              </a>
            </div>
          </div>
          
          <!-- Description -->
          <div v-if="project.description" class="prose prose-lg max-w-none">
            <p class="text-gray-700 leading-relaxed">{{ project.description }}</p>
          </div>
        </div>

        <!-- Galerie avec onglets -->
        <div class="max-w-6xl mx-auto">
          <!-- Onglets -->
          <div v-if="hasVideos" class="flex justify-center mb-12">
            <div class="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                @click="activeTab = 'gallery'"
                class="px-6 py-3 text-sm font-medium transition-all duration-300"
                :class="activeTab === 'gallery' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'"
              >
                Galerie
              </button>
                          <button 
              v-if="project.url_videos && project.url_videos.length > 0"
              @click="activeTab = 'videos'"
              class="px-6 py-3 text-sm font-medium transition-all duration-300"
              :class="activeTab === 'videos' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-900 shadow-sm'"
            >
              Vidéos
            </button>
            </div>
          </div>

          <!-- Contenu des onglets -->
          <div v-if="activeTab === 'gallery'" class="space-y-8">
            <!-- Galerie en maçonnerie des images -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-auto">
              <div 
                v-for="(media, index) in imageMedia" 
                :key="media.id"
                @click="openLightbox(index)"
                class="cursor-pointer group overflow-hidden rounded-lg shadow-lg relative"
                :class="getImageGridClass(media, index)"
              >
                <img 
                  :src="strapiMediaUrl(media.url)"
                  :alt="media.name || `Image ${index + 1}`"
                  class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <svg class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'videos'" class="space-y-8">
            <!-- Galerie des vidéos Vimeo -->
            <div v-if="project.url_videos && project.url_videos.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="(videoUrl, index) in project.url_videos" 
                :key="index"
                class="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div class="relative pb-[56.25%] bg-gray-100 rounded-lg overflow-hidden">
                  <iframe 
                    :src="getVimeoEmbedUrl(videoUrl.url)"
                    class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
                <p class="mt-3 text-sm text-gray-600 text-center">
                  {{ videoUrl.name || `Vidéo ${index + 1}` }}
                </p>
              </div>
            </div>
            <div v-else class="text-center py-12">
              <p class="text-gray-500 text-lg">Aucune vidéo disponible pour ce projet</p>
            </div>
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
        <p class="mt-6 text-gray-500 font-light">Chargement du projet...</p>
      </div>
    </div>

    <!-- État d'erreur -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center">
      <div class="text-center max-w-md mx-auto px-8">
        <p class="text-gray-600 text-lg mb-6">{{ error }}</p>
        <NuxtLink 
          to="/portfolio" 
          class="px-6 py-3 bg-gray-900 text-white rounded-none hover:bg-gray-800 transition-all duration-300 font-light"
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
          <span class="px-4 py-2 bg-white/20 text-white rounded-full text-sm">
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
    console.log('🔍 Page dynamique - Slug recherché:', slug)
    
    // Essayer de récupérer le projet par slug (titre transformé)
    let projectFound = false
    
    // Récupérer tous les projets pour chercher par titre
    console.log('📡 Récupération de tous les projets...')
                const allProjectsResponse = await $fetch(`${strapiUrl}/api/projects?populate[url_videos][populate]=*`)
    console.log('📦 Réponse Strapi:', allProjectsResponse)
    
    if (allProjectsResponse.data && allProjectsResponse.data.length > 0) {
      console.log('📋 Nombre de projets trouvés:', allProjectsResponse.data.length)
      
      // Chercher par slug (titre transformé)
      const projectBySlug = allProjectsResponse.data.find(proj => {
        const projectSlug = createSlug(proj.title)
        console.log(`🔍 Comparaison: "${projectSlug}" vs "${slug}" pour "${proj.title}"`)
        return projectSlug === slug
      })
      
      if (projectBySlug) {
        console.log('✅ Projet trouvé par slug:', projectBySlug)
        project.value = projectBySlug
        projectFound = true
        setDefaultActiveTab()
      } else {
        console.log('❌ Aucun projet trouvé par slug')
        
        // Fallback : essayer par ID si le slug est un nombre
        if (!isNaN(slug)) {
          console.log('🔄 Tentative de récupération par ID:', slug)
                            const idResponse = await $fetch(`${strapiUrl}/api/projects/${slug}?populate[url_videos][populate]=*`)
                            if (idResponse.data) {
                    console.log('✅ Projet trouvé par ID:', idResponse.data)
                    project.value = idResponse.data
                    projectFound = true
                    setDefaultActiveTab()
                  }
        }
      }
    }
    
    if (!projectFound) {
      console.log('❌ Aucun projet trouvé - affichage de l\'erreur')
      error.value = 'Projet non trouvé'
    }
    
  } catch (err) {
    console.error('❌ Erreur lors de la récupération du projet:', err)
    error.value = 'Erreur lors du chargement du projet'
  } finally {
    loading.value = false
  }
}



// Fonction pour convertir une URL Vimeo en URL d'embed
const getVimeoEmbedUrl = (vimeoUrl) => {
  if (!vimeoUrl) return ''
  
  // Extraire l'ID de la vidéo Vimeo
  const vimeoId = vimeoUrl.match(/vimeo\.com\/(\d+)/)?.[1]
  if (vimeoId) {
    return `https://player.vimeo.com/video/${vimeoId}?h=hash&dnt=1&title=0&byline=0&portrait=0`
  }
  
  // Si ce n'est pas une URL Vimeo valide, retourner l'URL d'origine
  return vimeoUrl
}

// Fonction pour créer des classes CSS variables pour l'effet maçonnerie
const getImageGridClass = (media, index) => {
  // Créer des tailles variables basées sur l'index pour l'effet maçonnerie
  const heightClasses = [
    'row-span-1', // Hauteur normale
    'row-span-2', // Hauteur double
    'row-span-1', // Hauteur normale
    'row-span-3', // Hauteur triple
    'row-span-2', // Hauteur double
    'row-span-1', // Hauteur normale
  ]
  
  // Alterner entre différentes largeurs pour plus de variété
  const widthClasses = [
    'col-span-1', // Largeur normale
    'col-span-1', // Largeur normale
    'col-span-2', // Largeur double (sur 2 colonnes)
    'col-span-1', // Largeur normale
    'col-span-1', // Largeur normale
    'col-span-2', // Largeur double
  ]
  
  const heightClass = heightClasses[index % heightClasses.length]
  const widthClass = widthClasses[index % widthClasses.length]
  
  return `${heightClass} ${widthClass}`
}

// Helper function pour créer un slug
const createSlug = (title) => {
  if (!title) return ''
  console.log('🔍 Création du slug pour:', title)
  
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '') // Corriger trim('-') qui n'existe pas
  
  console.log('📝 Slug généré:', slug)
  return slug
}

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

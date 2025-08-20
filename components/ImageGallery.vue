<template>
  <div class="space-y-8">
    <!-- Galerie en maçonnerie des images -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <!-- Images chargées -->
      <div 
        v-for="(media, index) in displayedImages" 
        :key="media.id"
        @click="$emit('imageClick', index)"
        class="cursor-pointer group overflow-hidden shadow-lg relative"
        :class="getImageGridClass(media, index)"
      >
        <img 
          :src="getMediaUrl(media)"
          :alt="getMediaAlt(media) || `Image ${index + 1}`"
          class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <svg class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
      
      <!-- Skeleton loaders -->
      <div 
        v-for="index in skeletonCount" 
        :key="`skeleton-${index}`"
        class="animate-pulse"
        :class="getImageGridClass({}, index)"
      >
        <div class="w-full h-full bg-gray-200 rounded-lg"></div>
      </div>
    </div>
    
    <!-- Bouton "Voir plus" si plus d'images -->
    <div v-if="hasMoreImages" class="text-center pt-8">
      <button 
        @click="loadMoreImages"
        :disabled="loadingMore"
        class="px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400 transition-all duration-300 font-light"
      >
        <span v-if="!loadingMore">Voir plus d'images</span>
        <span v-else class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Chargement...
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

// Props
const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  imagesPerPage: {
    type: Number,
    default: 10
  },
  strapiUrl: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['imageClick'])

// État pour le scroll infini des images
const currentImagePage = ref(1)
const loadingMore = ref(false)

// Computed properties
const displayedImages = computed(() => {
  if (!props.images || !Array.isArray(props.images)) return []
  return props.images.slice(0, currentImagePage.value * props.imagesPerPage)
})

// Nombre de skeletons à afficher
const skeletonCount = computed(() => {
  if (props.loading) return 8 // 8 skeletons pendant le chargement initial
  if (loadingMore.value) return 4 // 4 skeletons pendant le chargement de plus
  return 0
})

// S'il y a plus d'images à charger
const hasMoreImages = computed(() => {
  return props.images && Array.isArray(props.images) && displayedImages.value.length < props.images.length
})

// Fonction pour créer des classes CSS variables pour l'effet maçonnerie
const getImageGridClass = (media, index) => {
  // Créer des tailles variables basées sur l'index pour l'effet maçonnerie
  const heightClasses = [
    'row-span-1', // Hauteur normale
    'row-span-2', // Hauteur double
    'row-span-1', // Hauteur normale
    'row-span-2', // Hauteur double
    'row-span-1', // Hauteur normale
    'row-span-2', // Hauteur double
  ]
  
  // S'assurer que chaque ligne soit remplie en utilisant col-span-1
  const widthClass = 'col-span-1'
  
  const heightClass = heightClasses[index % heightClasses.length]
  
  return `${heightClass} ${widthClass}`
}

// Fonction pour obtenir l'URL de l'image
const getMediaUrl = (media) => {
  if (!media) return ''
  
  // Structure Strapi v4
  if (media.url) return media.url
  if (media.attributes?.url) return media.attributes.url
  
  // Structure Strapi v3
  if (media.data?.attributes?.url) return media.data.attributes.url
  
  return ''
}

// Fonction pour obtenir l'alt de l'image
const getMediaAlt = (media) => {
  if (!media) return ''
  
  // Structure Strapi v4
  if (media.name) return media.name
  if (media.attributes?.name) return media.attributes.name
  if (media.alternativeText) return media.alternativeText
  if (media.attributes?.alternativeText) return media.attributes.alternativeText
  
  // Structure Strapi v3
  if (media.data?.attributes?.name) return media.data.attributes.name
  if (media.data?.attributes?.alternativeText) return media.data.attributes.alternativeText
  
  return ''
}

// Fonction pour charger plus d'images
const loadMoreImages = async () => {
  if (loadingMore.value) return
  
  loadingMore.value = true
  
  // Simuler un délai de chargement
  await new Promise(resolve => setTimeout(resolve, 800))
  
  currentImagePage.value++
  loadingMore.value = false
}

// Lifecycle
onMounted(() => {
  // Observer d'intersection pour le scroll infini automatique
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && hasMoreImages.value && !loadingMore.value) {
        loadMoreImages()
      }
    })
  }, { threshold: 0.1 })
  
  // Observer le dernier élément de la galerie
  nextTick(() => {
    const lastImage = document.querySelector('.grid > div:last-child')
    if (lastImage) {
      observer.observe(lastImage)
    }
  })
  
  // Cleanup
  onUnmounted(() => {
    observer.disconnect()
  })
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

/* Transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>

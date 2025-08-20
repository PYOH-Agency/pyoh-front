<template>
  <div 
    v-if="open" 
    class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
    @click="$emit('close')"
  >
    <div class="relative max-w-6xl w-full max-h-full p-8">
      <button 
        @click="$emit('close')"
        class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div class="w-full aspect-video bg-black">
        <iframe 
          :src="getVimeoEmbedUrl(currentVideo?.url)"
          class="w-full h-full"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      
      <!-- Titre de la vidéo -->
      <div class="mt-4 text-center">
        <h3 class="text-xl font-light text-white">
          {{ currentVideo?.name || `Vidéo ${currentIndex + 1}` }}
        </h3>
      </div>
      
                  <!-- Navigation entre vidéos -->
            <button 
              v-if="videos && Array.isArray(videos) && videos.length > 1"
              @click="$emit('previous')"
              class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            >
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              v-if="videos && Array.isArray(videos) && videos.length > 1"
              @click="$emit('next')"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            >
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  videos: {
    type: Array,
    default: () => []
  },
  currentIndex: {
    type: Number,
    default: 0
  }
})

// Emits
const emit = defineEmits(['close', 'previous', 'next'])

// Computed
const currentVideo = computed(() => {
  if (!props.videos || !Array.isArray(props.videos) || props.videos.length === 0) {
    return null
  }
  return props.videos[props.currentIndex] || null
})

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
</script>

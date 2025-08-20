<template>
  <div class="space-y-6 pb-8">
            <!-- Galerie des vidéos Vimeo -->
        <div v-if="videos && Array.isArray(videos) && videos.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="(video, index) in videos" 
        :key="index"
        @click="$emit('videoClick', index)"
        class="group cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 overflow-hidden"
      >
        <!-- Vignette vidéo avec overlay play -->
        <div class="relative aspect-video bg-gray-200 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-yellow-400 transition-all duration-300">
              <svg class="w-8 h-8 text-gray-800 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          <!-- Indicateur de durée -->
          <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            Vidéo
          </div>
        </div>
        
        <!-- Titre de la vidéo -->
        <div class="p-4">
          <h4 class="text-sm font-medium text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
            {{ video.name || `Vidéo ${index + 1}` }}
          </h4>
          <p class="text-xs text-gray-500 mt-1">Cliquez pour regarder</p>
        </div>
      </div>
    </div>
    
    <!-- Message si aucune vidéo -->
            <div v-else class="text-center py-12">
          <div class="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p class="text-gray-500 text-base font-light">
            {{ !videos ? 'Chargement...' : 'Aucune vidéo disponible pour ce projet' }}
          </p>
        </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  videos: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits(['videoClick'])
</script>

<style scoped>
/* Transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>

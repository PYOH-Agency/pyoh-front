<template>
  <div class="fixed top-20 left-8 z-50 bg-black/80 p-4 rounded-lg border border-white/20 text-white text-sm">
    <h3 class="font-bold mb-2">Debug Scroll</h3>
    <div class="space-y-1">
      <p>Projet actuel: {{ currentIndex + 1 }} / {{ totalProjects }}</p>
      <p>Transition: {{ isTransitioning ? 'Oui' : 'Non' }}</p>
      <p>Scroll events: {{ scrollCount }}</p>
      <p>Delta Y: {{ lastDeltaY }}</p>
    </div>
    
    <!-- Boutons de test -->
    <div class="mt-4 space-y-2">
      <button 
        @click="nextProject"
        class="w-full px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-xs transition-colors"
      >
        Projet suivant
      </button>
      <button 
        @click="previousProject"
        class="w-full px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-xs transition-colors"
      >
        Projet précédent
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  currentIndex: {
    type: Number,
    required: true
  },
  totalProjects: {
    type: Number,
    required: true
  },
  isTransitioning: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['next', 'previous'])

const scrollCount = ref(0)
const lastDeltaY = ref(0)

// Écouter les événements de scroll
onMounted(() => {
  const handleScrollDebug = (event) => {
    scrollCount.value++
    lastDeltaY.value = event.deltaY
  }
  
  window.addEventListener('wheel', handleScrollDebug)
  
  onUnmounted(() => {
    window.removeEventListener('wheel', handleScrollDebug)
  })
})

const nextProject = () => {
  emit('next')
}

const previousProject = () => {
  emit('previous')
}
</script>

<template>
  <div class="relative">
    <!-- Carrousel des témoignages -->
    <div class="overflow-hidden">
      <div 
        class="flex transition-transform duration-700 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div 
          v-for="(testimonial, index) in testimonials" 
          :key="testimonial.id"
          class="w-full flex-shrink-0 px-8"
        >
          <div class="max-w-4xl mx-auto text-center">
            <!-- Icône de guillemets -->
            <div class="mb-8">
              <svg class="w-16 h-16 mx-auto text-pyoh-yellow/30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            
            <!-- Témoignage -->
            <blockquote class="text-2xl md:text-3xl lg:text-4xl text-theme-secondary font-light leading-relaxed mb-8 italic">
              "{{ testimonial.testimonial }}"
            </blockquote>
            
            <!-- Informations du client -->
            <div class="space-y-2">
              <p class="text-xl font-semibold text-pyoh-yellow">
                {{ testimonial.name }}
              </p>
              <p class="text-theme-tertiary text-lg">
                {{ testimonial.client }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-center items-center mt-12 space-x-4">
      <!-- Bouton précédent -->
      <button 
        @click="previous"
        class="p-3 text-theme-tertiary hover:text-pyoh-yellow transition-colors duration-300 disabled:opacity-30"
        :disabled="currentIndex === 0"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <!-- Indicateurs -->
      <div class="flex space-x-2">
        <button
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.id"
          @click="goTo(index)"
          class="w-3 h-3 rounded-full transition-all duration-300"
          :class="{
            'bg-pyoh-yellow': currentIndex === index,
            'bg-theme-quaternary hover:bg-theme-tertiary': currentIndex !== index
          }"
        ></button>
      </div>

      <!-- Bouton suivant -->
      <button 
        @click="next"
        class="p-3 text-theme-tertiary hover:text-pyoh-yellow transition-colors duration-300 disabled:opacity-30"
        :disabled="currentIndex === testimonials.length - 1"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <!-- Auto-play -->
    <div class="text-center mt-6">
      <button 
        @click="toggleAutoPlay"
        class="text-sm text-theme-quaternary hover:text-pyoh-yellow transition-colors duration-300"
      >
        {{ isAutoPlaying ? 'Pause' : 'Lecture automatique' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  testimonials: {
    type: Array,
    required: true,
    default: () => []
  },
  autoPlayInterval: {
    type: Number,
    default: 5000 // 5 secondes
  }
})

// État réactif
const currentIndex = ref(0)
const isAutoPlaying = ref(true)
let autoPlayTimer = null

// Navigation
const next = () => {
  if (currentIndex.value < props.testimonials.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const previous = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = props.testimonials.length - 1
  }
}

const goTo = (index) => {
  currentIndex.value = index
}

// Auto-play
const startAutoPlay = () => {
  if (props.testimonials.length <= 1) return
  
  autoPlayTimer = setInterval(() => {
    next()
  }, props.autoPlayInterval)
}

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

const toggleAutoPlay = () => {
  if (isAutoPlaying.value) {
    stopAutoPlay()
    isAutoPlaying.value = false
  } else {
    startAutoPlay()
    isAutoPlaying.value = true
  }
}

// Lifecycle
onMounted(() => {
  if (props.testimonials.length > 1) {
    startAutoPlay()
  }
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
/* Animation d'entrée pour les témoignages */
blockquote {
  animation: fadeInUp 0.8s ease-out;
}

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

/* Transition fluide pour le carrousel */
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

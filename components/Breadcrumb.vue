<template>
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-6 px-4">
    <div class="flex items-center justify-center">
        <!-- Breadcrumb centré -->
        <nav class="flex items-center space-x-4 text-sm text-gray-500">
          <button @click="goToHome" class="hover:text-gray-700 transition-colors text-left">
            Accueil
          </button>
          <span>/</span>
          <button @click="goToPortfolio" class="hover:text-gray-700 transition-colors text-left">
            Portfolio
          </button>
          <span v-if="currentPage" class="text-gray-900 font-secondary">/</span>
          <span v-if="currentPage" class="text-gray-900 font-secondary">{{ currentPage }}</span>
        </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  currentPage: {
    type: String,
    default: ''
  },
  backgroundColor: {
    type: String,
    default: 'white'
  }
})

// Logo supprimé - plus nécessaire

// Navigation
const goToHome = () => {
  router.push('/')
}

const goToPortfolio = () => {
  router.push('/portfolio')
}
</script>

<style scoped>
/* Styles pour le breadcrumb */
header {
  transition: all 0.3s ease;
}

/* Responsive */
@media (max-width: 768px) {
  header {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  
  .h-12 {
    height: 2.5rem;
  }
}
</style>

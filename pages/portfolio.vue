<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Header de la page -->
    <header class="py-16 bg-gradient-to-br from-black via-gray-900 to-black">
      <div class="container mx-auto px-8 text-center">
        <h1 class="text-6xl md:text-8xl font-bold mb-6">Portfolio</h1>
        <p class="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
          Découvrez notre sélection de projets créatifs et innovants
        </p>
      </div>
    </header>

    <!-- Filtres -->
    <section class="py-12 border-b border-white/10">
      <div class="container mx-auto px-8">
        <div class="flex flex-wrap gap-4 justify-center">
          <button 
            @click="setActiveFilter('all')"
            class="px-6 py-3 rounded-full transition-all duration-300"
            :class="activeFilter === 'all' 
              ? 'bg-white text-black' 
              : 'bg-white/10 text-white hover:bg-white/20'"
          >
            Tous
          </button>
          <button 
            v-for="category in uniqueCategories" 
            :key="category"
            @click="setActiveFilter(category)"
            class="px-6 py-3 rounded-full transition-all duration-300"
            :class="activeFilter === category 
              ? 'bg-white text-black' 
              : 'bg-white/10 text-white hover:bg-white/20'"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>

    <!-- Grille des projets -->
    <section class="py-16">
      <div class="container mx-auto px-8">
        <TransitionGroup 
          name="project-grid" 
          tag="div" 
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="group cursor-pointer"
            @click="openProjectModal(project)"
          >
            <!-- Image du projet -->
            <div class="relative overflow-hidden rounded-lg mb-6 aspect-[4/3] bg-gray-800">
              <img 
                v-if="project.attributes.media?.data?.attributes?.url"
                :src="strapiMediaUrl(project.attributes.media.data.attributes.url)"
                :alt="project.attributes.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
              
              <!-- Overlay au hover -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="bg-white/90 text-black px-6 py-3 rounded-full font-semibold">
                  Voir le projet
                </div>
              </div>
            </div>

            <!-- Informations du projet -->
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <span class="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                  {{ project.attributes.category }}
                </span>
                <span class="text-sm text-white/60">
                  {{ project.attributes.year }}
                </span>
              </div>
              
              <h3 class="text-2xl font-bold text-white group-hover:text-white/80 transition-colors duration-300">
                {{ project.attributes.title }}
              </h3>
              
              <p class="text-white/70 leading-relaxed">
                {{ project.attributes.subtitle }}
              </p>

              <!-- Technologies -->
              <div v-if="project.attributes.technologies" class="flex flex-wrap gap-2 pt-2">
                <span 
                  v-for="tech in project.attributes.technologies" 
                  :key="tech"
                  class="px-2 py-1 bg-white/5 rounded text-xs text-white/60"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <!-- Message si aucun projet -->
        <div 
          v-if="filteredProjects.length === 0" 
          class="text-center py-16"
        >
          <p class="text-xl text-white/60">Aucun projet trouvé dans cette catégorie.</p>
        </div>
      </div>
    </section>

    <!-- Modal du projet -->
    <div 
      v-if="selectedProject"
      class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
      @click="closeProjectModal"
    >
      <div 
        class="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Header du modal -->
        <div class="p-6 border-b border-white/10 flex justify-between items-start">
          <div>
            <h2 class="text-3xl font-bold text-white mb-2">
              {{ selectedProject.attributes.title }}
            </h2>
            <div class="flex items-center gap-4 text-white/70">
              <span>{{ selectedProject.attributes.category }}</span>
              <span>•</span>
              <span>{{ selectedProject.attributes.year }}</span>
              <span v-if="selectedProject.attributes.client">•</span>
              <span v-if="selectedProject.attributes.client">{{ selectedProject.attributes.client }}</span>
            </div>
          </div>
          <button 
            @click="closeProjectModal"
            class="text-white/70 hover:text-white transition-colors duration-300"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Contenu du modal -->
        <div class="p-6">
          <!-- Image principale -->
          <div class="mb-6 rounded-lg overflow-hidden">
            <img 
              v-if="selectedProject.attributes.media?.data?.attributes?.url"
              :src="strapiMediaUrl(selectedProject.attributes.media.data.attributes.url)"
              :alt="selectedProject.attributes.title"
              class="w-full h-auto"
            />
          </div>

          <!-- Description -->
          <div v-if="selectedProject.attributes.description" class="mb-6">
            <h3 class="text-xl font-semibold text-white mb-3">Description</h3>
            <div class="text-white/80 prose prose-invert max-w-none" v-html="selectedProject.attributes.description"></div>
          </div>

          <!-- Technologies -->
          <div v-if="selectedProject.attributes.technologies" class="mb-6">
            <h3 class="text-xl font-semibold text-white mb-3">Technologies utilisées</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tech in selectedProject.attributes.technologies" 
                :key="tech"
                class="px-3 py-2 bg-white/10 rounded-lg text-white/80"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Lien vers le projet -->
          <div v-if="selectedProject.attributes.projectUrl" class="text-center">
            <a 
              :href="selectedProject.attributes.projectUrl" 
              target="_blank"
              class="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all duration-300"
            >
              Voir le projet en ligne
              <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
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
const selectedProject = ref(null)

// Filtrage des projets
const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects.value
  }
  return projects.value.filter(project => 
    project.attributes.category === activeFilter.value
  )
})

// Catégories uniques
const uniqueCategories = computed(() => {
  const categories = projects.value.map(project => project.attributes.category)
  return [...new Set(categories)]
})

// Gestion des filtres
const setActiveFilter = (filter) => {
  activeFilter.value = filter
  
  // Animation des projets filtrés
  gsap.fromTo('.project-grid-enter-active', 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
  )
}

// Gestion du modal
const openProjectModal = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
  
  // Animation d'entrée du modal
  gsap.fromTo('.modal', 
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
  )
}

const closeProjectModal = () => {
  selectedProject.value = null
  document.body.style.overflow = 'auto'
}



// Lifecycle
onMounted(() => {
  fetchProjects()
})
</script>

<style scoped>
.project-grid-enter-active,
.project-grid-leave-active {
  transition: all 0.5s ease-in-out;
}

.project-grid-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.project-grid-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* Scrollbar personnalisée */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #111;
}

::-webkit-scrollbar-thumb {
  background: #fff;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}

/* Animation des cartes au hover */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Responsive */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>

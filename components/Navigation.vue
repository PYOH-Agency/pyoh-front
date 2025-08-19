<template>
  <div class="fixed top-0 left-0 z-50 w-full h-full pointer-events-none">
    <!-- Bouton de navigation discrète (haut droite) -->
    <div class="absolute top-6 right-6 pointer-events-auto">
      <button
        @click="toggleMenu"
        class="nav-button group relative w-12 h-12 flex items-center justify-center"
        :class="{ 'bg-white/20': isMenuOpen }"
      >
        <div class="flex flex-col items-center justify-center space-y-1">
          <span 
            class="w-5 h-0.5 bg-white transition-all duration-300"
            :class="{ 'rotate-45 translate-y-1/2': isMenuOpen }"
          ></span>
          <span 
            class="w-5 h-0.5 bg-white transition-all duration-300"
            :class="{ 'opacity-0': isMenuOpen }"
          ></span>
          <span 
            class="w-5 h-0.5 bg-white transition-all duration-300"
            :class="{ '-rotate-45 -translate-y-1/2': isMenuOpen }"
          ></span>
        </div>
      </button>
    </div>

    <!-- Bouton flottant Cal.com -->
    <div v-if="!isHomePage" class="absolute bottom-6 left-6 pointer-events-auto">
      <CalFloatingButton />
    </div>

    <!-- Informations client et année (bas droite) -->
    <div class="absolute bottom-6 right-6 pointer-events-auto">
      <div class="text-right">
        <p v-if="currentProjectClient" class="text-white/60 text-sm font-medium">{{ currentProjectClient }}</p>
        <p v-if="currentProjectYear" class="text-white/40 text-xs">{{ currentProjectYear }}</p>
        <!-- Fallback si pas de projet -->
        <p v-if="!currentProjectClient && !currentProjectYear" class="text-white/60 text-sm font-medium">PYOH Agency</p>
        <p v-if="!currentProjectClient && !currentProjectYear" class="text-white/40 text-xs">{{ currentYear }}</p>
      </div>
    </div>

    <!-- Menu plein écran -->
    <Transition
      enter-active-class="transition-all duration-700 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-500 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 bg-black/95 backdrop-blur-md pointer-events-auto"
      >
        <!-- Bouton de fermeture -->
        <button
          @click="closeMenu"
          class="absolute top-6 right-6 text-white/60 hover:text-white transition-colors duration-300 z-50"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Contenu du menu en deux parties -->
        <div class="relative h-full flex">
          <!-- Partie gauche : Navigation -->
          <div class="w-1/2 h-full flex items-center justify-center border-r border-white/10">
            <div class="text-left space-y-8 max-w-lg">
              <!-- Logo/Nom -->
              <div class="mb-16 animate-fade-in-up">
                <img 
                  src="/images/Logos Pyoh-06.png" 
                  alt="PYOH Logo" 
                  class="h-48 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              <!-- Navigation principale -->
              <nav class="space-y-6 animate-fade-in-up" style="animation-delay: 0.1s;">
                <NuxtLink
                  v-for="(item, index) in menuItems"
                  :key="item.path"
                  :to="item.path"
                  @click="closeMenu"
                  class="block text-4xl font-light text-white/80 hover:text-white transition-all duration-300 hover:scale-105 py-2 px-4 rounded-lg group relative"
                  :style="{ animationDelay: `${0.2 + index * 0.1}s` }"
                >
                  <span class="relative">
                    {{ item.label }}
                    <!-- Effet de soulignement jaune au hover -->
                    <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-pyoh-yellow transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <!-- Point jaune au hover -->
                  <span class="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-pyoh-yellow rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></span>
                </NuxtLink>
              </nav>

              <!-- Informations de contact -->
              <div class="mt-16 animate-fade-in-up" style="animation-delay: 0.6s;">
                <p class="text-white/60 text-lg">hello@pyoh.agency</p>
                <p class="text-white/40 text-sm mt-2">+33 1 23 45 67 89</p>
              </div>
            </div>
          </div>

          <!-- Partie droite : Onglets Contact/Calendrier -->
          <div class="w-1/2 h-full flex flex-col">
            <!-- En-tête des onglets -->
            <div class="flex-1 flex items-center justify-center">
              <div class="w-full max-w-2xl mx-auto px-8">
                <div class="text-center mb-8 animate-fade-in-up" style="animation-delay: 0.3s;">
                  <h2 class="text-3xl font-bold text-white mb-4">Contactez-nous</h2>
                  <p class="text-white/70 text-lg">Discutons de votre projet</p>
                </div>

                <!-- Onglets -->
                <div class="flex justify-center space-x-4 mb-8 animate-fade-in-up" style="animation-delay: 0.4s;">
                  <button
                    @click="activeTab = 'contact'"
                    class="px-8 py-3 text-lg font-medium transition-all duration-300 border-b-2 rounded-t-lg"
                    :class="{ 
                      'text-pyoh-yellow border-pyoh-yellow': activeTab === 'contact', 
                      'text-white/60 border-transparent hover:text-white hover:border-white/30': activeTab !== 'contact' 
                    }"
                  >
                    Contact
                  </button>
                  <button
                    @click="activeTab = 'calendar'"
                    class="px-8 py-3 text-lg font-medium transition-all duration-300 border-b-2 rounded-t-lg"
                    :class="{ 
                      'text-pyoh-yellow border-pyoh-yellow': activeTab === 'calendar', 
                      'text-white/60 border-transparent hover:text-white hover:border-white/30': activeTab !== 'calendar' 
                    }"
                  >
                    Rendez-vous
                  </button>
                </div>

                <!-- Contenu des onglets -->
                <Transition
                  enter-active-class="transition-all duration-500 ease-out"
                  enter-from-class="opacity-0 translate-y-4"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition-all duration-300 ease-in"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 translate-y-4"
                >
                  <div v-if="activeTab" class="animate-fade-in-up" style="animation-delay: 0.5s;">
                    <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
                      <ContactForm v-if="activeTab === 'contact'" />
                      <CalendarWidget v-else-if="activeTab === 'calendar'" />
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

// État du menu
const isMenuOpen = ref(false)
const activeTab = ref<string>('contact') // Onglet contact par défaut

// État du projet actuel
const currentProjectClient = ref<string | null>(null)
const currentProjectYear = ref<number | null>(null)

// Année courante
const currentYear = computed(() => new Date().getFullYear())

// Vérifier si on est sur la page home
const route = useRoute()
const isHomePage = computed(() => route.path === '/' || route.path === '/index')

// Items de navigation
const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'PYOH Agency', path: '/agency' },
  { label: 'Contact', path: '/contact' }
]

// Écouter les changements de projet depuis le ProjectSlider
const listenToProjectChanges = () => {
  // Créer un événement personnalisé pour écouter les changements de projet
  const handleProjectChange = (event: CustomEvent) => {
    const { client, year } = event.detail
    currentProjectClient.value = client
    currentProjectYear.value = year
  }
  
  window.addEventListener('project-change', handleProjectChange as EventListener)
  
  return () => {
    window.removeEventListener('project-change', handleProjectChange as EventListener)
  }
}

// Méthodes
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    activeTab.value = 'contact' // Réinitialiser à l'onglet contact
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Fermer le menu avec la touche Escape
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      isMenuOpen.value = false
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  // Écouter les changements de projet
  const cleanup = listenToProjectChanges()
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
    cleanup()
  })
})
</script>

<style scoped>
/* Styles spécifiques au composant */
.nav-button {
  @apply bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-full border border-white/20;
}

.nav-button:hover {
  @apply bg-white/20 transform scale-105;
}

/* Utilisation de la couleur jaune PYOH */
.bg-pyoh-yellow {
  background-color: var(--pyoh-yellow);
}

.text-pyoh-yellow {
  color: var(--pyoh-yellow);
}

.border-pyoh-yellow {
  border-color: var(--pyoh-yellow);
}

/* Effet de hover sur les onglets */
button:hover .border-pyoh-yellow {
  border-color: var(--pyoh-yellow-hover);
}
</style>

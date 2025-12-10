<template>
  <div class="fixed top-0 left-0 z-40 w-full h-full pointer-events-none">
    <!-- Logo PYOH en haut à gauche (pas sur la home) -->
    <div v-if="!isHomePage" class="absolute top-4 left-4 md:top-8 md:left-8 pointer-events-auto z-40">
      <NuxtLink to="/" class="block">
        <img 
          :src="logoImage"
          alt="PYOH" 
          class="h-16 w-auto md:h-32 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
          :class="logoClasses"
        />
      </NuxtLink>
    </div>

    <!-- Bouton de navigation discrète (haut droite) - masqué sur portfolio et détail projet -->
    <div v-if="props.pageType !== 'portfolio' && props.pageType !== 'project-detail'" class="absolute top-4 right-4 md:top-8 md:right-8 pointer-events-auto z-40">
      <button
        @click="toggleMenu"
        class="nav-button group relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center backdrop-blur-sm rounded-full transition-all duration-300 touch-manipulation"
        :class="buttonClasses"
      >
        <div class="flex flex-col items-center justify-center space-y-1">
          <span 
            class="w-5 h-0.5 transition-all duration-300"
            :class="lineClasses"
            :style="{ transform: isMenuOpen ? 'rotate(45deg) translateY(2px)' : 'none' }"
          ></span>
          <span 
            class="w-5 h-0.5 transition-all duration-300"
            :class="lineClasses"
            :style="{ opacity: isMenuOpen ? 0 : 1 }"
          ></span>
          <span 
            class="w-5 h-0.5 transition-all duration-300"
            :class="lineClasses"
            :style="{ transform: isMenuOpen ? 'rotate(-45deg) translateY(-2px)' : 'none' }"
          ></span>
        </div>
      </button>
    </div>

    <!-- Bouton flottant Cal.com -->
    <div v-if="props.pageType !== 'home'" class="absolute bottom-4 left-4 md:bottom-6 md:left-6 pointer-events-auto z-30">
      <CalFloatingButton />
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
        class="fixed inset-0 bg-black/95 backdrop-blur-md pointer-events-auto z-50"
      >
        <!-- Bouton de fermeture -->
        <button
          @click="closeMenu"
          class="absolute top-4 right-4 md:top-6 md:right-6 text-white/60 hover:text-white transition-colors duration-300 z-50 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center touch-manipulation"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Contenu du menu en deux parties -->
        <div class="relative h-full flex flex-col lg:flex-row overflow-y-auto">
          <!-- Partie gauche : Navigation -->
          <div class="w-full lg:w-1/2 h-auto lg:h-full flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10 py-8 lg:py-0">
            <div class="text-left space-y-4 md:space-y-8 max-w-lg px-4 md:px-0">
              <!-- Logo/Nom -->
              <div class="mb-8 md:mb-16 animate-fade-in-up flex justify-center lg:justify-start">
                <img 
                  src="/images/Logos Pyoh-07.png" 
                  alt="PYOH Logo" 
                  class="h-24 md:h-40 lg:h-64 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              <!-- Navigation principale -->
              <nav class="space-y-3 md:space-y-6 animate-fade-in-up" style="animation-delay: 0.1s;">
                <NuxtLink
                  v-for="(item, index) in menuItems"
                  :key="item.path"
                  :to="item.path"
                  @click="() => { closeMenu(); trackNavigationClick(item.label); }"
                  class="block text-2xl md:text-3xl lg:text-4xl font-secondary text-white/80 hover:text-white transition-all duration-300 hover:scale-105 py-2 px-4 rounded-lg group relative touch-manipulation"
                  :style="{ animationDelay: `${0.2 + index * 0.1}s` }"
                >
                  <span class="relative">
                    {{ item.label }}
                    <!-- Effet de soulignement jaune au hover -->
                    <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-pyoh-yellow transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <!-- Point jaune au hover - repositionné pour être visible -->
                  <span class="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-pyoh-yellow rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></span>
                </NuxtLink>
              </nav>
            </div>
          </div>

          <!-- Partie droite : Onglets Contact/Calendrier -->
          <div class="w-full lg:w-1/2 h-auto lg:h-full flex flex-col">
            <!-- En-tête des onglets -->
            <div class="flex-1 flex items-center justify-center py-8 lg:py-0">
              <div class="w-full max-w-2xl mx-auto px-4 md:px-8">
                <div class="text-center mb-6 md:mb-8 animate-fade-in-up" style="animation-delay: 0.3s;">
                  <h2 class="text-2xl md:text-3xl font-primary text-white mb-4">Contactez-nous</h2>
                  <p class="text-white/70 text-base md:text-lg font-paragraph">Discutons de votre projet</p>
                </div>

                <!-- Onglets -->
                <div class="flex justify-center mb-6 md:mb-8 animate-fade-in-up" style="animation-delay: 0.4s;">
                  <AppTab
                    v-model="activeTab"
                    :tabs="contactTabs"
                    color="white/60"
                    active-color="pyoh-yellow"
                    :background-color="backgroundColor"
                    class="text-sm md:text-lg"
                  />
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
                    <div class="bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg p-4 md:p-8 shadow-2xl">
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
import { useRoute, useRouter } from 'vue-router'

// État du menu
const isMenuOpen = ref(false)
const activeTab = ref<string>('contact') // Onglet contact par défaut

// Tabs pour le contact
const contactTabs = [
  { label: 'Contact', value: 'contact' },
  { label: 'Rendez-vous', value: 'calendar' }
]

// Props pour la configuration de la page
const props = defineProps({
  pageType: {
    type: String,
    default: 'other'
  },
  backgroundColor: {
    type: String,
    default: 'black'
  }
})

// Vérifier si on est sur la page home
const route = useRoute()
const router = useRouter()
const isHomePage = computed(() => route.path === '/' || route.path === '/index')

// Détection de la couleur du fond basée sur les props
const isDarkBackground = computed(() => props.backgroundColor === 'black')

// Classes conditionnelles basées sur la couleur du fond
const logoImage = computed(() => {
  // Logo dynamique selon la couleur de fond
  return props.backgroundColor === 'white' 
    ? '/images/Logos Pyoh-04.png'  // Logo noir pour fond blanc
    : '/images/Logos Pyoh-07.png'  // Logo blanc pour fond noir
})

const buttonClasses = computed(() => {
  if (isDarkBackground.value) {
    return `bg-white/60 border-white/50 hover:bg-white/80 ${isMenuOpen.value ? 'bg-white/90' : ''}`
  } else {
    return `bg-black/60 border-black/50 hover:bg-black/80 ${isMenuOpen.value ? 'bg-black/90' : ''}`
  }
})

const lineClasses = computed(() => {
  return isDarkBackground.value ? 'bg-white' : 'bg-black'
})

// Items de navigation
const menuItems = [
  { path: '/', label: 'Home' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/about', label: 'À propos' },
  { path: '/contact', label: 'Contact' }
]

// Méthodes
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  
  if (isMenuOpen.value) {
    activeTab.value = 'contact' // Réinitialiser à l'onglet contact
    // Empêcher le scroll du body sur mobile
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

// Navigation simple
const goToPage = (path: string) => {
  router.push(path)
  closeMenu()
}

// Plus besoin de détection automatique car on utilise les props
onMounted(() => {
  // Initialisation si nécessaire
})

// Fermer le menu avec la touche Escape
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeMenu()
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
    // Restaurer le scroll au démontage
    document.body.style.overflow = ''
  })
})
</script>

<style scoped>
/* Styles spécifiques au composant */
.nav-button {
  @apply bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 rounded-full border border-white/50;
}

.nav-button:hover {
  @apply bg-white/80 transform scale-105;
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

/* Point jaune au hover des liens de navigation */
.nav a.group:hover .bg-pyoh-yellow {
  background-color: var(--pyoh-yellow) !important;
  z-index: 10;
}
</style>

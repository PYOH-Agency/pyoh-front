<template>
  <div class="home-navigation">
    <!-- Logo PYOH en haut à gauche -->
    <div class="absolute top-8 left-8 z-30">
      <img 
        :src="logoUrl" 
        alt="PYOH Logo" 
        class="h-40 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
      />
    </div>

    <!-- Bouton de navigation discrète (haut droite) -->
    <div class="absolute top-8 right-8 pointer-events-auto">
      <button
        @click="toggleMenu"
        class="nav-button group relative w-12 h-12 flex items-center justify-center backdrop-blur-sm rounded-full transition-all duration-300"
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
                  src="/images/Logos Pyoh-07.png" 
                  alt="PYOH Logo" 
                  class="h-64 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              <!-- Navigation principale -->
              <nav class="space-y-6 animate-fade-in-up" style="animation-delay: 0.1s;">
                <NuxtLink
                  v-for="(item, index) in menuItems"
                  :key="item.path"
                  :to="item.path"
                  @click="closeMenu"
                  class="block text-4xl font-secondary text-white/80 hover:text-white transition-all duration-300 hover:scale-105 py-2 px-4 rounded-lg group relative"
                  :style="{ animationDelay: `${0.2 + index * 0.1}s` }"
                >
                  <span class="relative">
                    {{ item.label }}
                    <!-- Effet de soulignement jaune au hover -->
                    <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-pyoh-yellow transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <!-- Point jaune au hover -->
                  <span class="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-pyoh-yellow rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></span>
                </NuxtLink>
              </nav>
            </div>
          </div>

          <!-- Partie droite : Onglets Contact/Calendrier -->
          <div class="w-1/2 h-full flex flex-col">
            <!-- En-tête des onglets -->
            <div class="flex-1 flex items-center justify-center">
              <div class="w-full max-w-2xl mx-auto px-8">
                <div class="text-center mb-8 animate-fade-in-up" style="animation-delay: 0.3s;">
                  <h2 class="text-3xl font-primary text-white mb-4">Contactez-nous</h2>
                  <p class="text-white/70 text-lg font-paragraph">Discutons de votre projet</p>
                </div>

                <!-- Onglets -->
                <div class="flex justify-center space-x-4 mb-8 animate-fade-in-up" style="animation-delay: 0.4s;">
                  <button
                    @click="() => { activeTab = 'contact'; }"
                    class="px-8 py-3 text-lg font-secondary transition-all duration-300 border-b-2 rounded-t-lg relative group"
                    :class="{ 
                      'text-pyoh-yellow border-pyoh-yellow bg-white/5': activeTab === 'contact', 
                      'text-white/60 border-transparent hover:text-white hover:border-white/30 hover:bg-white/5': activeTab !== 'contact' 
                    }"
                  >
                    Contact
                    <!-- Point jaune au hover pour l'onglet actif -->
                    <span 
                      v-if="activeTab === 'contact'"
                      class="absolute -top-1 -right-1 w-3 h-3 bg-pyoh-yellow rounded-full animate-pulse"
                    ></span>
                  </button>
                  <button
                    @click="() => { activeTab = 'calendar'; }"
                    class="px-8 py-3 text-lg font-secondary transition-all duration-300 border-b-2 rounded-t-lg relative group"
                    :class="{ 
                      'text-pyoh-yellow border-pyoh-yellow bg-white/5': activeTab === 'calendar', 
                      'text-white/60 border-transparent hover:text-white hover:border-white/30 hover:bg-white/5': activeTab !== 'calendar' 
                    }"
                  >
                    Rendez-vous
                    <!-- Point jaune au hover pour l'onglet actif -->
                    <span 
                      v-if="activeTab === 'calendar'"
                      class="absolute -top-1 -right-1 w-3 h-3 bg-pyoh-yellow rounded-full animate-pulse"
                    ></span>
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
                    <div class="bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg p-8 shadow-2xl">
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

<script setup>
import { ref, computed } from 'vue'

// Props pour la configuration
const props = defineProps({
  backgroundColor: {
    type: String,
    default: 'black'
  }
})

// État du menu
const isMenuOpen = ref(false)
const activeTab = ref('contact')

// Items de navigation
const menuItems = [
  { path: '/', label: 'Home' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/about', label: 'À propos' },
  { path: '/contact', label: 'Contact' }
]

// Logo dynamique selon la couleur de fond
const logoUrl = computed(() => {
  return props.backgroundColor === 'white' 
    ? '/images/Logos Pyoh-04.png'  // Logo noir pour fond blanc
    : '/images/Logos Pyoh-07.png'  // Logo blanc pour fond noir
})

// Classes conditionnelles basées sur la couleur du fond
const isDarkBackground = computed(() => props.backgroundColor === 'black')

const buttonClasses = computed(() => {
  if (isDarkBackground.value) {
    return `bg-white/20 border-white/30 hover:bg-white/30 ${isMenuOpen.value ? 'bg-white/40' : ''}`
  } else {
    return `bg-black/20 border-black/30 hover:bg-black/30 ${isMenuOpen.value ? 'bg-black/40' : ''}`
  }
})

const lineClasses = computed(() => {
  return isDarkBackground.value ? 'bg-white' : 'bg-black'
})

// Méthodes
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>
.home-navigation {
  position: relative;
  width: 100%;
  height: 100%;
}

.nav-button {
  @apply bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 p-4 rounded-full border border-white/20;
}

.nav-button:hover {
  @apply bg-white/20;
}

.nav-button:disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>

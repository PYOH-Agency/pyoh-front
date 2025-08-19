<template>
  <button
    @click="toggleTheme"
    class="theme-toggle flex items-center justify-center"
    :title="isDark ? 'Passer au mode clair' : 'Passer au mode sombre'"
  >
    <!-- Icône soleil (mode clair) -->
    <svg
      v-if="isDark"
      class="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    
    <!-- Icône lune (mode sombre) -->
    <svg
      v-else
      class="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// État du thème
const isDark = ref(true)

// Fonction pour basculer le thème
const toggleTheme = () => {
  isDark.value = !isDark.value
  updateTheme()
}

// Fonction pour mettre à jour le thème
const updateTheme = () => {
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  
  // Sauvegarder dans le localStorage
  localStorage.setItem('pyoh-theme', theme)
}

// Fonction pour initialiser le thème
const initTheme = () => {
  // Récupérer le thème sauvegardé ou utiliser la préférence système
  const savedTheme = localStorage.getItem('pyoh-theme')
  
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    // Utiliser la préférence système si disponible
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = prefersDark
  }
  
  updateTheme()
}

// Écouter les changements de préférence système
const handleSystemThemeChange = (e: MediaQueryListEvent) => {
  if (!localStorage.getItem('pyoh-theme')) {
    isDark.value = e.matches
    updateTheme()
  }
}

// Initialiser le thème au montage
onMounted(() => {
  initTheme()
  
  // Écouter les changements de préférence système
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', handleSystemThemeChange)
  
  // Cleanup
  return () => {
    mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }
})

// Surveiller les changements de thème pour mettre à jour l'interface
watch(isDark, () => {
  updateTheme()
})
</script>

<style scoped>
/* Styles spécifiques au composant */
.theme-toggle {
  backdrop-filter: blur(10px);
}

.theme-toggle svg {
  transition: transform 0.3s ease;
}

.theme-toggle:hover svg {
  transform: rotate(15deg) scale(1.1);
}
</style>

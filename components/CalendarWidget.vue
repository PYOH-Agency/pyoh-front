<template>
  <div class="space-y-6">
    <!-- En-tête -->
    <div class="text-center">
      <h3 class="text-xl md:text-2xl font-bold text-white mb-2">Prendre rendez-vous</h3>
      <p class="text-sm md:text-base text-white/60">Planifiez un appel de découverte pour votre projet</p>
    </div>

    <!-- Cal.com Widget -->
    <div class="relative bg-white/5 border border-white/10 rounded-lg overflow-hidden">
      <iframe
        src="https://cal.com/paul-bugeon-el1oht/kick-off-de-votre-projet?embed=true&theme=dark"
        width="100%"
        height="350"
        frameborder="0"
        class="cal-iframe w-full"
        title="Prendre rendez-vous avec PYOH"
        style="background: transparent;"
      ></iframe>
      
      <!-- Fallback si l'iframe ne se charge pas -->
      <div v-if="!iframeLoaded" class="text-center py-8">
        <div class="animate-spin w-6 h-6 border-2 border-white/20 border-t-white rounded-full mx-auto mb-3"></div>
        <p class="text-white/60 text-sm">Chargement du calendrier...</p>
        <a 
          href="https://cal.com/paul-bugeon-el1oht/kick-off-de-votre-projet"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-3 inline-block px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors duration-300"
        >
          Ouvrir le calendrier
        </a>
      </div>
    </div>

    <!-- Informations supplémentaires -->
    <div class="text-center text-sm text-white/40">
      <p>Vous recevrez un email de confirmation avec le lien de l'appel</p>
      <p class="mt-1">Questions ? Contactez-nous à contact@pyoh.fr</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const iframeLoaded = ref(false)

// Lifecycle
onMounted(() => {
  // Attendre un peu que le DOM soit prêt
  setTimeout(() => {
    iframeLoaded.value = true
  }, 100)
})
</script>

<style scoped>
/* Styles spécifiques au composant */
.cal-iframe {
  border-radius: 8px;
  background: transparent !important;
  min-height: 350px;
}

/* Personnalisation de l'iframe Cal.com */
:deep(.cal-iframe) {
  background: transparent !important;
}

/* Styles pour l'intégration avec le thème sombre */
:deep(.cal-iframe iframe) {
  background: transparent !important;
  border-radius: 8px;
}

/* Responsive */
@media (max-width: 768px) {
  .cal-iframe {
    height: 400px;
    min-height: 400px;
  }
}

@media (max-width: 480px) {
  .cal-iframe {
    height: 450px;
    min-height: 450px;
  }
}
</style>

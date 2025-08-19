<template>
  <footer class="bg-black border-t border-white/10 py-16">
    <div class="container mx-auto px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        <!-- Logo et description -->
        <div class="lg:col-span-2">
          <div class="mb-6">
            <img src="/images/Logos Pyoh-06.png" alt="PYOH" class="h-20 w-auto" />
          </div>
          <p class="text-white/70 text-lg leading-relaxed max-w-md mb-6">
            Votre vision, notre créativité. Agence de communication visuelle full services qui transforme vos idées en expériences mémorables.
          </p>
          <div class="flex space-x-4">
            <a href="mailto:contact@pyoh.fr" class="text-white/60 hover:text-pyoh-yellow transition-colors duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </a>
            <a href="https://cal.com/paul-bugeon-el1oht/kick-off-de-votre-projet" target="_blank" class="text-white/60 hover:text-pyoh-yellow transition-colors duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </a>
          </div>
        </div>

        <!-- Services -->
        <div>
          <h3 class="text-xl font-bold text-white mb-6">Nos Services</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/portfolio?filter=visual-identity" class="text-white/60 hover:text-pyoh-yellow transition-colors duration-300">
                Identité Visuelle
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/portfolio?filter=video" class="text-white/60 hover:text-pyoh-yellow transition-colors duration-300">
                Production Vidéo
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/portfolio?filter=web" class="text-white/60 hover:text-pyoh-yellow transition-colors duration-300">
                Développement Web
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-white/60 hover:text-pyoh-yellow transition-colors duration-300">
                Stratégie de Contenu
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-xl font-bold text-white mb-6">Contact</h3>
          <ul class="space-y-3">
            <li>
              <a href="mailto:contact@pyoh.fr" class="text-white/60 hover:text-pyoh-yellow transition-colors duration-300 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                contact@pyoh.fr
              </a>
            </li>
            <li>
              <a href="https://cal.com/paul-bugeon-el1oht/kick-off-de-votre-projet" target="_blank" class="text-white/60 hover:text-pyoh-yellow transition-colors duration-300 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Prendre RDV
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Séparateur -->
      <div class="border-t border-white/10 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-white/40 text-sm">
            © {{ new Date().getFullYear() }} PYOH. Tous droits réservés.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <NuxtLink to="/" class="text-white/40 hover:text-pyoh-yellow transition-colors duration-300 text-sm">
              Accueil
            </NuxtLink>
            <NuxtLink to="/portfolio" class="text-white/40 hover:text-pyoh-yellow transition-colors duration-300 text-sm">
              Portfolio
            </NuxtLink>
            <NuxtLink to="/about" class="text-white/40 hover:text-pyoh-yellow transition-colors duration-300 text-sm">
              À propos
            </NuxtLink>
            <NuxtLink to="/contact" class="text-white/40 hover:text-pyoh-yellow transition-colors duration-300 text-sm">
              Contact
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Le composant Footer est automatiquement affiché sur toutes les pages sauf la home
</script>

<style scoped>
/* Hover effects subtils */
a:hover {
  transform: translateY(-1px);
}

/* Transition pour les liens */
a {
  transition: all 0.3s ease;
}
</style>

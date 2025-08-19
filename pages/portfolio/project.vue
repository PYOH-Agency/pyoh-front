<template>
  <div class="min-h-screen bg-white text-gray-900 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-light mb-4">Page projet fixe</h1>
      <p class="text-gray-600 mb-8">Si vous voyez cette page, le routing fonctionne !</p>
      <NuxtLink to="/portfolio" class="px-6 py-3 bg-gray-900 text-white rounded-none hover:bg-gray-800 transition-all duration-300">
        Retour au portfolio
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
console.log('🚀 Page projet fixe chargée !');
</script>

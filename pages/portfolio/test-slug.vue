<template>
  <div class="min-h-screen bg-red-500 text-white flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">🎯 PAGE DE TEST DYNAMIQUE</h1>
      <p class="text-xl mb-4">Cette page fonctionne !</p>
      <p class="text-lg">URL: {{ $route.fullPath }}</p>
      <NuxtLink to="/portfolio" class="mt-4 inline-block px-6 py-3 bg-white text-red-500 font-bold">
        Retour au portfolio
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
console.log('🎯 Page de test chargée !', window.location.href)

useHead({
  title: 'TEST DYNAMIQUE - PYOH'
})
</script>

<template>
  <div class="min-h-screen bg-black text-white">
    <h1 class="text-4xl font-bold text-center py-8">Test du Scroll</h1>
    
    <!-- Instructions -->
    <div class="max-w-2xl mx-auto text-center mb-8 p-6 bg-white/10 rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">Instructions</h2>
      <ul class="text-left space-y-2 text-white/80">
        <li>• Utilisez la molette de votre souris pour naviguer entre les projets</li>
        <li>• Utilisez les flèches gauche/droite du clavier</li>
        <li>• Cliquez sur les indicateurs à droite pour aller directement à un projet</li>
        <li>• Le nom du client et l'année doivent s'afficher en haut à droite de chaque projet</li>
      </ul>
    </div>

    <!-- ProjectSlider de test -->
    <ProjectSlider 
      :projects="testProjects" 
      :auto-play="false"
      :auto-play-interval="6000"
    />
  </div>
</template>

<script setup>
// Configuration de la page
useHead({
  title: 'Test Scroll - PYOH',
  meta: [
    { name: 'description', content: 'Page de test pour le scroll du ProjectSlider' }
  ]
})

// Projets de test
const testProjects = [
  {
    id: 1,
    attributes: {
      title: 'Projet Test 1',
      subtitle: 'Description du premier projet de test',
      category: 'Web',
      client: 'Client Test 1',
      year: 2024,
      media: {
        data: {
          attributes: {
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
            mime: 'image/jpeg'
          }
        }
      }
    }
  },
  {
    id: 2,
    attributes: {
      title: 'Projet Test 2',
      subtitle: 'Description du deuxième projet de test',
      category: 'Design',
      client: 'Client Test 2',
      year: 2023,
      media: {
        data: {
          attributes: {
            url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
            mime: 'image/jpeg'
          }
        }
      }
    }
  },
  {
    id: 3,
    attributes: {
      title: 'Projet Test 3',
      subtitle: 'Description du troisième projet de test',
      category: 'Mobile',
      client: 'Client Test 3',
      year: 2022,
      media: {
        data: {
          attributes: {
            url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
            mime: 'image/jpeg'
          }
        }
      }
    }
  }
]
</script>

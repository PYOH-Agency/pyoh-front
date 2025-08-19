<template>
  <div class="min-h-screen bg-black text-white">
    <h1 class="text-4xl font-bold text-center py-8">Test Client/Année</h1>
    
    <!-- Instructions -->
    <div class="max-w-2xl mx-auto text-center mb-8 p-6 bg-white/10 rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">Instructions</h2>
      <ul class="text-left space-y-2 text-white/80">
        <li>• Le nom du client et l'année doivent s'afficher en bas à droite</li>
        <li>• Utilisez la molette de votre souris pour changer de projet</li>
        <li>• Les informations doivent se mettre à jour automatiquement</li>
        <li>• Si pas de projet, "PYOH Agency" et l'année courante s'affichent</li>
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
  title: 'Test Client - PYOH',
  meta: [
    { name: 'description', content: 'Page de test pour l\'affichage du client et de l\'année' }
  ]
})

// Projets de test avec client et année
const testProjects = [
  {
    id: 1,
    attributes: {
      title: 'Site E-commerce Moderne',
      subtitle: 'Plateforme de vente en ligne avec design responsive et UX optimisée',
      category: 'Web',
      client: 'TechCorp',
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
      title: 'Identité Visuelle Startup',
      subtitle: 'Logo, charte graphique et supports de communication complets',
      category: 'Design',
      client: 'InnovateLab',
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
      title: 'Application Mobile Fitness',
      subtitle: 'App de suivi d\'entraînement avec interface intuitive',
      category: 'Mobile',
      client: 'FitLife',
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

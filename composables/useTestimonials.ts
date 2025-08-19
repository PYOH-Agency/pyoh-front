import { ref } from 'vue'

export interface Testimonial {
  id: number
  name: string
  client: string
  testimonial: string
  featured?: boolean
  createdAt: string
  updatedAt: string
}

export const useTestimonials = () => {
  const testimonials = ref<Testimonial[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Récupération de tous les témoignages
  const fetchTestimonials = async () => {
    try {
      loading.value = true
      error.value = null

      const config = useRuntimeConfig()
      const response = await $fetch(`${config.public.strapiUrl}/api/testimonials?populate=*&sort=createdAt:desc`)
      
      if (response.data) {
        testimonials.value = response.data.map((item: any) => ({
          id: item.id,
          name: item.name || 'Client',
          client: item.client || 'Entreprise',
          testimonial: item.testimonial || 'Témoignage manquant',
          featured: item.featured || false,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }))
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des témoignages:', err)
      error.value = 'Erreur lors de la récupération des témoignages'
      
      // Témoignages de démonstration si Strapi n'est pas disponible
      testimonials.value = getDemoTestimonials()
    } finally {
      loading.value = false
    }
  }

  // Récupération des témoignages mis en avant
  const fetchFeaturedTestimonials = async () => {
    try {
      loading.value = true
      error.value = null

      const config = useRuntimeConfig()
      
      // Utiliser l'endpoint simple sans filtres complexes
      console.log('🔍 Récupération des témoignages...')
      const response = await $fetch(`${config.public.strapiUrl}/api/testimonials?populate=*&sort=id:desc`)
      console.log('🔍 Réponse testimonials:', response)
      
      if (response.data) {
        testimonials.value = response.data.map((item: any) => ({
          id: item.id,
          name: item.name || 'Client',
          client: item.client || 'Entreprise',
          testimonial: item.testimonial || 'Témoignage manquant',
          featured: false, // Pas de champ featured dans votre structure
          createdAt: item.createdAt || item.CREATEDAT,
          updatedAt: item.updatedAt
        }))
      }
    } catch (err: any) {
      console.error('Erreur lors de la récupération des témoignages:', err)
      console.log('🔍 Détails de l\'erreur:', {
        status: err.status,
        statusCode: err.statusCode,
        message: err.message,
        data: err.data
      })
      
      // En cas d'erreur, utiliser les témoignages de démonstration
      testimonials.value = getDemoTestimonials()
      error.value = null
    } finally {
      loading.value = false
    }
  }

  // Témoignages de démonstration
  const getDemoTestimonials = (): Testimonial[] => [
    {
      id: 1,
      name: 'Marie Dubois',
      client: 'StartupTech',
      testimonial: 'PYOH a transformé notre vision en une identité visuelle exceptionnelle. Leur approche créative et leur expertise technique ont dépassé nos attentes. Un partenaire de confiance pour tous nos projets !',
      featured: true,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 2,
      name: 'Thomas Martin',
      client: 'EcoSolutions',
      testimonial: 'L\'équipe PYOH a créé un site web moderne et performant qui reflète parfaitement nos valeurs écologiques. Leur créativité et leur professionnalisme sont remarquables.',
      featured: true,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      client: 'ArtGallery',
      testimonial: 'Grâce à PYOH, notre galerie d\'art a maintenant une présence en ligne magnifique. Leur compréhension de l\'art et leur sens du design sont exceptionnels.',
      featured: true,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
  ]

  return {
    // État
    testimonials,
    loading,
    error,

    // Actions
    fetchTestimonials,
    fetchFeaturedTestimonials
  }
}

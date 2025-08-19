import { ref, computed } from 'vue'
import { useStrapi } from '#imports'
import type { Project, ProjectsResponse } from '~/types/project'

export const useProjects = () => {
  const { find, findOne } = useStrapi()
  
  // État réactif
  const projects = ref<Project[]>([])
  const featuredProjects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Récupération de tous les projets
  const fetchProjects = async (options?: {
    populate?: string[]
    sort?: string[]
    filters?: Record<string, any>
    pagination?: {
      page: number
      pageSize: number
    }
  }) => {
    try {
      loading.value = true
      error.value = null

      const response = await find<ProjectsResponse>('projects', {
        populate: options?.populate || ['media'],
        sort: options?.sort || ['createdAt:desc'],
        filters: options?.filters || {},
        pagination: options?.pagination || { page: 1, pageSize: 100 }
      })

      projects.value = response.data || []
    } catch (err) {
      console.error('Erreur lors de la récupération des projets:', err)
      error.value = 'Erreur lors de la récupération des projets'
      
      // Projets de démonstration si Strapi n'est pas disponible
      projects.value = getDemoProjects()
    } finally {
      loading.value = false
    }
  }

  // Récupération des projets mis en avant
  const fetchFeaturedProjects = async () => {
    try {
      loading.value = true
      error.value = null

      const config = useRuntimeConfig()
      const strapiUrl = config.public.strapiUrl || 'http://localhost:1337'
      
      // Essayer avec $fetch directement
      const url = `${strapiUrl}/api/projects?populate=*&filters[featured][$eq]=true&sort=createdAt:desc&pagination[pageSize]=10`
      
      const response = await $fetch(url)
      
      if (response.data && response.data.length > 0) {
        // Adapter la structure des données pour qu'elle corresponde à notre interface
        featuredProjects.value = response.data.map(item => ({
          id: item.id,
          attributes: {
            title: item.title,
            subtitle: item.subtitle,
            category: item.type || 'Projet', // Utiliser 'type' comme catégorie
            client: item.client,
            year: item.year,
            featured: item.featured,
            projectUrl: item.projectUrl,
            media: item.media && item.media.length > 0 ? {
              data: {
                id: item.media[0].id,
                attributes: {
                  url: item.media[0].url,
                  name: item.media[0].name || item.title,
                  width: item.media[0].width,
                  height: item.media[0].height,
                  ext: item.media[0].ext,
                  mime: item.media[0].mime
                }
              }
            } : null,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
          }
        }))
        
        console.log('🔄 Projets transformés:', featuredProjects.value)
        

      } else {

        
        // Si aucun projet featured, récupérer les 3 premiers projets
        const allUrl = `${strapiUrl}/api/projects?populate=*&sort=createdAt:desc&pagination[pageSize]=3`
        const allResponse = await $fetch(allUrl)
        
        if (allResponse.data && allResponse.data.length > 0) {
          featuredProjects.value = allResponse.data.map(item => ({
            id: item.id,
            attributes: {
              title: item.title,
              subtitle: item.subtitle,
              category: item.type || 'Projet',
              client: item.client,
              year: item.year,
              featured: item.featured,
              projectUrl: item.projectUrl,
              media: item.media && item.media.length > 0 ? {
                data: {
                  id: item.media[0].id,
                  attributes: {
                    url: item.media[0].url,
                    name: item.media[0].name || item.title,
                    width: item.media[0].width,
                    height: item.media[0].height,
                    ext: item.media[0].ext,
                    mime: item.media[0].mime
                  }
                }
              } : null,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt
            }
          }))
        }
        

      }
      
      // Fallback vers les projets de démo si vraiment rien n'est trouvé
      if (featuredProjects.value.length === 0) {

        featuredProjects.value = getDemoProjects().slice(0, 3)
      }
      

      
    } catch (err) {
      console.error('❌ Erreur Strapi:', err)
      error.value = 'Erreur lors de la récupération des projets'
      
      // Projets de démonstration en cas d'erreur
      
      featuredProjects.value = getDemoProjects().slice(0, 3)
    } finally {
      loading.value = false
    }
  }

  // Récupération d'un projet par ID
  const fetchProject = async (id: number | string) => {
    try {
      loading.value = true
      error.value = null

      const response = await findOne<Project>('projects', id, {
        populate: ['media']
      })

      return response
    } catch (err) {
      console.error('Erreur lors de la récupération du projet:', err)
      error.value = 'Erreur lors de la récupération du projet'
      return null
    } finally {
      loading.value = false
    }
  }

  // Filtrage des projets par catégorie
  const getProjectsByCategory = (category: string) => {
    return computed(() => 
      projects.value.filter(project => 
        project.attributes.category === category
      )
    )
  }

  // Récupération des catégories uniques
  const getUniqueCategories = () => {
    return computed(() => {
      const categories = projects.value.map(project => project.attributes.category)
      return [...new Set(categories)]
    })
  }

  // Recherche de projets
  const searchProjects = (query: string) => {
    if (!query.trim()) return projects.value
    
    const searchTerm = query.toLowerCase()
    return projects.value.filter(project => 
      project.attributes.title.toLowerCase().includes(searchTerm) ||
      project.attributes.subtitle.toLowerCase().includes(searchTerm) ||
      project.attributes.description?.toLowerCase().includes(searchTerm) ||
      project.attributes.category.toLowerCase().includes(searchTerm)
    )
  }

  // Projets de démonstration
  const getDemoProjects = (): Project[] => [
    {
      id: 1,
      attributes: {
        title: 'Site E-commerce Moderne',
        subtitle: 'Plateforme de vente en ligne avec design responsive et UX optimisée',
        category: 'Web Design',
        year: 2024,
        client: 'TechCorp',
        description: 'Création d\'un site e-commerce moderne avec une interface utilisateur intuitive et un design responsive. Le projet inclut la gestion des produits, le panier d\'achat, et un système de paiement sécurisé.',
        technologies: ['Vue.js', 'Node.js', 'Stripe', 'MongoDB'],
        projectUrl: 'https://example.com',
        featured: true,
        media: { 
          data: { 
            id: 1,
            attributes: { 
              url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
              name: 'E-commerce Project',
              width: 800,
              height: 600,
              hash: 'demo1',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 100000,
              provider: 'local',
              createdAt: '2024-01-01T00:00:00.000Z',
              updatedAt: '2024-01-01T00:00:00.000Z'
            }
          }
        },
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z'
      }
    },
    {
      id: 2,
      attributes: {
        title: 'Identité Visuelle Startup',
        subtitle: 'Logo, charte graphique et supports de communication complets',
        category: 'Branding',
        year: 2024,
        client: 'InnovateLab',
        description: 'Développement complet de l\'identité visuelle d\'une startup innovante. Création du logo, de la charte graphique, et de tous les supports de communication nécessaires.',
        technologies: ['Adobe Illustrator', 'Photoshop', 'InDesign'],
        featured: true,
        media: { 
          data: { 
            id: 2,
            attributes: { 
              url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
              name: 'Branding Project',
              width: 800,
              height: 600,
              hash: 'demo2',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 100000,
              provider: 'local',
              createdAt: '2024-01-01T00:00:00.000Z',
              updatedAt: '2024-01-01T00:00:00.000Z'
            }
          }
        },
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z'
      }
    },
    {
      id: 3,
      attributes: {
        title: 'Application Mobile Fitness',
        subtitle: 'App de suivi d\'entraînement avec interface intuitive',
        category: 'Mobile App',
        year: 2023,
        client: 'FitLife',
        description: 'Application mobile de suivi d\'entraînement avec une interface utilisateur intuitive et des fonctionnalités avancées de suivi des performances.',
        technologies: ['React Native', 'Firebase', 'Node.js'],
        projectUrl: 'https://play.google.com/store/apps/details?id=com.fitlife',
        featured: true,
        media: { 
          data: { 
            id: 3,
            attributes: { 
              url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
              name: 'Mobile App Project',
              width: 800,
              height: 600,
              hash: 'demo3',
              ext: '.jpg',
              mime: 'image/jpeg',
              size: 100000,
              provider: 'local',
              createdAt: '2024-01-01T00:00:00.000Z',
              updatedAt: '2024-01-01T00:00:00.000Z'
            }
          }
        },
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        publishedAt: '2024-01-01T00:00:00.000Z'
      }
    }
  ]

  // Utilitaires
  const getStrapiMediaUrl = (url: string) => {
    if (url.startsWith('http')) return url
    const config = useRuntimeConfig()
    return `${config.public.strapiUrl}${url}`
  }

  return {
    // État
    projects,
    featuredProjects,
    loading,
    error,
    
    // Actions
    fetchProjects,
    fetchFeaturedProjects,
    fetchProject,
    
    // Getters
    getProjectsByCategory,
    getUniqueCategories,
    searchProjects,
    
    // Utilitaires
    getStrapiMediaUrl
  }
}

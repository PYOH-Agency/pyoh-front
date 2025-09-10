import { ref, computed } from 'vue'
import { useStrapi } from '#imports'

export interface ProjectType {
  id: number
  label: string
  color?: string
  description?: string
  slug?: string
}

export interface ProjectTypesResponse {
  data: ProjectType[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export const useProjectTypes = () => {
  const { find } = useStrapi()
  
  // État réactif
  const projectTypes = ref<ProjectType[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Récupération de tous les types de projets
  const fetchProjectTypes = async (options?: {
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

      const response = await find<ProjectTypesResponse>('project-types', {
        populate: options?.populate || ['*'],
        sort: options?.sort || ['label:asc'],
        filters: options?.filters || {},
        pagination: options?.pagination || { page: 1, pageSize: 100 }
      })

      projectTypes.value = response.data || []
    } catch (err) {
      console.error('Erreur lors de la récupération des types de projets:', err)
      error.value = 'Erreur lors de la récupération des types de projets'
      
      // Types de projets de démonstration si Strapi n'est pas disponible
      projectTypes.value = getDemoProjectTypes()
    } finally {
      loading.value = false
    }
  }

  // Récupération d'un type de projet par ID
  const fetchProjectType = async (id: number | string) => {
    try {
      loading.value = true
      error.value = null

      const response = await find<ProjectType>('project-types', {
        filters: { id: { $eq: id } },
        populate: ['*']
      })

      return response.data?.[0] || null
    } catch (err) {
      console.error('Erreur lors de la récupération du type de projet:', err)
      error.value = 'Erreur lors de la récupération du type de projet'
      return null
    } finally {
      loading.value = false
    }
  }

  // Récupération d'un type de projet par slug
  const fetchProjectTypeBySlug = async (slug: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await find<ProjectType>('project-types', {
        filters: { slug: { $eq: slug } },
        populate: ['*']
      })

      return response.data?.[0] || null
    } catch (err) {
      console.error('Erreur lors de la récupération du type de projet par slug:', err)
      error.value = 'Erreur lors de la récupération du type de projet'
      return null
    } finally {
      loading.value = false
    }
  }

  // Filtrage des types de projets
  const getProjectTypesByFilter = (filter: (type: ProjectType) => boolean) => {
    return computed(() => 
      projectTypes.value.filter(filter)
    )
  }

  // Recherche de types de projets
  const searchProjectTypes = (query: string) => {
    return computed(() => 
      projectTypes.value.filter(type => 
        type.label.toLowerCase().includes(query.toLowerCase()) ||
        (type.description && type.description.toLowerCase().includes(query.toLowerCase()))
      )
    )
  }

  // Types de projets de démonstration
  const getDemoProjectTypes = (): ProjectType[] => {
    return [
      { 
        id: 1, 
        label: 'Identité Visuelle', 
        color: '#fddb00',
        description: 'Création d\'identité visuelle complète',
        slug: 'identite-visuelle'
      },
      { 
        id: 2, 
        label: 'Vidéo', 
        color: '#ff6b6b',
        description: 'Production vidéo et motion design',
        slug: 'video'
      },
      { 
        id: 3, 
        label: 'Web', 
        color: '#4ecdc4',
        description: 'Développement web et applications',
        slug: 'web'
      },
      { 
        id: 4, 
        label: 'Print', 
        color: '#9b59b6',
        description: 'Design print et édition',
        slug: 'print'
      },
      { 
        id: 5, 
        label: 'Branding', 
        color: '#e67e22',
        description: 'Stratégie de marque et communication',
        slug: 'branding'
      }
    ]
  }

  // Tabs pour les filtres (format compatible avec AppTab)
  const getFilterTabs = () => {
    return computed(() => {
      const tabs = [
        { label: 'Tous', value: 'all' }
      ]
      
      if (projectTypes.value && projectTypes.value.length > 0) {
        projectTypes.value.forEach(type => {
          tabs.push({
            label: type.label,
            value: type.label,
            color: type.color,
            description: type.description
          })
        })
      }
      
      return tabs
    })
  }

  return {
    // État
    projectTypes,
    loading,
    error,
    
    // Méthodes
    fetchProjectTypes,
    fetchProjectType,
    fetchProjectTypeBySlug,
    getProjectTypesByFilter,
    searchProjectTypes,
    getFilterTabs,
    
    // Utilitaires
    getDemoProjectTypes
  }
}

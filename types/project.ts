export interface StrapiMedia {
  data: {
    id: number
    attributes: {
      name: string
      alternativeText?: string
      caption?: string
      width: number
      height: number
      formats?: {
        thumbnail?: StrapiMediaFormat
        small?: StrapiMediaFormat
        medium?: StrapiMediaFormat
        large?: StrapiMediaFormat
      }
      hash: string
      ext: string
      mime: string
      size: number
      url: string
      previewUrl?: string
      provider: string
      project_types?: any[]
      provider_metadata?: any
      createdAt: string
      updatedAt: string
    }
  }
}

export interface StrapiMediaFormat {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  url: string
}

export interface ProjectType {
  id: number
  attributes: {
    name: string
    label: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface Project {
  id: number
  attributes: {
    title: string
    subtitle: string
    description?: string
    category: string
    client?: string
    year?: number
    technologies?: string[]
    projectUrl?: string
    featured?: boolean
    colorTheme?: string
    order?: number
    media?: StrapiMedia
    project_types?: {
      data: ProjectType[]
    }
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface ProjectsResponse extends StrapiResponse<Project[]> {}
export interface ProjectResponse extends StrapiResponse<Project> {}

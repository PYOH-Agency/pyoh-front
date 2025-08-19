// Types globaux pour PYOH Website

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Types pour les composants
declare global {
  interface Window {
    gsap: any
  }
}

// Types pour les modules
declare module 'gsap' {
  export const gsap: any
  export const TimelineMax: any
  export const TweenMax: any
}

// Types pour les composables
declare module '#imports' {
  export const useStrapi: () => {
    find: (collection: string, options?: any) => Promise<any>
    findOne: (collection: string, id: string | number, options?: any) => Promise<any>
    create: (collection: string, data: any) => Promise<any>
    update: (collection: string, id: string | number, data: any) => Promise<any>
    delete: (collection: string, id: string | number) => Promise<any>
  }
  
  export const useRuntimeConfig: () => {
    public: {
      strapiUrl: string
      strapiToken: string
      [key: string]: any
    }
  }
  
  export const useHead: (options: any) => void
  export const navigateTo: (path: string) => void
}

// Types pour les composants Vue
declare module 'vue' {
  interface ComponentCustomProperties {
    $strapi: any
  }
}

export {}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/strapi',
    '@pinia/nuxt'
  ],

  plugins: [
    '~/plugins/vercel-analytics.client.ts',
    '~/plugins/vercel-analytics.server.ts'
  ],

  // Configuration des métadonnées et du favicon
  app: {
    head: {
      title: 'PYOH - Agence Créative',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'PYOH est une agence de communication visuelle full services. Identité visuelle, web design, vidéo et stratégie de contenu.' },
        { name: 'theme-color', content: '#fddb00' },
        { name: 'msapplication-TileColor', content: '#000000' },
        { name: 'msapplication-config', content: '/browserconfig.xml' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon.png' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },

  strapi: {
    url: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  },

  runtimeConfig: {
    public: {
      strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
    }
  },

  // Configuration minimale pour éviter les problèmes
  nitro: {
    experimental: {
      wasm: false
    }
  },

  vite: {
    optimizeDeps: {
      exclude: ['@nuxtjs/strapi']
    }
  }
})


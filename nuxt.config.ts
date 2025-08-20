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


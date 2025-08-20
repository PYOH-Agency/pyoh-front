import { track } from '@vercel/analytics'

export const useVercelAnalytics = () => {
  // Fonction pour tracker des événements personnalisés
  const trackEvent = (name: string, properties?: Record<string, any>) => {
    if (process.client) {
      track(name, properties)
    }
  }

  // Fonction pour tracker les vues de page
  const trackPageView = (page: string) => {
    trackEvent('page_view', { page })
  }

  // Fonction pour tracker les interactions utilisateur
  const trackInteraction = (action: string, element: string, properties?: Record<string, any>) => {
    trackEvent('user_interaction', {
      action,
      element,
      ...properties
    })
  }

  // Fonction pour tracker les conversions
  const trackConversion = (type: string, value?: number) => {
    trackEvent('conversion', {
      type,
      value
    })
  }

  return {
    trackEvent,
    trackPageView,
    trackInteraction,
    trackConversion
  }
}

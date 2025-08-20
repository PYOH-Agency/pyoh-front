# 📊 Vercel Analytics - Documentation

## 🚀 Installation et Configuration

Vercel Analytics est maintenant intégré au projet PYOH Website pour suivre les performances et l'utilisation du site.

### 📦 Packages installés
- `@vercel/analytics` : Package principal pour la collecte de métriques

### 🔌 Plugins configurés
- `plugins/vercel-analytics.client.ts` : Plugin client pour l'injection automatique
- `plugins/vercel-analytics.server.ts` : Plugin serveur pour la collecte côté serveur

### 🎯 Fonctionnalités automatiques
- **Web Vitals** : Core Web Vitals (LCP, FID, CLS)
- **Métriques de performance** : Temps de chargement, First Paint, etc.
- **Géolocalisation** : Pays, ville des visiteurs
- **Appareils** : Desktop, mobile, tablet
- **Navigateurs** : Chrome, Safari, Firefox, etc.
- **Systèmes d'exploitation** : Windows, macOS, iOS, Android

## 📱 Utilisation

### 🔍 Tracking automatique
Vercel Analytics collecte automatiquement :
- Vues de pages
- Temps passé sur chaque page
- Sources de trafic
- Métriques de performance

### 🎯 Tracking personnalisé
Utilisez le composable `useVercelAnalytics` pour des événements personnalisés :

```typescript
// Dans un composant Vue
const { trackEvent, trackInteraction, trackConversion } = useVercelAnalytics()

// Tracker un clic sur un bouton
trackInteraction('click', 'cta_button', { page: 'home' })

// Tracker une conversion
trackConversion('contact_form_submit')

// Tracker un événement personnalisé
trackEvent('project_view', { project_id: '123', category: 'video' })
```

## 📊 Dashboard Vercel

### 🔗 Accès
- Connectez-vous à [vercel.com](https://vercel.com)
- Sélectionnez votre projet `pyoh-website`
- Cliquez sur l'onglet "Analytics"

### 📈 Métriques disponibles
- **Visiteurs** : Nombre de visiteurs uniques
- **Vues de pages** : Total des pages vues
- **Temps moyen** : Temps passé sur le site
- **Taux de rebond** : Pourcentage de visiteurs qui quittent
- **Top pages** : Pages les plus visitées
- **Sources de trafic** : D'où viennent vos visiteurs

## 🎨 Personnalisation

### 🏷️ Événements recommandés à tracker
```typescript
// Navigation
trackInteraction('menu_open', 'navigation')
trackInteraction('menu_close', 'navigation')

// Portfolio
trackInteraction('project_click', 'portfolio_card', { project_id: '123' })
trackInteraction('filter_change', 'portfolio_filter', { filter: 'video' })

// Contact
trackInteraction('contact_form_start', 'contact_form')
trackConversion('contact_form_submit')

// Cal.com
trackInteraction('calendar_open', 'cal_button')
trackConversion('meeting_booked')
```

### 🌍 Variables d'environnement
Aucune configuration supplémentaire n'est nécessaire. Vercel détecte automatiquement votre projet.

## 📱 Intégration avec d'autres outils

### 🔗 Compatibilité
- **Sentry** : Compatible avec Vercel Analytics
- **Google Analytics** : Peut être utilisé en parallèle
- **Hotjar** : Compatible pour l'analyse comportementale

### 📊 Export des données
- **API Vercel** : Accès programmatique aux données
- **Webhooks** : Notifications en temps réel
- **CSV Export** : Export manuel des données

## 🚀 Déploiement

### ✅ Vérification
Après déploiement, vérifiez que :
1. Les métriques apparaissent dans le dashboard Vercel
2. Aucune erreur dans la console du navigateur
3. Les événements personnalisés sont bien trackés

### 🔍 Debug
En mode développement, utilisez la console pour vérifier :
```javascript
// Dans la console du navigateur
window.va // Devrait retourner l'objet Vercel Analytics
```

## 📚 Ressources

- [Documentation officielle Vercel Analytics](https://vercel.com/docs/analytics)
- [Guide des métriques Web Vitals](https://web.dev/vitals/)
- [API Reference](https://vercel.com/docs/analytics/api)

---

**Note** : Vercel Analytics respecte le RGPD et n'utilise pas de cookies tiers. Les données sont anonymisées par défaut.

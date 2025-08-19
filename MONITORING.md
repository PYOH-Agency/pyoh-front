# 🚀 Guide de Configuration du Monitoring

Ce template inclut un système de monitoring complet avec Sentry, Uptime Robot et Grafana.

## 📋 Prérequis

- Node.js 18+ et npm/yarn
- Compte Sentry (gratuit)
- Compte Uptime Robot (gratuit)
- Instance Grafana (locale ou cloud)

## 🔧 Installation et Configuration

### 1. **Installation des dépendances**

```bash
npm install
```

### 2. **Configuration Sentry (Automatique)**

Exécutez le wizard Sentry dans votre projet :

```bash
npx @sentry/wizard@latest -i nuxt --saas --org pyoh --project votre-projet
```

Le wizard va :
- Installer le SDK Sentry
- Configurer les fichiers `sentry.client.config.ts` et `sentry.server.config.ts`
- Créer la configuration Nuxt

### 3. **Configuration des variables d'environnement**

Copiez `env.example` vers `.env` et configurez :

```bash
# Sentry
NUXT_PUBLIC_SENTRY_DSN=https://votre-dsn@sentry.io/project-id
NUXT_PUBLIC_SENTRY_ENVIRONMENT=production
NUXT_PUBLIC_SENTRY_RELEASE=1.0.0

# Uptime Robot
NUXT_PUBLIC_UPTIME_ROBOT_API_KEY=votre_api_key
NUXT_PUBLIC_UPTIME_ROBOT_MONITOR_ID=votre_monitor_id

# Grafana
NUXT_PUBLIC_GRAFANA_URL=http://localhost:3000
NUXT_PUBLIC_GRAFANA_API_KEY=votre_api_key
```

### 4. **Test de l'intégration**

Lancez votre application et visitez `/sentry-test` pour tester :

```bash
npm run dev
```

Puis allez sur `http://localhost:3000/sentry-test`

## 🎯 Fonctionnalités du Monitoring

### **Sentry - Suivi des Erreurs**
- ✅ Capture automatique des erreurs JavaScript
- ✅ Monitoring des performances (Web Vitals)
- ✅ Session replay pour reproduire les bugs
- ✅ Breadcrumbs pour tracer les actions utilisateur
- ✅ Intégration native avec Nuxt 3

### **Uptime Robot - Disponibilité**
- ✅ Vérification de la disponibilité du site
- ✅ Alertes automatiques en cas de problème
- ✅ Intégration avec le dashboard de monitoring

### **Grafana - Visualisation**
- ✅ Dashboard centralisé de toutes les métriques
- ✅ Visualisation des performances
- ✅ Suivi des erreurs en temps réel
- ✅ Alertes personnalisables

## 📊 Utilisation dans votre Code

### **Composable de Monitoring**

```typescript
// Dans vos composants
const { 
  initializeMonitoring, 
  trackError, 
  trackPerformance 
} = useMonitoring()

// Initialiser le monitoring
onMounted(() => {
  initializeMonitoring()
})

// Tracker une erreur
const handleError = (error: Error) => {
  trackError(error, {
    context: 'user-action',
    userId: user.id
  })
}
```

### **Monitoring des Performances**

```typescript
// Tracker les métriques de performance
const trackPagePerformance = () => {
  if ('performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    trackPerformance({
      pageLoadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0
    })
  }
}
```

## 🧪 Tests et Vérification

### **Test Sentry**

1. Visitez `/sentry-test`
2. Cliquez sur "Test Error" pour déclencher une erreur
3. Vérifiez que l'erreur apparaît dans votre dashboard Sentry

### **Vérification Uptime Robot**

1. Configurez votre monitor dans Uptime Robot
2. Vérifiez que les pings arrivent correctement
3. Testez les alertes en arrêtant temporairement votre serveur

### **Vérification Grafana**

1. Accédez à votre instance Grafana
2. Vérifiez que les métriques sont collectées
3. Testez les alertes et notifications

## 🔍 Dépannage

### **Sentry ne fonctionne pas**

1. Vérifiez que votre DSN est correct
2. Assurez-vous que l'environnement est configuré
3. Vérifiez les erreurs dans la console du navigateur
4. Consultez la [documentation Sentry](https://docs.sentry.io/platforms/javascript/)

### **Uptime Robot ne répond pas**

1. Vérifiez votre clé API
2. Assurez-vous que l'URL du monitor est correcte
3. Vérifiez les logs de votre serveur

### **Grafana n'affiche pas de données**

1. Vérifiez la configuration de la source de données
2. Assurez-vous que les métriques sont envoyées
3. Vérifiez les permissions d'accès

## 📚 Ressources

- [Documentation Sentry](https://docs.sentry.io/platforms/javascript/)
- [Documentation Uptime Robot](https://uptimerobot.com/api/)
- [Documentation Grafana](https://grafana.com/docs/)
- [Nuxt 3 Monitoring](https://nuxt.com/docs/guide/concepts/auto-imports#monitoring)

## 🚀 Déploiement

### **Variables de Production**

Assurez-vous de configurer ces variables dans votre plateforme de déploiement :

```bash
NODE_ENV=production
NUXT_PUBLIC_SENTRY_DSN=votre_dsn_production
NUXT_PUBLIC_SENTRY_ENVIRONMENT=production
NUXT_PUBLIC_UPTIME_ROBOT_API_KEY=votre_api_key_production
NUXT_PUBLIC_GRAFANA_URL=votre_url_grafana_production
```

### **Vérification Post-Déploiement**

1. Testez le monitoring sur l'environnement de production
2. Vérifiez que les métriques sont collectées
3. Testez les alertes et notifications
4. Validez la configuration Sentry

---

**Note :** Ce template est configuré pour fonctionner sans analytics tiers, se concentrant uniquement sur le monitoring des erreurs, des performances et de la disponibilité.

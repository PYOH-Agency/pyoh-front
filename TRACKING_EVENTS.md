# 📊 Événements Vercel Analytics Trackés

## 🎯 **Cal.com Events**

### **📅 Ouverture du calendrier**
- **Événement** : `calendar_open`
- **Propriétés** :
  - `source`: "floating_button"
  - `page`: Page actuelle
  - `timestamp`: Horodatage

### **📝 Réservation de rendez-vous**
- **Événement** : `meeting_booked`
- **Propriétés** :
  - `source`: "floating_button"
  - `page`: Page actuelle
  - `timestamp`: Horodatage

### **🖱️ Interactions Cal.com**
- **Événement** : `click`
- **Élément** : `cal_floating_button`
- **Propriétés** :
  - `page`: Page actuelle

---

## 📧 **Contact Form Events**

### **🚀 Début de remplissage**
- **Événement** : `contact_form_start`
- **Propriétés** :
  - `form_type`: "main_contact"
  - `page`: Page actuelle

### **✅ Soumission du formulaire**
- **Événement** : `contact_form_submit` (Conversion)
- **Propriétés** :
  - `form_type`: "main_contact"
  - `project_type`: Type de projet sélectionné
  - `has_phone`: Présence d'un numéro de téléphone
  - `page`: Page actuelle

### **❌ Erreurs du formulaire**
- **Événement** : `contact_form_error`
- **Propriétés** :
  - `error`: Message d'erreur
  - `form_type`: "main_contact"
  - `page`: Page actuelle

### **🖱️ Interactions avec les champs**
- **Événement** : `field_interaction`
- **Élément** : Nom du champ
- **Propriétés** :
  - `form_type`: "main_contact"
  - `action`: Action effectuée

---

## 🧭 **Navigation Events**

### **🍔 Ouverture du menu**
- **Événement** : `click`
- **Élément** : `menu_open`
- **Propriétés** :
  - `page`: Page actuelle
  - `timestamp`: Horodatage

### **❌ Fermeture du menu**
- **Événement** : `click`
- **Élément** : `menu_close`
- **Propriétés** :
  - `page`: Page actuelle
  - `timestamp`: Horodatage

### **🔗 Clics sur les liens de navigation**
- **Événement** : `click`
- **Élément** : `navigation_link`
- **Propriétés** :
  - `link`: Label du lien (Home, Portfolio, À propos, Contact)
  - `page`: Page actuelle
  - `timestamp`: Horodatage

### **📑 Changements d'onglets**
- **Événement** : `click`
- **Élément** : `tab_change`
- **Propriétés** :
  - `tab`: Onglet sélectionné (contact, calendar)
  - `page`: Page actuelle
  - `timestamp`: Horodatage

---

## 📈 **Métriques automatiques collectées**

### **🌐 Web Vitals**
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)

### **📱 Informations utilisateur**
- **Géolocalisation** : Pays, ville
- **Appareil** : Desktop, mobile, tablet
- **Navigateur** : Chrome, Safari, Firefox, etc.
- **OS** : Windows, macOS, iOS, Android

### **📊 Performance**
- **Temps de chargement** des pages
- **First Paint** et **First Contentful Paint**
- **Temps de réponse** du serveur

---

## 🎨 **Utilisation dans le code**

### **Composable Vercel Analytics**
```typescript
const { trackEvent, trackInteraction, trackConversion } = useVercelAnalytics();

// Événement personnalisé
trackEvent('custom_event', { property: 'value' });

// Interaction utilisateur
trackInteraction('click', 'button_name', { page: '/home' });

// Conversion
trackConversion('form_submit');
```

### **Exemple d'implémentation**
```typescript
// Dans un composant Vue
const handleButtonClick = () => {
  const { trackInteraction } = useVercelAnalytics();
  
  trackInteraction('click', 'cta_button', {
    page: route.path,
    button_text: 'En savoir plus'
  });
};
```

---

## 📊 **Dashboard Vercel**

### **🔗 Accès**
- **URL** : [vercel.com](https://vercel.com)
- **Projet** : `pyoh-website`
- **Onglet** : Analytics

### **📈 Métriques disponibles**
- **Visiteurs** : Nombre de visiteurs uniques
- **Vues de pages** : Total des pages vues
- **Temps moyen** : Temps passé sur le site
- **Taux de rebond** : Pourcentage de visiteurs qui quittent
- **Top pages** : Pages les plus visitées
- **Sources de trafic** : D'où viennent vos visiteurs

### **🎯 Événements personnalisés**
- **Cal.com** : Ouvertures et réservations
- **Contact** : Débuts, soumissions, erreurs
- **Navigation** : Ouvertures, fermetures, clics
- **Interactions** : Clics sur les éléments clés

---

## 🚀 **Prochaines étapes recommandées**

### **📊 Tracking avancé**
- **Portfolio** : Clics sur les projets, filtres utilisés
- **À propos** : Temps passé sur chaque section
- **Footer** : Clics sur les liens sociaux
- **Scroll** : Profondeur de scroll par page

### **🎯 Funnels de conversion**
- **Contact** : Début → Remplissage → Soumission
- **Cal.com** : Ouverture → Navigation → Réservation
- **Navigation** : Ouverture → Clic → Navigation

### **📱 A/B Testing**
- **Boutons** : Différents textes et couleurs
- **Formulaires** : Différentes longueurs
- **Navigation** : Différents layouts

---

**Note** : Tous les événements respectent le RGPD et n'utilisent pas de cookies tiers. Les données sont anonymisées par défaut.

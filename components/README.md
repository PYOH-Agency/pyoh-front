# Kit de Composants PYOH

Ce dossier contient tous les composants réutilisables de l'application PYOH.

## 🖼️ Composants de Galerie

### ImageGallery
Galerie d'images avec skeleton loader et scroll infini.

**Props :**
- `images` (Array) : Tableau des images à afficher
- `loading` (Boolean) : État de chargement
- `imagesPerPage` (Number) : Nombre d'images par page (défaut: 10)
- `strapiUrl` (String) : URL de base Strapi (optionnel)

**Events :**
- `imageClick` : Émis quand une image est cliquée

**Fonctionnalités :**
- ✅ Skeleton loader pendant le chargement
- ✅ Pagination automatique (10 images par page)
- ✅ Scroll infini automatique
- ✅ Effet maçonnerie avec CSS Grid
- ✅ Hover effects et transitions
- ✅ Responsive design

### VideoGallery
Galerie de vidéos avec vignettes cliquables.

**Props :**
- `videos` (Array) : Tableau des vidéos à afficher

**Events :**
- `videoClick` : Émis quand une vidéo est cliquée

**Fonctionnalités :**
- ✅ Vignettes avec overlay play
- ✅ Hover effects avec couleur PYOH
- ✅ Design responsive
- ✅ Message si aucune vidéo

### VideoViewer
Visionneuse vidéo plein écran avec navigation.

**Props :**
- `open` (Boolean) : État d'ouverture
- `videos` (Array) : Tableau des vidéos
- `currentIndex` (Number) : Index de la vidéo actuelle

**Events :**
- `close` : Fermer la visionneuse
- `previous` : Vidéo précédente
- `next` : Vidéo suivante

**Fonctionnalités :**
- ✅ Visionneuse plein écran
- ✅ Navigation entre vidéos
- ✅ Support Vimeo
- ✅ Titre de la vidéo
- ✅ Boutons de navigation

## 🎯 Composants Existants

### ProjectSlider
Slider de projets pour la page d'accueil.

### SentryTest
Composant de test pour Sentry.

## 🚀 Utilisation

```vue
<template>
  <!-- Galerie d'images -->
  <ImageGallery 
    :images="projectImages"
    :loading="loading"
    :images-per-page="15"
    @image-click="openLightbox"
  />
  
  <!-- Galerie de vidéos -->
  <VideoGallery 
    :videos="projectVideos"
    @video-click="openVideoViewer"
  />
  
  <!-- Visionneuse vidéo -->
  <VideoViewer
    :open="videoViewerOpen"
    :videos="projectVideos"
    :current-index="currentVideoIndex"
    @close="closeVideoViewer"
    @previous="previousVideo"
    @next="nextVideo"
  />
</template>

<script setup>
import { ImageGallery, VideoGallery, VideoViewer } from '~/components'
</script>
```

## 🎨 Styles

Tous les composants utilisent Tailwind CSS et incluent :
- Transitions fluides
- Hover effects
- Design responsive
- Couleurs PYOH (jaune #FFD700)
- Animations CSS

## 📱 Responsive

- **Mobile** : 1 colonne
- **Tablet** : 2 colonnes  
- **Desktop** : 3-4 colonnes
- **Large** : 4 colonnes

## 🔧 Personnalisation

Les composants sont conçus pour être facilement personnalisables via :
- Props configurables
- Classes CSS personnalisables
- Events émis
- Slots (si nécessaire)

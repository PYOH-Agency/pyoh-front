# Guide des Animations GSAP - PYOH

Ce document détaille toutes les animations GSAP utilisées dans le site PYOH pour créer une expérience utilisateur fluide et engageante.

## 🎭 Vue d'ensemble

Le site utilise GSAP (GreenSock Animation Platform) pour créer des transitions fluides et des animations sophistiquées. Toutes les animations sont optimisées pour les performances et la fluidité.

## 🚀 Animations Principales

### 1. Transitions de Projets (Hero Section)

#### Configuration
```typescript
const animateProjectTransition = () => {
  isTransitioning.value = true
  
  gsap.timeline()
    .to('.project-leave-active', {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: 'power2.inOut'
    })
    .set('.project-leave-active', { display: 'none' })
    .set('.project-enter-active', { display: 'block' })
    .fromTo('.project-enter-active', 
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
    )
    .then(() => {
      animateProjectElements()
      isTransitioning.value = false
    })
}
```

#### Paramètres
- **Durée sortie** : 0.4s
- **Durée entrée** : 0.6s
- **Easing** : power2.inOut (sortie), power2.out (entrée)
- **Effets** : Opacity + Scale

### 2. Animation des Éléments de Contenu

#### Configuration
```typescript
const animateProjectElements = () => {
  const tl = gsap.timeline()
  
  tl.fromTo('.project-category', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
  )
  .fromTo('.project-title', 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.3'
  )
  .fromTo('.project-subtitle', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4'
  )
  .fromTo('.project-button', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2'
  )
}
```

#### Séquence d'Animation
1. **Catégorie** : Slide up (0.6s)
2. **Titre** : Slide up avec délai (0.8s, -0.3s)
3. **Sous-titre** : Slide up avec délai (0.6s, -0.4s)
4. **Bouton** : Slide up avec délai (0.6s, -0.2s)

### 3. Animations de Filtrage (Portfolio)

#### Configuration
```typescript
const setActiveFilter = (filter) => {
  activeFilter.value = filter
  
  gsap.fromTo('.project-grid-enter-active', 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
  )
}
```

#### Paramètres
- **Durée** : 0.6s
- **Stagger** : 0.1s entre chaque élément
- **Easing** : power2.out
- **Effets** : Opacity + Y translation

### 4. Animations de Modal

#### Configuration
```typescript
const openProjectModal = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
  
  gsap.fromTo('.modal', 
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
  )
}
```

#### Paramètres
- **Durée** : 0.3s
- **Easing** : power2.out
- **Effets** : Opacity + Scale

## 🎨 Easing Functions

### Easing Utilisés
- **`power2.out`** : Animation rapide au début, ralentie à la fin
- **`power2.inOut`** : Animation lente au début et à la fin, rapide au milieu
- **`back.out`** : Animation avec léger rebond

### Exemples d'Usage
```typescript
// Animation fluide
gsap.to(element, { 
  x: 100, 
  duration: 1, 
  ease: 'power2.out' 
})

// Animation avec rebond
gsap.to(element, { 
  scale: 1.2, 
  duration: 0.8, 
  ease: 'back.out(1.7)' 
})
```

## ⚡ Optimisations de Performance

### 1. Gestion des Transitions
```typescript
const isTransitioning = ref(false)

const nextProject = () => {
  if (currentProjectIndex.value < projects.value.length - 1 && !isTransitioning.value) {
    currentProjectIndex.value++
    animateProjectTransition()
  }
}
```

### 2. Nettoyage des Event Listeners
```typescript
onUnmounted(() => {
  window.removeEventListener('wheel', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  clearTimeout(scrollTimeout)
  stopAutoPlay()
})
```

### 3. Utilisation de Timeline
```typescript
const tl = gsap.timeline()
tl.to(element1, { ... })
  .to(element2, { ... }, '-=0.3') // Délai négatif pour chevauchement
```

## 📱 Responsive Animations

### Adaptations Mobile
```typescript
// Réduction de la durée sur mobile
const isMobile = window.innerWidth < 768
const duration = isMobile ? 0.4 : 0.6

gsap.to(element, { 
  y: 0, 
  duration, 
  ease: 'power2.out' 
})
```

### Désactivation sur Mobile
```typescript
// Désactiver certaines animations sur mobile
if (window.innerWidth > 768) {
  gsap.to(element, { ... })
}
```

## 🎯 Bonnes Pratiques

### 1. Gestion des États
- Toujours vérifier `isTransitioning` avant de lancer une animation
- Utiliser des flags pour éviter les animations multiples

### 2. Timing des Animations
- Garder les durées entre 0.3s et 0.8s pour une UX optimale
- Utiliser des délais négatifs pour créer des séquences fluides

### 3. Performance
- Éviter les animations sur des propriétés qui déclenchent le reflow
- Utiliser `transform` et `opacity` quand possible
- Nettoyer les event listeners

### 4. Accessibilité
- Respecter les préférences de réduction de mouvement
- Fournir des alternatives pour les utilisateurs avec des limitations

## 🔧 Débogage

### Console GSAP
```typescript
// Activer les logs GSAP
gsap.config({ 
  nullTargetWarn: false,
  trialWarn: false 
})
```

### Vérification des Animations
```typescript
// Vérifier si une animation est en cours
const isAnimating = gsap.isTweening(element)

// Arrêter toutes les animations
gsap.killTweensOf(element)
```

### Performance Monitor
```typescript
// Mesurer les performances
const startTime = performance.now()
gsap.to(element, { 
  x: 100, 
  duration: 1, 
  onComplete: () => {
    const duration = performance.now() - startTime
    console.log(`Animation terminée en ${duration}ms`)
  }
})
```

## 📚 Ressources

### Documentation GSAP
- [GSAP Documentation](https://greensock.com/docs/)
- [GSAP Easing](https://greensock.com/docs/v3/Eases)
- [GSAP Timeline](https://greensock.com/docs/v3/GSAP/Timeline)

### Plugins Utiles
- **ScrollTrigger** : Animations au scroll
- **MorphSVG** : Morphing de SVG
- **DrawSVG** : Animation de tracé SVG
- **MotionPath** : Animation le long d'un chemin

### Exemples Avancés
```typescript
// Animation avec ScrollTrigger
gsap.from('.element', {
  scrollTrigger: {
    trigger: '.element',
    start: 'top center',
    end: 'bottom center',
    scrub: 1
  },
  y: 100,
  opacity: 0
})
```

---

**Note** : Toutes les animations sont conçues pour être fluides et performantes. En cas de problème de performance, réduisez la durée des animations ou simplifiez les effets.

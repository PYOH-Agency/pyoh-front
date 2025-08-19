# PYOH - Site Vitrine Agence Créative

Site vitrine moderne et interactif pour l'agence créative PYOH, développé avec Nuxt 3, Strapi et GSAP.

## 🚀 Fonctionnalités

### Home Page
- **Hero Section Interactive** : Affichage des projets en 100vh avec navigation
- **Slider de Projets** : Navigation par scroll, flèches clavier et boutons
- **Animations GSAP** : Transitions fluides entre les projets
- **Design Ultra Moderne** : Interface noir et blanc avec accents créatifs

### Portfolio
- **Grille de Projets** : Affichage en grille responsive
- **Filtres par Catégorie** : Navigation intuitive entre les types de projets
- **Modal de Détail** : Informations complètes sur chaque projet
- **Recherche** : Fonction de recherche intégrée

### Navigation
- **Scroll Vertical** : Navigation entre projets par scroll
- **Flèches Clavier** : Navigation avec les touches ← →
- **Boutons de Navigation** : Interface tactile intuitive
- **Indicateurs Visuels** : Points de navigation et compteur

## 🛠️ Technologies

- **Frontend** : Nuxt 3 + Vue 3 + TypeScript
- **Styling** : Tailwind CSS
- **CMS** : Strapi v4
- **Animations** : GSAP (GreenSock)
- **État** : Pinia
- **Build** : Vite

## 📁 Structure du Projet

```
pyoh-front/
├── components/
│   └── ProjectSlider.vue          # Composant slider de projets
├── composables/
│   └── useProjects.ts             # Logique métier des projets
├── pages/
│   ├── index.vue                  # Page d'accueil
│   └── portfolio.vue              # Page portfolio
├── types/
│   └── project.ts                 # Types TypeScript
├── assets/
│   └── css/
│       └── main.css               # Styles globaux
└── nuxt.config.ts                 # Configuration Nuxt
```

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Strapi v4 (optionnel pour le développement)

### Installation des dépendances
```bash
cd pyoh-front
npm install
```

### Configuration des variables d'environnement
```bash
cp env.example .env
```

Remplissez le fichier `.env` :
```env
NUXT_PUBLIC_STRAPI_URL=http://localhost:1337
NUXT_PUBLIC_STRAPI_TOKEN=your_api_token_here
```

### Démarrage en développement
```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

## 🎨 Configuration Strapi

### 1. Créer la collection "Project"
Suivez le guide détaillé dans [STRAPI_SETUP.md](./STRAPI_SETUP.md)

### 2. Champs requis
- `title` : Titre du projet
- `subtitle` : Description courte
- `category` : Catégorie (Web Design, Branding, etc.)
- `media` : Image principale
- `featured` : Projet à mettre en avant

### 3. Permissions
- Lecture publique pour tous les champs
- Pas d'authentification requise

## 🎭 Animations GSAP

### Transitions de Projets
- **Entrée** : Fade in + scale up
- **Sortie** : Fade out + scale down
- **Durée** : 0.6s avec easing power2.out

### Éléments de Contenu
- **Catégorie** : Slide up depuis le bas
- **Titre** : Slide up avec délai
- **Sous-titre** : Slide up avec délai
- **Bouton** : Slide up avec délai

### Navigation
- **Flèches** : Hover effects avec translation
- **Indicateurs** : Scale au hover
- **Transitions** : Smooth crossfade

## 📱 Responsive Design

### Breakpoints
- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

### Adaptations
- **Titres** : Taille réduite sur mobile
- **Navigation** : Boutons adaptés au touch
- **Grille** : Colonnes adaptatives
- **Images** : Aspect ratio maintenu

## 🎯 Personnalisation

### Couleurs
```css
/* Variables CSS personnalisables */
:root {
  --primary-bg: #000000;
  --secondary-bg: #111111;
  --accent-color: #ffffff;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.8);
}
```

### Typographie
- **Titres** : Font bold, tailles 6xl à 8xl
- **Sous-titres** : Font medium, tailles xl à 2xl
- **Corps** : Font regular, tailles sm à lg

### Animations
- **Durées** : 0.3s à 0.8s
- **Easing** : power2.out, power2.inOut
- **Délais** : Staggered animations

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

### Prévisualisation
```bash
npm run preview
```

### Déploiement Vercel
```bash
npm run deploy
```

## 🔧 Développement

### Scripts disponibles
```bash
npm run dev          # Développement
npm run build        # Build production
npm run preview      # Prévisualisation build
npm run generate     # Génération statique
```

### Linting
```bash
npm run lint         # Vérification du code
npm run lint:fix     # Correction automatique
```

## 📚 Documentation

- [Configuration Strapi](./STRAPI_SETUP.md)
- [Guide des Animations](./ANIMATIONS.md)
- [API Reference](./API.md)

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Contactez l'équipe PYOH
- Consultez la documentation

---

**PYOH** - Agence Créative 🎨✨

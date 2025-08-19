# Configuration Strapi pour PYOH

## Collection "Project"

Créez une nouvelle collection de contenu appelée **"Project"** dans votre admin Strapi avec les champs suivants :

### Champs principaux

| Nom du champ | Type | Description | Requis |
|--------------|------|-------------|---------|
| `title` | Text (Short text) | Titre du projet | ✅ |
| `subtitle` | Text (Long text) | Sous-titre/description courte | ✅ |
| `description` | Rich Text | Description détaillée du projet | ❌ |
| `category` | Text (Short text) | Catégorie du projet (ex: "Web Design", "Branding") | ✅ |
| `client` | Text (Short text) | Nom du client | ❌ |
| `year` | Number (Integer) | Année de réalisation | ❌ |
| `technologies` | JSON | Liste des technologies utilisées | ❌ |
| `projectUrl` | Text (Short text) | Lien vers le projet en ligne | ❌ |
| `featured` | Boolean | Projet à mettre en avant sur la home | ❌ |
| `colorTheme` | Text (Short text) | Couleur dominante du projet | ❌ |
| `order` | Number (Integer) | Ordre d'affichage sur la home | ❌ |

### Configuration des champs

#### 1. Title
- **Type** : Short text
- **Validation** : Required, Max length: 100
- **Exemple** : "Site E-commerce Moderne"

#### 2. Subtitle
- **Type** : Long text
- **Validation** : Required, Max length: 200
- **Exemple** : "Plateforme de vente en ligne avec design responsive et UX optimisée"

#### 3. Description
- **Type** : Rich text
- **Validation** : Optional
- **Exemple** : Description détaillée avec formatage HTML

#### 4. Category
- **Type** : Short text
- **Validation** : Required
- **Valeurs suggérées** : "Web Design", "Branding", "Mobile App", "UI/UX", "Print"

#### 5. Client
- **Type** : Short text
- **Validation** : Optional
- **Exemple** : "TechCorp", "InnovateLab"

#### 6. Year
- **Type** : Integer
- **Validation** : Optional, Min: 2000, Max: 2030
- **Exemple** : 2024

#### 7. Technologies
- **Type** : JSON
- **Validation** : Optional
- **Format** : Array de strings
- **Exemple** : `["Vue.js", "Node.js", "Stripe", "MongoDB"]`

#### 8. Project URL
- **Type** : Short text
- **Validation** : Optional, URL format
- **Exemple** : "https://example.com"

#### 9. Featured
- **Type** : Boolean
- **Validation** : Optional
- **Défaut** : false
- **Utilisation** : Pour marquer les projets à afficher sur la home page

#### 10. Color Theme
- **Type** : Short text
- **Validation** : Optional
- **Exemple** : "#FF6B6B", "blue", "dark"

#### 11. Order (Optionnel - à ajouter plus tard)
- **Type** : Integer
- **Validation** : Optional
- **Utilisation** : Ordre d'affichage des projets (1 = premier)
- **Note** : Ce champ n'est pas encore utilisé dans le code. Les projets sont triés par date de création par défaut.

### Configuration des relations

#### Media
- **Type** : Media (Single media)
- **Relation** : One-to-one avec la collection Media
- **Utilisation** : Image principale du projet pour la hero section

### Permissions

Dans l'admin Strapi, configurez les permissions suivantes pour la collection "Project" :

#### Public (Authenticated)
- `find` : ✅ (Lecture des projets)
- `findOne` : ✅ (Lecture d'un projet)

#### Public (Unauthenticated)
- `find` : ✅ (Lecture des projets)
- `findOne` : ✅ (Lecture d'un projet)

### Exemple de contenu

Voici un exemple de projet à créer dans Strapi :

```json
{
  "title": "Site E-commerce Moderne",
  "subtitle": "Plateforme de vente en ligne avec design responsive et UX optimisée",
  "description": "Création d'un site e-commerce moderne avec une interface utilisateur intuitive et un design responsive. Le projet inclut la gestion des produits, le panier d'achat, et un système de paiement sécurisé.",
  "category": "Web Design",
  "client": "TechCorp",
  "year": 2024,
  "technologies": ["Vue.js", "Node.js", "Stripe", "MongoDB"],
  "projectUrl": "https://example.com",
  "featured": true,
  "colorTheme": "#FF6B6B",
  "order": 1,
  "media": "image_uploaded_id"
}
```

### Configuration des médias

1. **Taille recommandée** : 1920x1080px minimum
2. **Format** : JPG, PNG, WebP
3. **Poids** : < 2MB pour de bonnes performances
4. **Aspect ratio** : 16:9 ou 4:3 recommandé

### Ordre de création

1. Créez d'abord la collection "Project"
2. Ajoutez tous les champs nécessaires
3. Configurez les permissions
4. Créez quelques projets de test
5. Testez l'affichage sur le site

### Variables d'environnement

Assurez-vous que votre fichier `.env` contient :

```env
NUXT_PUBLIC_STRAPI_URL=http://localhost:1337
NUXT_PUBLIC_STRAPI_TOKEN=your_api_token_here
```

### Test de la configuration

Après la configuration, testez que :

1. Les projets s'affichent sur la home page
2. La navigation entre projets fonctionne
3. Les filtres du portfolio fonctionnent
4. Les images s'affichent correctement
5. Les transitions GSAP sont fluides

### Support

En cas de problème, vérifiez :
- Les permissions Strapi
- La structure des champs
- Les variables d'environnement
- Les logs de la console navigateur
- Les logs Strapi

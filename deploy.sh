#!/bin/bash

# Script de déploiement PYOH Website
# Ce script automatise le processus de déploiement sur Vercel

set -e  # Arrêter le script en cas d'erreur

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="pyoh-website"
PROJECT_DIR="$(pwd)"
VERCEL_CONFIG="vercel.json"
ENV_FILE=".env"
ENV_EXAMPLE="env.example"

# Fonctions utilitaires
print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  PYOH Website - Déploiement   ${NC}"
    echo -e "${BLUE}================================${NC}"
    echo ""
}

print_step() {
    echo -e "${YELLOW}[ÉTAPE]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCÈS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERREUR]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Vérification des prérequis
check_prerequisites() {
    print_step "Vérification des prérequis..."
    
    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js n'est pas installé"
        exit 1
    fi
    
    # Vérifier npm
    if ! command -v npm &> /dev/null; then
        print_error "npm n'est pas installé"
        exit 1
    fi
    
    # Vérifier Vercel CLI
    if ! command -v vercel &> /dev/null; then
        print_error "Vercel CLI n'est pas installé. Installation..."
        npm install -g vercel
    fi
    
    # Vérifier Git
    if ! command -v git &> /dev/null; then
        print_error "Git n'est pas installé"
        exit 1
    fi
    
    print_success "Tous les prérequis sont satisfaits"
}

# Vérification du projet
check_project() {
    print_step "Vérification de la structure du projet..."
    
    # Vérifier package.json
    if [ ! -f "package.json" ]; then
        print_error "package.json non trouvé. Êtes-vous dans le bon répertoire ?"
        exit 1
    fi
    
    # Vérifier nuxt.config.ts
    if [ ! -f "nuxt.config.ts" ]; then
        print_error "nuxt.config.ts non trouvé"
        exit 1
    fi
    
    # Vérifier vercel.json
    if [ ! -f "vercel.json" ]; then
        print_error "vercel.json non trouvé"
        exit 1
    fi
    
    print_success "Structure du projet validée"
}

# Configuration de l'environnement
setup_environment() {
    print_step "Configuration de l'environnement..."
    
    # Créer .env s'il n'existe pas
    if [ ! -f "$ENV_FILE" ]; then
        if [ -f "$ENV_EXAMPLE" ]; then
            print_info "Création du fichier .env à partir de env.example..."
            cp "$ENV_EXAMPLE" "$ENV_FILE"
            print_warning "Veuillez configurer vos variables d'environnement dans .env"
        else
            print_error "Aucun fichier .env ou env.example trouvé"
            exit 1
        fi
    fi
    
    # Vérifier les variables critiques
    if ! grep -q "NUXT_PUBLIC_STRAPI_URL" "$ENV_FILE"; then
        print_warning "NUXT_PUBLIC_STRAPI_URL non configuré dans .env"
    fi
    
    print_success "Environnement configuré"
}

# Installation des dépendances
install_dependencies() {
    print_step "Installation des dépendances..."
    
    if [ -d "node_modules" ]; then
        print_info "Suppression de node_modules existant..."
        rm -rf node_modules
    fi
    
    if [ -f "package-lock.json" ]; then
        print_info "Suppression de package-lock.json existant..."
        rm package-lock.json
    fi
    
    print_info "Installation des dépendances..."
    npm install
    
    print_success "Dépendances installées"
}

# Test du build
test_build() {
    print_step "Test du build de production..."
    
    print_info "Construction du projet..."
    npm run build
    
    if [ $? -eq 0 ]; then
        print_success "Build réussi"
    else
        print_error "Échec du build"
        exit 1
    fi
}

# Vérification Git
check_git() {
    print_step "Vérification de Git..."
    
    # Vérifier si c'est un repo Git
    if [ ! -d ".git" ]; then
        print_info "Initialisation du repository Git..."
        git init
        git add .
        git commit -m "Initial commit - PYOH Website"
    fi
    
    # Vérifier le statut
    if [ -n "$(git status --porcelain)" ]; then
        print_info "Commit des changements non commités..."
        git add .
        git commit -m "feat: mise à jour avant déploiement"
    fi
    
    print_success "Git configuré et à jour"
}

# Déploiement Vercel
deploy_vercel() {
    print_step "Déploiement sur Vercel..."
    
    print_info "Déploiement en cours..."
    
    # Déploiement avec Vercel
    if vercel --prod --yes; then
        print_success "Déploiement réussi sur Vercel"
    else
        print_error "Échec du déploiement Vercel"
        exit 1
    fi
}

# Vérification post-déploiement
post_deployment_check() {
    print_step "Vérification post-déploiement..."
    
    # Récupérer l'URL de déploiement
    DEPLOYMENT_URL=$(vercel ls | grep "$PROJECT_NAME" | head -1 | awk '{print $2}')
    
    if [ -n "$DEPLOYMENT_URL" ]; then
        print_success "Site déployé sur: $DEPLOYMENT_URL"
        
        # Test de disponibilité
        print_info "Test de disponibilité du site..."
        if curl -s -f "$DEPLOYMENT_URL" > /dev/null; then
            print_success "Site accessible et fonctionnel"
        else
            print_warning "Site déployé mais peut-être pas encore accessible"
        fi
    else
        print_warning "Impossible de récupérer l'URL de déploiement"
    fi
}

# Nettoyage
cleanup() {
    print_step "Nettoyage..."
    
    # Supprimer les fichiers temporaires
    if [ -d ".nuxt" ]; then
        rm -rf .nuxt
    fi
    
    if [ -d "dist" ]; then
        rm -rf dist
    fi
    
    print_success "Nettoyage terminé"
}

# Fonction principale
main() {
    print_header
    
    # Vérifications
    check_prerequisites
    check_project
    setup_environment
    
    # Préparation
    install_dependencies
    test_build
    check_git
    
    # Déploiement
    deploy_vercel
    
    # Vérification
    post_deployment_check
    
    # Nettoyage
    cleanup
    
    echo ""
    echo -e "${GREEN}================================${NC}"
    echo -e "${GREEN}  Déploiement terminé ! 🎉     ${NC}"
    echo -e "${GREEN}================================${NC}"
    echo ""
    echo -e "Votre site PYOH est maintenant en ligne !"
    echo -e "Consultez la documentation pour la suite :"
    echo -e "- README.md : Guide d'utilisation"
    echo -e "- STRAPI_SETUP.md : Configuration Strapi"
    echo -e "- ANIMATIONS.md : Guide des animations GSAP"
}

# Gestion des erreurs
trap 'print_error "Déploiement interrompu"; exit 1' INT TERM

# Exécution du script
main "$@"

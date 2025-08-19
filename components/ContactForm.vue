<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Nom -->
    <div>
      <label for="name" class="block text-sm font-medium text-white/80 mb-2">Nom complet *</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        required
        class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
        placeholder="Votre nom"
      />
    </div>

    <!-- Email -->
    <div>
      <label for="email" class="block text-sm font-medium text-white/80 mb-2">Email *</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        required
        class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
        placeholder="votre@email.com"
      />
    </div>

    <!-- Téléphone -->
    <div>
      <label for="phone" class="block text-sm font-medium text-white/80 mb-2">Téléphone</label>
      <input
        id="phone"
        v-model="form.phone"
        type="tel"
        class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
        placeholder="+33 6 12 34 56 78"
      />
    </div>

    <!-- Type de projet -->
    <div>
      <label for="projectType" class="block text-sm font-medium text-white/80 mb-2">Type de projet *</label>
      <select
        id="projectType"
        v-model="form.projectType"
        required
        class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
      >
        <option value="" disabled>Sélectionnez un type</option>
        <option value="website">Site web</option>
        <option value="ecommerce">E-commerce</option>
        <option value="branding">Identité visuelle</option>
        <option value="ui-ux">UI/UX Design</option>
        <option value="marketing">Marketing digital</option>
        <option value="other">Autre</option>
      </select>
    </div>

    <!-- Budget -->
    <div>
      <label for="budget" class="block text-sm font-medium text-white/80 mb-2">Budget estimé</label>
      <select
        id="budget"
        v-model="form.budget"
        class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
      >
        <option value="">Sélectionnez un budget</option>
        <option value="5k-10k">5k - 10k €</option>
        <option value="10k-25k">10k - 25k €</option>
        <option value="25k-50k">25k - 50k €</option>
        <option value="50k+">50k+ €</option>
        <option value="discuss">À discuter</option>
      </select>
    </div>

    <!-- Message -->
    <div>
      <label for="message" class="block text-sm font-medium text-white/80 mb-2">Description du projet *</label>
      <textarea
        id="message"
        v-model="form.message"
        rows="4"
        required
        class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 resize-none"
        placeholder="Décrivez votre projet, vos objectifs et vos attentes..."
      ></textarea>
    </div>

    <!-- Bouton d'envoi -->
    <button
      type="submit"
      :disabled="isSubmitting"
      class="w-full px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
    >
      <span v-if="!isSubmitting">Envoyer à contact@pyoh.fr</span>
      <span v-else class="flex items-center justify-center">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Préparation de l'email...
      </span>
    </button>

    <!-- Message de succès/erreur -->
    <div v-if="submitMessage" class="mt-4 p-3 rounded-lg text-sm" :class="submitMessageClass">
      {{ submitMessage }}
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// État du formulaire
const form = ref({
  name: '',
  email: '',
  phone: '',
  projectType: '',
  budget: '',
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitMessageClass = computed(() => {
  return submitMessage.value.includes('succès') 
    ? 'bg-green-400/10 text-green-400 border border-green-400/20'
    : 'bg-red-400/10 text-red-400 border border-red-400/20'
})

// Gestion de la soumission
const handleSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = ''

  try {
    // Préparer le contenu de l'email
    const emailContent = `
Nouveau message de contact depuis le site PYOH

Nom: ${form.value.name}
Email: ${form.value.email}
Téléphone: ${form.value.phone || 'Non renseigné'}
Type de projet: ${form.value.projectType}
Budget estimé: ${form.value.budget || 'Non renseigné'}

Message:
${form.value.message}

---
Envoyé depuis le formulaire de contact du site PYOH
    `.trim()

    // Envoyer l'email à contact@pyoh.fr
    const mailtoLink = `mailto:contact@pyoh.fr?subject=Nouveau message de contact - ${form.value.projectType}&body=${encodeURIComponent(emailContent)}`
    
    // Ouvrir le client email par défaut
    window.open(mailtoLink, '_blank')
    
    submitMessage.value = 'Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.'
    
    // Réinitialiser le formulaire
    form.value = {
      name: '',
      email: '',
      phone: '',
      projectType: '',
      budget: '',
      message: ''
    }
    
  } catch (error) {
    submitMessage.value = 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
    console.error('Erreur formulaire:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto">
    <form @submit="handleSubmit" class="space-y-6">
      <!-- Nom -->
      <div>
        <label for="name" class="block text-sm font-medium text-theme-primary mb-2">
          Nom complet *
        </label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          class="w-full px-4 py-3 border border-theme-primary rounded-lg focus:ring-2 focus:ring-pyoh-yellow focus:border-transparent transition-all duration-300 bg-theme-primary text-theme-primary placeholder-theme-quaternary"
          placeholder="Votre nom"
        />
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-theme-primary mb-2">
          Email *
        </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          class="w-full px-4 py-3 border border-theme-primary rounded-lg focus:ring-2 focus:ring-pyoh-yellow focus:border-transparent transition-all duration-300 bg-theme-primary text-theme-primary placeholder-theme-quaternary"
          placeholder="votre@email.com"
        />
      </div>

      <!-- Sujet -->
      <div>
        <label for="subject" class="block text-sm font-medium text-theme-primary mb-2">
          Sujet *
        </label>
        <input
          id="subject"
          v-model="formData.subject"
          type="text"
          required
          class="w-full px-4 py-3 border border-theme-primary rounded-lg focus:ring-2 focus:ring-pyoh-yellow focus:border-transparent transition-all duration-300 bg-theme-primary text-theme-primary placeholder-theme-quaternary"
          placeholder="Sujet de votre message"
        />
      </div>

      <!-- Message -->
      <div>
        <label for="message" class="block text-sm font-medium text-theme-primary mb-2">
          Message *
        </label>
        <textarea
          id="message"
          v-model="formData.message"
          rows="4"
          required
          class="w-full px-4 py-3 border border-theme-primary rounded-lg focus:ring-2 focus:ring-pyoh-yellow focus:border-transparent transition-all duration-300 bg-theme-primary text-theme-primary placeholder-theme-quaternary resize-none"
          placeholder="Décrivez votre projet..."
        ></textarea>
      </div>

      <!-- Bouton d'envoi -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-pyoh-yellow text-black font-semibold py-3 px-6 rounded-lg hover:bg-pyoh-yellow-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
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

      <!-- Message de succès -->
      <div v-if="showSuccess" class="text-center p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
        <p>✅ Votre message a été envoyé avec succès !</p>
        <p class="text-sm mt-1">Vérifiez votre boîte de réception.</p>
      </div>

      <!-- Message d'erreur -->
      <div v-if="showError" class="text-center p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        <p>❌ Une erreur s'est produite lors de l'envoi.</p>
        <p class="text-sm mt-1">Veuillez réessayer ou nous contacter directement.</p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// État du formulaire
const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

// Gestion de la soumission
const handleSubmit = async () => {
  isSubmitting.value = true
  showSuccess.value = false
  showError.value = false

  try {
    // Préparer le contenu de l'email
    const emailContent = `
Nouveau message de contact depuis le site PYOH

Nom: ${formData.value.name}
Email: ${formData.value.email}
Sujet: ${formData.value.subject}

Message:
${formData.value.message}

---
Envoyé depuis le formulaire de contact du site PYOH
    `.trim()

    // Envoyer l'email à contact@pyoh.fr
    const mailtoLink = `mailto:contact@pyoh.fr?subject=Nouveau message de contact - ${formData.value.subject}&body=${encodeURIComponent(emailContent)}`
    
    // Ouvrir le client email par défaut
    window.open(mailtoLink, '_blank')
    
    showSuccess.value = true
    
    // Réinitialiser le formulaire
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    
  } catch (error) {
    showError.value = true
    console.error('Erreur formulaire:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

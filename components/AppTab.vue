<template>
  <div class="flex space-x-1">
    <button
      v-for="(tab, index) in tabs"
      :key="tab.id || index"
      @click="$emit('update:modelValue', tab.value)"
      class="px-6 py-3 text-sm font-secondary transition-all duration-300 relative group"
      :class="[
        modelValue === tab.value 
          ? 'tab-active' 
          : 'tab-inactive'
      ]"
    >
      {{ tab.label }}
      
      <!-- Soulignement au hover -->
      <span 
        class="absolute -bottom-0.5 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full tab-underline"
      ></span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  tabs: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(tab => 
        typeof tab === 'object' && 
        'label' in tab && 
        'value' in tab
      )
    }
  },
  color: {
    type: String,
    default: 'gray-600'
  },
  activeColor: {
    type: String,
    default: 'gray-900'
  },
  backgroundColor: {
    type: String,
    default: 'white',
    validator: (value) => ['white', 'black'].includes(value)
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
/* Styles pour les transitions et animations */
.group:hover .group-hover\:w-full {
  width: 100%;
}

/* Styles des tabs avec couleurs dynamiques */
.tab-active {
  color: var(--active-color);
  border-bottom: 2px solid var(--active-color);
}

.tab-inactive {
  color: var(--inactive-color);
  border-bottom: 2px solid transparent;
}

.tab-inactive:hover {
  color: var(--hover-color) !important;
  border-bottom-color: var(--hover-color);
}

.tab-underline {
  background-color: var(--active-color);
}

/* Définir les variables CSS basées sur les props */
:deep(.tab-active) {
  --active-color: v-bind(activeColor === 'pyoh-yellow' ? '#fddb00' : activeColor);
}

:deep(.tab-inactive) {
  --inactive-color: v-bind(color === 'gray-400' ? '#9ca3af' : color === 'gray-600' ? '#4b5563' : color === 'white/60' ? 'rgba(255, 255, 255, 0.6)' : color);
}

:deep(.tab-inactive:hover) {
  --hover-color: v-bind(backgroundColor === 'black' ? '#ffffff' : activeColor === 'pyoh-yellow' ? '#fddb00' : activeColor);
}

:deep(.tab-underline) {
  --active-color: v-bind(activeColor === 'pyoh-yellow' ? '#fddb00' : activeColor);
}
</style>

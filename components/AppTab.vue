<template>
  <div class="flex space-x-1 md:space-x-2">
    <button
      v-for="(tab, index) in tabs"
      :key="tab.id || index"
      @click="$emit('update:modelValue', tab.value)"
      class="px-3 md:px-6 py-2 md:py-3 text-xs md:text-sm font-secondary transition-all duration-300 relative group touch-manipulation"
      :class="[
        modelValue === tab.value 
          ? 'tab-active' 
          : 'tab-inactive'
      ]"
      :style="getTabStyles(tab)"
    >
      {{ tab.label }}
      
      <!-- Soulignement au hover -->
      <span 
        class="absolute -bottom-0.5 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
        :style="getUnderlineStyles()"
      ></span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
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

// Fonctions pour les styles dynamiques
const getTabStyles = (tab) => {
  const isActive = props.modelValue === tab.value
  
  if (isActive) {
    return {
      color: getActiveColor(),
      borderBottom: `2px solid ${getActiveColor()}`
    }
  } else {
    return {
      color: getInactiveColor(),
      borderBottom: '2px solid transparent'
    }
  }
}

const getUnderlineStyles = () => {
  return {
    backgroundColor: getActiveColor()
  }
}

const getActiveColor = () => {
  if (props.activeColor === 'pyoh-yellow') return '#fddb00'
  if (props.activeColor === 'gray-900') return '#111827'
  if (props.activeColor === 'gray-600') return '#4b5563'
  return props.activeColor
}

const getInactiveColor = () => {
  if (props.color === 'gray-400') return '#9ca3af'
  if (props.color === 'gray-600') return '#4b5563'
  if (props.color === 'white/60') return 'rgba(255, 255, 255, 0.6)'
  return props.color
}

const getHoverColor = () => {
  if (props.backgroundColor === 'black') return '#ffffff'
  if (props.activeColor === 'pyoh-yellow') return '#fddb00'
  return getActiveColor()
}
</script>

<style scoped>
/* Styles pour les transitions et animations */
.group:hover .group-hover\:w-full {
  width: 100%;
}

/* Hover sur les tabs inactives */
.tab-inactive:hover {
  color: v-bind(getHoverColor()) !important;
  border-bottom-color: v-bind(getHoverColor());
}
</style>

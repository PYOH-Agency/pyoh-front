<template>
  <div class="page-layout">
    <!-- Navigation conditionnelle -->
    <Navigation 
      v-if="showNavigation" 
      :page-type="pageType"
      :background-color="backgroundColor"
    />
    
    <!-- Breadcrumb conditionnel -->
    <Breadcrumb 
      v-else-if="showBreadcrumb"
      :current-page="currentPage"
      :background-color="backgroundColor"
    />
    
    <!-- Contenu principal avec marges -->
    <main class="page-content">
      <div v-if="maxWidth === 'full' && padding === 'none'" class="w-full">
        <slot />
      </div>
      <div v-else class="container mx-auto">
        <div 
          :class="[
            maxWidth === 'full' ? 'w-full' : `max-w-${maxWidth}`,
            paddingClass,
            alignClass
          ]"
        >
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// Props pour personnaliser le layout
const props = defineProps({
  maxWidth: {
    type: String,
    default: '4xl',
    validator: (value) => ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'full'].includes(value)
  },
  padding: {
    type: String,
    default: 'lg',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  align: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'center', 'right'].includes(value)
  },
  pageType: {
    type: String,
    default: 'other',
    validator: (value) => ['home', 'portfolio', 'project-detail', 'other'].includes(value)
  },
  currentPage: {
    type: String,
    default: ''
  },
  backgroundColor: {
    type: String,
    default: 'white',
    validator: (value) => ['white', 'black'].includes(value)
  }
})

// Classes dynamiques basées sur les props
const paddingClass = computed(() => {
  const classes = {
    'none': 'px-0',
    'sm': 'px-4',
    'md': 'px-6',
    'lg': 'px-8',
    'xl': 'px-12'
  }
  return classes[props.padding]
})

const alignClass = computed(() => {
  const classes = {
    'left': 'ml-0',
    'center': 'mx-auto',
    'right': 'ml-auto'
  }
  return classes[props.align]
})

// Logique d'affichage de la navigation
const showNavigation = computed(() => {
  return props.pageType === 'home' || props.pageType === 'other'
})

const showBreadcrumb = computed(() => {
  return props.pageType === 'portfolio' || props.pageType === 'project-detail'
})
</script>

<style scoped>
.page-layout {
  width: 100%;
}

.page-content {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

/* Responsive padding */
@media (max-width: 768px) {
  .page-content {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}
</style>

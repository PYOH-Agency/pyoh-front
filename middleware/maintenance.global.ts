export default defineNuxtRouteMiddleware((to) => {
  // Mode maintenance : redirige toutes les routes vers /maintenance
  if (to.path === '/maintenance') {
    return
  }

  return navigateTo('/maintenance', { replace: true })
})


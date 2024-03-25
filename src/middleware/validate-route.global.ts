export default defineNuxtRouteMiddleware((to) => {
  return isRouteValid(to)
})

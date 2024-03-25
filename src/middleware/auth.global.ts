import {jwtDecode} from 'jwt-decode'

export default defineNuxtRouteMiddleware((to) => {
  const {token} = useAuth()
  if (
    to.path !== '/' &&
    (!token || (jwtDecode(token)?.exp ?? 0) * 1000 < Date.now())
  ) {
    return navigateTo('/')
  }
})

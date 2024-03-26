import type {UserInterface} from '~/types/user'

export const useAuth = defineStore('auth', () => {
  const token = ref<string>()
  const user = ref<Omit<UserInterface, 'password'>>()

  return {
    token,
    user,
  }
})

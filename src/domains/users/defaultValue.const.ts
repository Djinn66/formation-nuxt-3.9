import type {UserInterface} from '~/src/types/user'

export const defaultValueConst = {
  firstName: '',
  lastName: '',
  gender: '',
  email: '',
  phone: '',
  password: '',
  image: '',
  admin: false,
} satisfies Omit<UserInterface, 'id'>

import type {EntityInterface} from '~/src/types/entity'

export interface UserInterface extends EntityInterface {
  firstName: string
  lastName: string
  email: string
  password: string
  gender: string
  phone: string
  image: string
  admin: boolean
}

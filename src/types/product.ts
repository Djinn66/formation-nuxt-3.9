import type {EntityInterface} from '~/types/entity'

export interface ProductInterface extends EntityInterface {
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail?: string
  images?: Array<string>
}

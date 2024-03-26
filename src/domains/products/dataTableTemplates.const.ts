import AppCrudTableImg from '~/components/AppCrudTableImg.vue'
import {AppCrudTableActions} from '#components'
import {handleDeleteItem} from '~/utils/handleDeleteItem'
import type {ProductInterface} from '~/types/product'

export const dataTableTemplatesConst = [
  {
    key: 'thumbnail',
    component: AppCrudTableImg,
    props: {
      maxWidth: '150px',
      maxHeight: '150px',
    },
  },
  {
    key: 'actions',
    component: AppCrudTableActions,
    handlers: {
      edit: (item: ProductInterface) =>
        useRouter().push(`/products/update/${item.id}`),
    },
    props: {
      deleteItemFunction: (item: ProductInterface) =>
        handleDeleteItem(`/api/products/${item.id}`),
      entity: 'products',
    },
  },
]

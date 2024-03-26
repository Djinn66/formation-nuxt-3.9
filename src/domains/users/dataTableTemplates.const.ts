import {VChip} from 'vuetify/components'
import type {DataTableTemplate} from '~/src/types/dataTableTemplate'
import {AppCrudTableActions, AppCrudTableImg} from '#components'
import {handleDeleteItem} from '~/src/utils/handleDeleteItem'
import type {UserInterface} from '~/src/types/user'

export const dataTableTemplatesConst: Array<DataTableTemplate> = [
  {
    key: 'image',
    component: AppCrudTableImg,
    props: {
      maxWidth: '500px',
      maxHeight: '500px',
    },
  },
  {
    key: 'email',
    component: VChip,
    target: 'text',
    props: {
      closable: true,
    },
  },
  {
    key: 'actions',
    component: AppCrudTableActions,
    handlers: {
      edit: (item: UserInterface) =>
        useRouter().push(`/users/update/${item.id}`),
    },
    props: {
      deleteItemFunction: (item: UserInterface) =>
        handleDeleteItem(`/api/users/${item.id}`),
      entity: 'users',
    },
  },
]

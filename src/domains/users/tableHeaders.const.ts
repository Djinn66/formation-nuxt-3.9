import type {ReadonlyHeaders} from '~/types/headers'

export const tableHeadersConst = [
  {
    title: 'Photo',
    align: 'start',
    sortable: false,
    key: 'image',
  },
  {title: 'Nom', align: 'start', sortable: true, key: 'lastName'},
  {title: 'Prénom', align: 'start', sortable: true, key: 'firstName'},
  {title: 'Email', align: 'start', sortable: true, key: 'email'},
  {title: 'Actions', key: 'actions', sortable: false},
] satisfies ReadonlyHeaders

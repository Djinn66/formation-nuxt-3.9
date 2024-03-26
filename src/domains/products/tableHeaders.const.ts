import type {ReadonlyHeaders} from '~/types/headers'

export const tableHeadersConst = [
  {title: 'Photo', align: 'start', sortable: false, key: 'thumbnail'},
  {title: 'Title', align: 'start', sortable: true, key: 'title'},
  {title: 'Prix', align: 'start', sortable: true, key: 'price'},
  {title: 'Catégorie', align: 'start', sortable: true, key: 'category'},
  {title: 'Actions', key: 'actions', sortable: false},
] satisfies ReadonlyHeaders

import {$fetch} from 'ofetch'

export const handleDeleteItem = async (request: string) => {
  await $fetch(request, {
    method: 'DELETE',
  })
}

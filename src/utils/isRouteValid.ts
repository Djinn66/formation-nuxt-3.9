import type {RouteLocation} from 'vue-router'
import {entities} from '~/constants/appRouteEntities'

export const isRouteValid = (route: RouteLocation) => {
  const {id, action, entity} = route.params as {
    id: string
    action: string
    entity: string
  }

  if (entity && !entities.includes(entity)) {
    return false
  }
  switch (action) {
    case 'update':
      return !!id && /^\d+$/.test(id)
    case 'create':
      return id === ''
    default:
      return action === undefined && id === undefined
  }
}

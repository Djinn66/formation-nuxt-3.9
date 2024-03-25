import type {Component} from 'vue'

export interface DataTableTemplate {
  key: string
  component: Component
  props?: object
  target?: string
  handlers?: object
}

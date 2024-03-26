<script setup lang="ts" generic="T extends EntityInterface">
  import type {EntityInterface} from '~/types/entity'
  import type {ReadonlyHeaders} from '~/types/headers'
  import {FetchError} from 'ofetch'

  interface Props {
    title: string | null
    headers?: ReadonlyHeaders
    data: Array<T>
    loading: boolean
    error?: FetchError | null
  }

  const props = withDefaults(defineProps<Props>(), {
    title: null,
    loading: false,
    error: null,
  })

  type Emit = {
    (event: 'create'): void
  }

  const emit = defineEmits<Emit>()

  const keys = computed(() => {
    return props.headers?.map((header) => header.key) || []
  })

  const handleCreate = () => {
    emit('create')
  }
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :loading="loading"
    class="elevation-1"
    loading-text="Données en chargement..."
  >
    <template v-slot:top>
      <v-toolbar
        flat
        v-if="title"
      >
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        />
        <v-spacer />
        <v-btn
          color="primary"
          @click="handleCreate"
          :disabled="loading"
        >
          Ajouter
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <AppCrudTableNoData :error="error" />
    </template>
    <template
      v-for="key in keys"
      v-slot:[`item.${key}`]="props"
    >
      <slot
        :name="key"
        v-bind="props"
      >
        {{ props.value }}
      </slot>
    </template>
  </v-data-table>
</template>

<style scoped></style>

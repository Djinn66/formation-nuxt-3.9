<script setup lang="ts">
  import {FetchError} from 'ofetch'

  interface Props {
    error: FetchError | null
  }
  defineProps<Props>()
</script>

<template>
  <VAlert
    v-if="error"
    variant="text"
    type="error"
    text="Erreur lors de la récupération des données."
  />
  <VAlert
    v-else
    variant="text"
    type="warning"
    text="Aucune donnée."
  />
</template>

<style scoped></style>

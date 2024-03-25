<script setup lang="ts">
  defineOptions({name: 'AppCrudTableDeleteDialog'})

  interface Props {
    loading: boolean
  }

  defineProps<Props>()

  /**
   * Emits pour le v-model dialogDelete et la fonction validate.
   */
  const emit = defineEmits<{
    validate: []
  }>()

  const dialogDelete = defineModel<boolean>({required: true})
</script>

<template>
  <v-dialog
    v-model="dialogDelete"
    max-width="600px"
  >
    <v-card :loading="loading">
      <v-card-title class="text-h5"
        >Êtes-vous sûr(e) de vouloir supprimer cet élément ?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="dialogDelete = false"
          >Cancel</v-btn
        >
        <v-btn
          :loading="loading"
          color="blue-darken-1"
          variant="text"
          @click="emit('validate')"
          >OK</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>

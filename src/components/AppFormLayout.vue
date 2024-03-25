<script setup lang="ts">
  interface Props {
    submit?: () => void
    loading?: boolean
  }

  const props = defineProps<Props>()

  const valid = ref(false)
  const handleClickCancel = () => {
    useRouter().back()
  }
  const handleSubmit = () => {
    valid.value && props.submit?.()
  }
</script>

<template>
  <VCard
    width="40%"
    :loading="loading"
  >
    <VForm
      v-model="valid"
      :disabled="loading"
      @submit.prevent="handleSubmit"
      @keydown.enter.prevent="handleSubmit"
    >
      <VCardText>
        <slot />
      </VCardText>
      <slot name="error" />
      <VCardActions class="pa-4">
        <slot
          name="actions"
          :valid="valid"
        >
          <VBtn
            color="warning"
            @click="handleClickCancel"
            size="large"
            variant="text"
            text="Annuler"
          />
          <VBtn
            color="warning"
            type="submit"
            size="large"
            variant="flat"
            text="Valider"
            :loading="loading"
            :disabled="!valid"
          />
        </slot>
      </VCardActions>
    </VForm>
  </VCard>
</template>

<style scoped></style>

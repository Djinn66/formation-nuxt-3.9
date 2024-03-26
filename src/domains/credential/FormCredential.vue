<script setup lang="ts">
  import type {CredentialsInterface} from '~/types/credentials'
  import {FORM_VALIDATIONS_RULES} from '~/constants/formValidationsRules.const'
  const credentials = defineModel<CredentialsInterface>({required: true})
</script>

<template>
  <VTextField
    v-model="credentials.email"
    :rules="[FORM_VALIDATIONS_RULES.required, FORM_VALIDATIONS_RULES.email]"
    label="Identifiant"
  />
  <VTextField
    v-model="credentials.password"
    label="Mot de passe"
    :rules="[FORM_VALIDATIONS_RULES.required]"
    type="password"
  />
</template>

<style scoped></style>

<script setup lang="ts">
  import type {UserInterface} from '~/types/user'
  import {FORM_VALIDATIONS_RULES} from '~/constants/formValidationsRules.const'
  /** CONFIG **/
  const listSelect = [
    {id: 1, text: 'Homme', value: 'male'},
    {id: 2, text: 'Femme', value: 'female'},
  ]
  /** PROPS **/
  interface Props {
    modelValue: unknown
  }
  const props = defineProps<Props>()

  /** EMITS **/
  type Emits = {
    'update:modelValue': [value: UserInterface | Omit<UserInterface, 'id'>]
  }
  const emit = defineEmits<Emits>()

  /** REFS **/
  const passwordVisible = ref(false)

  /** COMPUTED **/
  const user = computed({
    get: () => props.modelValue as UserInterface | Omit<UserInterface, 'id'>,
    set: (value) => emit('update:modelValue', value),
  })

  const computedIconPassword = computed(() =>
    passwordVisible.value ? 'mdi-eye' : 'mdi-eye-off',
  )
</script>

<template>
  <v-text-field
    v-model="user.lastName"
    :rules="[FORM_VALIDATIONS_RULES.required]"
    label="Nom"
  />
  <v-text-field
    v-model="user.firstName"
    label="Prénom"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-select
    v-model="user.gender"
    :items="listSelect"
    item-title="text"
    item-value="value"
    label="Genre"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    v-model="user.email"
    label="Mail"
    :rules="[FORM_VALIDATIONS_RULES.required, FORM_VALIDATIONS_RULES.email]"
    type="email"
  />
  <v-text-field
    v-model="user.phone"
    label="Téléphone"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    v-model="user.password"
    label="Mot de passe"
    :type="passwordVisible ? 'text' : 'password'"
  >
    <template v-slot:append-inner>
      <v-icon
        @click="passwordVisible = !passwordVisible"
        :icon="computedIconPassword"
      />
    </template>
  </v-text-field>
  <v-checkbox
    v-model="user.admin"
    label="Administrateur"
  />
</template>

<style scoped></style>

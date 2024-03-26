<script setup lang="ts">
  import type {ColorMode} from '~/types/colorMode'

  const darkMode = defineModel<ColorMode>({required: true})

  const handleClick = () => {
    darkMode.value = darkMode.value === 'light' ? 'dark' : 'light'
  }
  const icon = computed(() =>
    darkMode.value === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night',
  )
</script>

<template>
  <VBtn
    :icon="icon"
    @click="handleClick"
  />
</template>

<style scoped></style>

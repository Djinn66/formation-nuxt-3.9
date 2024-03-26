<script setup lang="ts">
  import AppDarkModeBtn from '~/components/AppDarkModeBtn.vue'

  const darkMode = ref<'light' | 'dark'>('dark')
</script>
<template>
  <VApp :theme="darkMode">
    <VLayout class="rounded rounded-md">
      <AppDarkModeBtn v-model="darkMode" />
      <VMain
        class="d-flex align-center justify-center"
        style="min-height: 300px"
      >
        <slot />
      </VMain>
    </VLayout>
  </VApp>
</template>

<style>
  html {
    overflow: auto;
  }
</style>

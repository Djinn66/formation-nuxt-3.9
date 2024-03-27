<script setup lang="ts">

</script>
<template>
  <VApp >
    <VLayout class="rounded rounded-md">
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

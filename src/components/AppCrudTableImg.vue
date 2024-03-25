<script setup lang="ts">
  /**  CONFIG  **/

  /**  PROPS  **/
  interface Props {
    value: string
    maxWidth?: string
    maxHeight?: string
  }
  withDefaults(defineProps<Props>(), {
    maxWidth: '100px',
    maxHeight: '100px',
  })
</script>
<template>
  <v-img
    :src="value"
    :max-width="maxWidth"
    :max-height="maxHeight"
  >
    <template #sources>
      <source :srcset="value" />
    </template>
  </v-img>
</template>
<style scoped></style>

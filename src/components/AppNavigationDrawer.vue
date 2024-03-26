<script setup lang="ts">
  import {appMenuConst} from '~/src/constants/appMenu.const'
</script>
<template>
  <VNavigationDrawer class="position-fixed">
    <VList>
      <VListItem
        v-for="link in appMenuConst"
        :key="JSON.stringify(link)"
        :title="link.name"
        :to="link.url"
        :prepend-icon="link.icon"
        active-class="text-warning"
      />
    </VList>
  </VNavigationDrawer>
</template>

<style scoped></style>

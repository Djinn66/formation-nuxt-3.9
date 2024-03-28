<script setup lang="ts">
  import {appMenuConsultConst} from '~/constants/appMenu.const'
</script>

<template>
  <VNavigationDrawer
    class="position-fixed"
    color="bg_menu"
  >
    <VList>
      <VListItem
        lines="three"
        prepend-avatar=""
        title="l.dupont"
      >
        <p class="subtitle">Administrator</p>
      </VListItem>
      <VDivider style="margin-bottom: 20px"/>
      <VListItem
        v-for="link in appMenuConsultConst"
        :key="JSON.stringify(link)"
        :title="link.name"
        :to="link.url"
        :prepend-icon="link.icon"
        active-class="text-selectedText"
      />
    </VList>
    <template #append>
      <VDivider/>
      <VBtn
        class="spacer"
        :block="true"
        text="LOGOUT"
        variant="text"
      />
    </template>
  </VNavigationDrawer>
</template>

<style scoped>
  .spacer {
    margin-top: 2px;
    margin-bottom: 2px;
  }

  .subtitle {
    color: #FFFFFF80;
    font-size: 15px;
    margin-top: 3px;
    font-weight: lighter
  }
</style>

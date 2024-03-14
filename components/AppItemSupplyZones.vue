<script setup lang="ts">
  import type {SupplyZone} from '~/types/supplyZones'

  const zones = defineModel<SupplyZone[]>()
</script>

<template>
  <VListItem
    v-if="zones && zones.length > 0"
    v-for="zone in zones"
    :key="zone.id"
    :title="zone.name"
    :subtitle="zone.code"
    variant="elevated"
    rounded
    elevation="3"
    lines="two"
    class="listItem"
  >
    <template v-slot:prepend="{isActive}">
      <VListItemAction start>
        <VCheckboxBtn :model-value="isActive" />
      </VListItemAction>
    </template>

    <template v-slot:append>
      <VTextField
        variant="outlined"
        type="datetime-local"
        class="date-textfield"
        style="margin-left: 30px"
      />

      <VTextField
        variant="outlined"
        type="datetime-local"
        class="date-textfield"
      ></VTextField>
    </template>
  </VListItem>
  <VListItem v-else>No values</VListItem>
</template>

<style scoped>
  .listItem {
    margin: 0 10px 10px 10px;
  }
  .date-textfield {
    display: flex;
  }
</style>

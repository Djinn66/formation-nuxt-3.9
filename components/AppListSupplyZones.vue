<script setup lang="ts">
  import type {SupplyZone} from '~/types/supplyZones'
  const zones: SupplyZone[] = [
    {
      id: 1,
      name: 'Zone 1',
      code: '31T05034001230000',
    },
    {
      id: 2,
      name: 'Zone 2',
      code: '31T05034001230000',
    },
    {
      id: 3,
      name: 'Zone 3',
      code: '31T05034001230000',
    },
  ]

  const newSupplyZones = ref<SupplyZone[]>([])

  function addNewSupplyZones() {
    let idCalcule: number
    if (newSupplyZones.value.length > 0) {
      idCalcule = newSupplyZones.value[newSupplyZones.value.length - 1].id + 1
    } else {
      idCalcule = 1
    }

    newSupplyZones.value.push({
      id: idCalcule,
      name: 'New Zone ' + idCalcule,
      code: '31T05034001230000',
    })
  }
</script>

<template>
  <VList rounded>
    <VListSubheader title="Select supply zones" />
    <AppItemSupplyZones v-model="zones" />
    <VListItem style="display: flex; justify-content: center">
      <VBtn
        color="primary"
        @click="addNewSupplyZones"
        >Add</VBtn
      >
    </VListItem>
    <AppItemNewSupplyZones v-model="newSupplyZones" />
  </VList>
</template>

<style scoped></style>

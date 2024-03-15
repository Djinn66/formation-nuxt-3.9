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

  const searchZones = ref<string>('')

  const filteredZones = computed(() => {
    if (searchZones.value !== '')
      return zones.filter((zone) =>
        zone.name.toLowerCase().includes(searchZones.value.toLowerCase()),
      )
    else return zones
  })

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

  function accept() {
    console.log('TODO')
  }
  function cancel() {
    console.log('TODO')
  }
</script>

<template>
  <VList
    rounded
    variant="elevated"
    elevation="5"
    style="text-align: center; min-width: 700px"
  >
    <VListItem variant="flat">
      <template v-slot:prepend> Select supply zones </template>
      <template v-slot:append>
        <VTextField
          v-model="searchZones"
          label="Search zone"
          density="compact"
          variant="outlined"
          style="min-width: 200px"
        />
      </template>
    </VListItem>
    <AppItemSupplyZones v-model="filteredZones" />
    <AppItemNewSupplyZones v-model="newSupplyZones" />
    <VBtn
      color="primary"
      @click="addNewSupplyZones"
      >Add</VBtn
    >
    <VListItemAction
      end
      style="justify-content: end; margin-right: 10px"
    >
      <VBtn
        @click="cancel"
        variant="flat"
        >Cancel</VBtn
      >
      <VBtn
        @click="accept"
        color="primary"
        style="margin-left: 10px"
        >Accept</VBtn
      >
    </VListItemAction>
  </VList>
</template>

<style scoped></style>

<script setup lang="ts">
  import type {SupplyZone} from '~/types/supplyZones'

  const newSupplyZones = defineModel<SupplyZone[]>()
</script>

<template>
  <VListItem
    v-for="newZone in newSupplyZones"
    :key="newZone.id"
    variant="elevated"
    rounded
    elevation="3"
    lines="two"
    class="listItem"
  >
    <VListItemTitle>
      <VRow>
        <VCol>
          <VTextField
            variant="outlined"
            label="Zone name"
            v-model="newZone.name"
            clearable
            class="textfield"
          />
          <VTextField
            variant="outlined"
            label="Start"
            type="datetime-local"
            class="textfield"
          />
        </VCol>

        <VCol>
          <VTextField
            variant="outlined"
            label="Location"
            v-model="newZone.code"
            append-inner-icon="mdi-map-marker"
            class="textfield"
          />
          <VTextField
            variant="outlined"
            label="End"
            type="datetime-local"
            class="textfield"
          />
        </VCol>
      </VRow>
    </VListItemTitle>
    <template v-slot:append>
      <VBtn
        variant="flat"
        icon="mdi-close"
        @click="newSupplyZones?.splice(newSupplyZones.indexOf(newZone), 1)"
      ></VBtn>
    </template>
  </VListItem>
</template>

<style scoped>
  .listItem {
    margin: 0 10px 10px 10px;
  }
  .textfield {
    padding-top: 10px;
  }
</style>

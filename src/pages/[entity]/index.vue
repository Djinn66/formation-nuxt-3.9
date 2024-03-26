<script setup lang="ts" generic="T extends EntityInterface">
  import type {EntityInterface} from '~/src/types/entity'
  import type {KeyFromEntities} from '~/src/types/keyFromEntities'
  import {useFetchEntityStore} from '~/src/stores/fetchEntityStore'
  import {domains} from '~/src/domains'

  /** CONFIG **/
  const {entity} = useRoute().params as {entity: string}

  /** STORES **/
  const storeEntity = useFetchEntityStore<T>(entity)
  const {data, pending, error} = storeToRefs(storeEntity)
  const {refreshData} = storeEntity

  onBeforeMount(() => {
    refreshData()
  })
</script>

<template>
  <AppCrudTable
    :title="domains[entity as KeyFromEntities].titles.tableTitle"
    :data="data"
    :headers="domains[entity as KeyFromEntities].tableHeadersConst"
    :loading="pending"
    :error="error"
  >
    <template
      v-for="template in domains[entity as KeyFromEntities]
        .dataTableTemplatesConst"
      v-slot:[template.key]="props"
    >
      <component
        :is="template.component"
        v-bind="
          Object.assign(
            template.props ?? {},
            props,
            'target' in template && template.target
              ? {[template.target]: props.value}
              : {},
          )
        "
        v-on="
          'handlers' in template && template.handlers ? template.handlers : {}
        "
      />
    </template>
  </AppCrudTable>
</template>

<style scoped></style>

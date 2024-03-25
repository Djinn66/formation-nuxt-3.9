<script setup lang="ts" generic="T">
  /**  CONFIG  **/
  import {domains} from '~/domains'
  import type {KeyFromEntities} from '~/types/keyFromEntities'
  import {Methods} from '~/constants/httpMethods.const'

  const runtimeConfig = useRuntimeConfig()
  const activeModePopup = ref(runtimeConfig.public.MODE_DIALOG === 'true')

  /**  PROPS  **/
  interface Props {
    item: T
    deleteItemFunction: (item: T) => Promise<void>
    entity: string
  }
  const props = defineProps<Props>()

  /**  EMITS  **/

  type Emits = {
    delete: [T]
    edit: [T]
  }
  const emit = defineEmits<Emits>()

  /**  REFS  **/
  const dialogDelete = ref(false)
  const dialogDeleteIsLoading = ref(false)
  const dialogEdit = ref(false)
  const data = ref(
    JSON.parse(JSON.stringify(props.item as {T: any; id: number})),
  )
  const url = `/api/${props.entity}/${data.value.id}`

  /**  STORES  **/
  const {putMessage} = useSnackbar()
  const {forceRefresh} = useFetchEntityStore(props.entity)

  /**  FETCH  **/

  const {execute} = useFetch(url, {
    method: Methods.PUT,
    immediate: false,
    watch: false,
    body: data,
    onResponse({response}) {
      if (response.ok) {
        forceRefresh()
        putMessage(`Modification effectuée`)
        dialogEdit.value = false
      } else {
        putMessage('Une erreur est survenue', 'error')
      }
    },
  })

  /**  METHODS  **/
  const handleClickEdit = () => {
    if (activeModePopup.value) {
      dialogEdit.value = true
    } else {
      emit('edit', props.item)
    }
  }

  /**
   * Ouvre la confirmation de suppression pour l'élément spécifié.
   *
   * @return void
   */
  const openDialogDelete = () => {
    dialogDelete.value = true
  }

  /**
   * Gère la validation de la suppression.
   */
  const handleValidateDelete = async () => {
    if (props.item) {
      dialogDeleteIsLoading.value = true
      props
        .deleteItemFunction(props.item)
        .then(() => {
          forceRefresh()
          dialogDelete.value = false
        })
        .catch()
        .finally(() => {
          dialogDeleteIsLoading.value = false
        })
    }
  }
</script>
<template>
  <div>
    <v-icon
      size="small"
      class="me-2"
      @click="handleClickEdit"
      icon="mdi-pencil"
    />
    <v-icon
      size="small"
      @click="openDialogDelete"
      icon="mdi-delete"
    />
    <app-crud-table-delete-dialog
      v-model="dialogDelete"
      :loading="dialogDeleteIsLoading"
      @validate="handleValidateDelete"
    />
    <VDialog
      v-model="dialogEdit"
      width="40%"
    >
      <AppFormLayout
        width="100%"
        :title="domains[entity as KeyFromEntities].titles.tableTitle"
        subtitle="Modification"
        :submit="execute"
        @cancel="dialogEdit = false"
      >
        <component
          :is="domains[entity as KeyFromEntities].FormComponent"
          v-model="data"
        />
      </AppFormLayout>
    </VDialog>
  </div>
</template>
<style scoped></style>

<template>
  <q-dialog :model-value="open" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Task name</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="localTask.name"
          autofocus
          @keyup.enter="submit"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" @click="onClose()" />
        <q-btn flat label="Add task" @click="submit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  open: Boolean,
  newTask: Object,
  onAdd: Function,
  onClose: Function
})

// copia local (MUY importante)
const localTask = reactive({ ...props.newTask })

watch(
  () => props.newTask,
  (val) => Object.assign(localTask, val)
)

const submit = () => {
  if (!localTask.name.trim()) return
  props.onAdd({ ...localTask })
}
</script>
<script setup>
import { ref, reactive, watch } from 'vue'
import { useTaskStore } from 'src/stores/task'
import AddTaskDialog from 'src/components/AddTaskDialog.vue'
const taskStore = useTaskStore();
// Basic Alert




const addDialog = ref(false)
const showDeleteDialog = ref(false);
const showEditDialog = ref(false);
const selectedTask = ref(null);
const tasks = taskStore.tasks

const formTask = reactive({
  id: null,
  name: '',
  completed: false,
  dueDate: '',
  dueTime: ''
})

const addTask = (newTask) => {
  if (newTask.name.trim() === '') {
    return
  }
  const id = taskStore.tasks.length ? Math.max(...taskStore.tasks.map(t => t.id)) + 1 : 1
  newTask = {
    id: id,
    name: newTask.name,
    completed: false,
    dueDate: new Date().toISOString().split('T')[0],
    dueTime: new Date().toTimeString().split(' ')[0].slice(0,5)
  }
  taskStore.tasks.push(newTask)
  closeAddDialog();
}

const clearNewTask = () => {
  formTask.value = {
    id: null,
    name: '',
    completed: false,
    dueDate: '',
    dueTime: ''
  }
}

const closeAddDialog = () => {
  addDialog.value = false;
  clearNewTask();
};
const confirmDelete = (task) => {
    selectedTask.value = { ...task };
    showDeleteDialog.value = true
};

const editTask = (task) => {
    selectedTask.value = { ...task };
    showEditDialog.value = true;
};

const closeDeleteDialog = () => {
    selectedTask.value = null;
    showDeleteDialog.value = false;
};

const closeEditDialog = () => {
    selectedTask.value = null;
    showEditDialog.value = false;
    clearNewTask();
};

const updateTask = () => {
  if (!selectedTask.value) return;
  if (selectedTask.value.name.trim() === '') {
    return;
  }
  const index = taskStore.tasks.findIndex(t => t.id === selectedTask.value.id);
  if (index !== -1) {
    taskStore.tasks[index].name = selectedTask.value.name;
  }
  closeEditDialog();
}

// Borrar la tarea
const deleteTask = () => {
  if (!selectedTask.value) return;
  taskStore.tasks.splice(
    taskStore.tasks.findIndex(t => t.id === selectedTask.value.id),
    1
  );
  closeDeleteDialog();
}

watch(
  () => taskStore.tasks,
  () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },
  { deep: true }
)

const debug = () => {
  alert("Tasks status:" + JSON.stringify({tasks: tasks}, null, 4))
}

const unduTask = (task) => {
  const index = taskStore.tasks.findIndex(t => t.id === task.id);
  if (index !== -1) {
    taskStore.tasks[index].completed = false;
  }
}

const doTask = (task) => {
  const index = taskStore.tasks.findIndex(t => t.id === task.id);
  if (index !== -1) {
    if (taskStore.tasks[index].completed) {
      return
    }
    taskStore.tasks[index].completed = true;
  }
}

</script>
<template>


  <div class="q-pa-md">
    <div class="row">
      <q-btn label="debug" color="primary" class="q-mb-md" @click="debug"/>
      <q-btn label="Add" color="primary" class="q-mb-md" @click="addDialog = true" />
    </div>
    <q-list bordered padding>
    <!-- <q-select rounded standout v-model="selectedTask" :options="tasksOptions" label="Select Task (for fun)" /> -->


      <q-item 
        v-for="task in tasks" 
        :key="task.id" 
        clickable 
        @click="doTask(task)"
        class="bg-deep-purple-10"
        dark
        v-ripple
        :class="{ 'task-completed': task.completed }"
      >
        <q-item-section side top v-if="!task.completed">
          <q-checkbox dark v-model="task.completed" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ task.name }}</q-item-label>
          <q-item-label caption>
            Desctription for {{ task.name }}
          </q-item-label>
        </q-item-section>

        <q-item-section side class="time">
          <div class="row">

            <q-icon name="event" />
            <div class="column justify-center q-ml-sm">
              
              <q-item-label>{{ task.dueDate }}</q-item-label>
              <q-item-label caption lines="2">{{ task.dueTime }}</q-item-label>
              
            </div>

          </div>
        </q-item-section>
        <!-- UNDO TASK -->
        <q-item-section side top v-if="task.completed">
          <q-btn 
            dense 
            flat 
            round 
            color="primary" 
            icon="undo" 
            @click.stop="unduTask(task)" 
          />
        </q-item-section>

        <!-- EDIT -->
        <q-item-section side top v-if="!task.completed">
          <q-btn 
            dense 
            flat 
            round 
            color="warning" 
            icon="edit" 
            @click.stop="editTask(task)" 
          />
        </q-item-section>

        <!-- DELETE -->
        <q-item-section side top v-if="!task.completed">
          <q-btn 
            dense 
            flat 
            round 
            color="negative" 
            icon="delete" 
            @click.stop="confirmDelete(task)" 
          />
        </q-item-section>

      </q-item>

    </q-list>
    
  </div>


  <AddTaskDialog
    :open="addDialog"
    :new-task="formTask"
    :on-add="addTask"
    :on-close="closeAddDialog"
  />
  <!-- Dialog de confirmación -->
  <q-dialog v-model="showDeleteDialog" persistent @hide="closeDeleteDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Delete Task?</div>
        <div>Are you sure you want to delete "{{ selectedTask?.name }}"?</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="closeDeleteDialog" />
        <q-btn flat label="Delete" color="negative" @click="deleteTask" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Dialog de edicion -->
  <q-dialog v-model="showEditDialog" persistent @hide="closeEditDialog">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Task name</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="selectedTask.name" autofocus @keyup.enter="updateTask" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Update task" @click="updateTask" />
      </q-card-actions>
    </q-card>
  </q-dialog>



</template>

<style scoped>
.task-completed {
  text-decoration: line-through;
  opacity: 0.6;
}

</style>
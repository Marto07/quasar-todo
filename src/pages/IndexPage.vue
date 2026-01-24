<script setup>
import { computed } from 'vue'
import { useTaskStore } from 'src/stores/task'

// 👇 imports obligatorios de echarts
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 👇 registro de lo que vas a usar
use([
  PieChart,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer
])

const taskStore = useTaskStore()

// cálculos
const completedCount = computed(
  () => taskStore.tasks.filter(t => t.completed).length
)

const pendingCount = computed(
  () => taskStore.tasks.filter(t => !t.completed).length
)

// configuración del gráfico
const chartOption = computed(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    bottom: '0'
  },
  series: [
    {
      type: 'pie',
      radius: '65%',
      data: [
        { value: completedCount.value, name: 'Completadas' },
        { value: pendingCount.value, name: 'Pendientes' }
      ],
      label: {
        formatter: '{b}: {d}%'
      }
    }
  ]
}))
</script>

<template>
  <q-card flat bordered class="q-pa-md">
    <div class="text-h6 q-mb-md">Progreso de tareas</div>

    <VChart
      :option="chartOption"
      autoresize
      style="height: 300px"
    />
  </q-card>
</template>

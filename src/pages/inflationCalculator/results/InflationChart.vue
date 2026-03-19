<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useInflationStore } from '@/stores/inflationCalculator/inflationCalculator'
import { COLORS } from '@/constants/colors'
import {
  Chart,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import type { TooltipItem, ChartDataset } from 'chart.js'


import BaseButton from "@/components/base/ui/BaseButton.vue";
import BaseFlex from "@/components/base/layout/BaseFlex.vue";
import BaseText from "@/components/base/text/BaseText.vue";

Chart.register(
    BarElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Filler,
)

const store = useInflationStore()
const canvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const chartType = ref<'bar' | 'rounded'>('rounded')

const labels = computed(() => store.yearlyBreakdown.map((d) => String(d.year)))

const inflationRates = computed(() => store.yearlyBreakdown.map((d) => d.rate))

const values = computed(() => store.yearlyBreakdown.map((d) => d.value))

function buildChart() {
  if (!canvasRef.value) return
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }

  chartInstance = new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels: labels.value,
      datasets: [
        {
          label: 'Inflation Rate %',
          data: inflationRates.value,
          backgroundColor: inflationRates.value.map((r) =>
              r >= 0 ? COLORS.ACCENT : COLORS.WARNING
          ),
          borderRadius: chartType.value === 'rounded' ? 6 : 0,
          yAxisID: 'y',
        },
        {
          label: 'Amount Value ֏',
          data: values.value,
          type: 'line' as any,
          borderColor: COLORS.SECONDARY,
          backgroundColor: 'rgba(61,120,17,0.08)',
          fill: true,
          tension: 0.4,
          pointRadius: 2,
          yAxisID: 'y1',
        },
      ],
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: { color: COLORS.MUTED, font: { family: 'IBM Plex Mono', size: 11 } },
        },
        tooltip: {
          callbacks: {
            label: (ctx: TooltipItem<'bar'>) => {
              const y = ctx.parsed?.y ?? 0
              if (ctx.datasetIndex === 0) return ` ${y.toFixed(1)}%`
              return ` ֏${y.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
            },
          },
        },
      },
      scales: {
        x: {
          ticks: { color: COLORS.MUTED, font: { family: 'IBM Plex Mono', size: 10 } },
          grid: { color: 'rgba(0,0,0,0.04)' },
        },
        y: {
          position: 'left',
          ticks: { color: COLORS.MUTED, font: { family: 'IBM Plex Mono', size: 10 } },
          grid: { color: 'rgba(0,0,0,0.04)' },
        },
        y1: {
          position: 'right',
          ticks: { color: COLORS.SECONDARY, font: { family: 'IBM Plex Mono', size: 10 } },
          grid: { drawOnChartArea: false },
        },
      },
    },
  })
}

function updateChart() {
  if (!chartInstance) return
  chartInstance.data.labels = labels.value

  const barDataset = chartInstance.data.datasets[0] as ChartDataset<'bar'>
  barDataset.data = inflationRates.value
  barDataset.borderRadius = chartType.value === 'rounded' ? 6 : 0
  barDataset.backgroundColor = inflationRates.value.map((r) =>
      r >= 0 ? COLORS.ACCENT : COLORS.WARNING
  )

  chartInstance.data.datasets[1].data = values.value
  chartInstance.update()
}

watch([() => store.yearlyBreakdown, chartType], updateChart, { deep: true })

onMounted(buildChart)
onUnmounted(() => chartInstance?.destroy())
</script>

<template>
  <div
      class="rounded-xl p-4"
      style="
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      border: 1px solid rgba(99, 179, 237, 0.09);
    "
  >
    <BaseFlex justify="between" align="center" class="mb-4">
      <BaseText tag="span" variant="kpi-label" color="MUTED">Inflation Overview</BaseText>
    </BaseFlex>

    <canvas ref="canvasRef" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useInflationStore } from '@/stores/inflationCalculator/inflationCalculator'
import { COLORS } from '@/constants/colors'

import BaseFlex from '@/components/base/layout/BaseFlex.vue'
import BaseHeading from '@/components/base/text/BaseHeading.vue'
import BaseStatRow from '@/components/shared/BaseStatRow.vue'
import SectionCard from '@/components/shared/SectionCard.vue'

import InflationAmountInput from './inputs/InflationAmountInput.vue'
import YearRangeSelector from './inputs/YearRangeSelector.vue'
import DirectionToggle from './inputs/DirectionToggle.vue'
import InflationSummaryCards from './results/InflationSummaryCards.vue'
import InflationChart from './results/InflationChart.vue'

const store = useInflationStore()

const inflationStats = computed(() => [
  {
    value: `${store.fromYear} → ${store.toYear}`,
    label: 'period',
    color: COLORS.CONTENT,
  },
  {
    value: `${store.summary.averageAnnualRate.toFixed(1)}%`,
    label: 'avg. annual rate',
    color: COLORS.SECONDARY,
  },
  {
    value: `${store.summary.totalInflationPercent.toFixed(0)}%`,
    label: 'cumulative',
    color: COLORS.WARNING,
  },
])
</script>

<template>
  <SectionCard padding="p-5 sm:p-6 md:p-8" class="w-full h-fit max-w-3xl">
    <div class="flex flex-col gap-6">

      <InflationAmountInput />
      <YearRangeSelector />
      <DirectionToggle />

      <InflationSummaryCards />
      <!-- <InflationChart /> -->
    </div>
  </SectionCard>
</template>

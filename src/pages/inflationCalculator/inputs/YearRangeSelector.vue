<script setup lang="ts">
import { useInflationStore } from '@/stores/inflationCalculator/inflationCalculator'
import { useInflationYears } from '@/composables/features/inflation/useInflationYears'

import SectionCard from '@/components/shared/SectionCard.vue'
import BaseFlex from '@/components/base/layout/BaseFlex.vue'
import BaseText from '@/components/base/text/BaseText.vue'

const store = useInflationStore()
const { fromYearOptions, toYearOptions, setFromYear, setToYear } = useInflationYears()
</script>

<template>
  <BaseFlex col gap="4" align="stretch">

    <BaseFlex col align="start" gap="1" class="flex-1">
      <BaseText tag="p" variant="hint" color="MUTED">Սկսած</BaseText>
      <div class="relative w-full">
        <select
          class="w-full rounded-md font-ibm-mono text-sm bg-app-bg text-app-content px-3 py-2 appearance-none pr-8"
          style="border: 1px solid rgba(99,179,237,0.15); outline: none;" :value="store.fromYear"
          @change="setFromYear(Number(($event.target as HTMLSelectElement).value))">
          <option v-for="year in fromYearOptions" :key="year" :value="year">
            {{ year }}
          </option>
        </select>

        <!-- Custom arrow, adjust `right-2` to control position -->
        <span class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-app-content opacity-60">
          ▾
        </span>
      </div>
    </BaseFlex>

    <BaseFlex col align="start" gap="1" class="flex-1">
      <BaseText tag="p" variant="hint" color="MUTED">Մինչ</BaseText>
      <div class="relative w-full">
        <select
          class="w-full rounded-md font-ibm-mono text-sm bg-app-bg text-app-content px-3 py-2 appearance-none pr-8"
          style="border: 1px solid rgba(99,179,237,0.15); outline: none;" :value="store.toYear"
          @change="setToYear(Number(($event.target as HTMLSelectElement).value))">
          <option v-for="year in toYearOptions" :key="year" :value="year">
            {{ year }}
          </option>
        </select>

        <span class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-app-content opacity-60">
          ▾
        </span>
      </div>
    </BaseFlex>

  </BaseFlex>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useInflationStore } from '@/stores/inflationCalculator/inflationCalculator'
import { formatNumber } from '@/utils/format'
import { COLORS } from '@/constants/colors'

import BaseText from '@/components/base/text/BaseText.vue'
import BaseFlex from '@/components/base/layout/BaseFlex.vue'

const store = useInflationStore()

const fmt = (value: number) => `֏${formatNumber(value, 0)}`

interface KpiCard {
  label: string
  value: string
  sub: string
  color: string
  icon: string
}

const cards = computed<KpiCard[]>(() => {
  const s = store.summary
  const isForward = store.direction === 'forward'

  return [
    {
      label: isForward ? 'Կարգավորված արժեք' : 'Անցյալ համարժեք',
      value: fmt(s.adjustedAmount),
      sub: isForward ? `${store.toYear} թվականի գումարով` : `${store.fromYear} թվականի գումարով`,
      color: COLORS.DEEP,
      icon: '◈',
    },
    {
      label: 'Գնողունակության փոփոխություն',
      value: `${s.purchasingPowerChange >= 0 ? '+' : ''}${fmt(s.purchasingPowerChange)}`,
      sub: `(${s.totalInflationPercent >= 0 ? '+' : ''}${s.totalInflationPercent.toFixed(1)}%)`,
      color: s.purchasingPowerChange >= 0 ? COLORS.WARNING : COLORS.SECONDARY,
      icon: '〜',
    },
    {
      label: 'Ընդհանուր գնաճ',
      value: `${s.totalInflationPercent.toFixed(1)}%`,
      sub: `${s.years} տարվա ընթացքում`,
      color: COLORS.SECONDARY,
      icon: '◌',
    },
    {
      label: 'Գնաճի միջին տարեկան տեմպ',
      value: `${s.averageAnnualRate.toFixed(2)}%`,
      sub: 'տարեկան միջինը',
      color: COLORS.MUTED,
      icon: '▷',
    },
  ]
})
</script>

<template>
  <div class="w-full border border-[#E8EEF6] rounded-sm p-5 flex flex-col gap-4 transition-all duration-200"
    style="background: #F7F8FA;">
    <div v-for="(card, index) in cards" :key="card.label" class="pb-3 flex flex-col sm:flex-row justify-between last:border-b-0 last:pb-0"
      :style="index < cards.length - 1 ? 'border-bottom: 1px solid rgba(255,255,255,0.08)' : ''">
      <BaseFlex gap="2">
        <BaseText tag="span" variant="kpi-icon" :rawColor="card.color">
          {{ card.icon }}
        </BaseText>
        <BaseText tag="span" variant="kpi-label" color="MUTED">
          {{ card.label }}
        </BaseText>
      </BaseFlex>

      <BaseFlex gap="2">
        <BaseText tag="span" variant="kpi-value" :rawColor="card.color">
          {{ card.value }}
        </BaseText>

        <BaseText tag="span" variant="footnote" color="DEEP" class="leading-tight truncate">
          {{ card.sub }}
        </BaseText>
      </BaseFlex>
    </div>
  </div>
</template>

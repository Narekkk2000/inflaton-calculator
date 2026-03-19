<script setup lang="ts">
import { useInflationStore } from '@/stores/inflationCalculator/inflationCalculator'
import { INFLATION_DIRECTION_OPTIONS } from '@/constants/inflationOptions'
import { COLORS } from '@/constants/colors'
import type { InflationDirection } from '@/types/inflation'

import SectionCard from '@/components/shared/SectionCard.vue'
import BaseButton  from '@/components/base/ui/BaseButton.vue'
import BaseText    from '@/components/base/text/BaseText.vue'
import BaseFlex    from '@/components/base/layout/BaseFlex.vue'
import BaseHeading from '@/components/base/text/BaseHeading.vue'

const store = useInflationStore()
</script>

<template>
    <div class="flex flex-col gap-2">
      <BaseHeading>Ուղղություն</BaseHeading>
      <BaseButton
          v-for="opt in INFLATION_DIRECTION_OPTIONS"
          :key="opt.value"
          variant="card-select"
          :active="store.direction === opt.value"
          @click="store.direction = opt.value as InflationDirection"
      >
        <BaseFlex gap="2" class="mb-2">
          <BaseText variant="icon-glyph" :rawColor="store.direction === opt.value ? COLORS.ACCENT : COLORS.MUTED">
            {{ opt.icon }}
          </BaseText>
          <BaseText variant="card-title" :rawColor="store.direction === opt.value ? COLORS.CONTENT : COLORS.MUTED">
            {{ opt.label }}
          </BaseText>
        </BaseFlex>
        <BaseText tag="p" variant="footnote" color="MUTED" class="leading-snug">
          {{ opt.description }}
        </BaseText>
      </BaseButton>
    </div>
</template>

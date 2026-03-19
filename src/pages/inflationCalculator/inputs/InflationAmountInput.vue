<script setup lang="ts">
import { useInflationAmount } from '@/composables/features/inflation/useInflationAmount'
import { INFLATION_AMOUNT_PRESETS } from '@/constants/inflationOptions'
import { formatPresetLabel } from '@/utils/formatters'

import SectionCard from '@/components/shared/SectionCard.vue'
import InputField  from '@/components/shared/InputField.vue'
import BaseButton  from '@/components/base/ui/BaseButton.vue'
import BaseFlex    from '@/components/base/layout/BaseFlex.vue'
import BaseDivider from '@/components/base/ui/BaseDivider.vue'

const { localValue, validationError, onInput, isPresetActive, selectPreset } = useInflationAmount()
</script>

<template>
    <BaseFlex col align="start" gap="4">
      <InputField
          has-prefix
          label="Amount"
          type="number"
          inputmode="numeric"
          placeholder="1000000"
          label-margin-top="0px"
          label-margin-bottom="-10px"
          :model-value="localValue"
          :error="validationError"
          @update:model-value="onInput"
      >
        <template #prefix>֏</template>
      </InputField>

      <BaseFlex class="self-end" gap="2" wrap>
        <BaseButton
            v-for="preset in INFLATION_AMOUNT_PRESETS"
            :key="preset"
            variant="preset"
            :active="isPresetActive(preset)"
            @click="selectPreset(preset)"
        >
          {{ formatPresetLabel(preset) }}
        </BaseButton>
      </BaseFlex>
    </BaseFlex>
    <BaseDivider/>
</template>
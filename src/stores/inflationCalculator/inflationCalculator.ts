import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {armeniaInflationData, INFLATION_MAX_YEAR} from "@/constants/inflationOptions";
import type { InflationDirection } from '@/types/inflation'

// O(1) lookup by year — built once at module load
const inflationByYear = new Map<number, number>(
    armeniaInflationData.map((d) => [d.year, d.inflation])
)

export const useInflationStore = defineStore('inflationCalculator', () => {
    // ── State ───────────────────────────────────────────────────────────────────
    const amount = ref(1_000_000)
    const fromYear = ref(2000)
    const toYear = ref(INFLATION_MAX_YEAR)
    const direction = ref<InflationDirection>('forward')

    // ── Core calculation ────────────────────────────────────────────────────────
    // Cumulative multiplier between two years using chained inflation rates
    const getCumulativeMultiplier = (from: number, to: number): number => {
        let multiplier = 1
        for (let year = from; year < to; year++) {
            const rate = inflationByYear.get(year)
            if (rate !== undefined) {
                multiplier *= 1 + rate / 100
            }
        }
        return multiplier
    }

    // ── Getters ─────────────────────────────────────────────────────────────────
    const cumulativeMultiplier = computed(() =>
        getCumulativeMultiplier(fromYear.value, toYear.value)
    )

    // Forward: past amount → today's value
    // Backward: today's amount → past equivalent
    const adjustedAmount = computed(() => {
        if (direction.value === 'forward') {
            return amount.value * cumulativeMultiplier.value
        } else {
            return amount.value / cumulativeMultiplier.value
        }
    })

    const totalInflationPercent = computed(() =>
        (cumulativeMultiplier.value - 1) * 100
    )

    const purchasingPowerChange = computed(() =>
        adjustedAmount.value - amount.value
    )

    const averageAnnualRate = computed(() => {
        const years = toYear.value - fromYear.value
        if (years <= 0) return 0
        return (Math.pow(cumulativeMultiplier.value, 1 / years) - 1) * 100
    })

    // Year by year breakdown for chart
    const yearlyBreakdown = computed(() => {
        const result = []
        let runningValue = direction.value === 'forward'
            ? amount.value
            : amount.value / cumulativeMultiplier.value

        for (let year = fromYear.value; year <= toYear.value; year++) {
            const rate = inflationByYear.get(year) ?? 0

            result.push({
                year,
                value: runningValue,
                rate,
            })

            if (year < toYear.value) {
                runningValue *= 1 + rate / 100
            }
        }
        return result
    })

    const summary = computed(() => ({
        adjustedAmount: adjustedAmount.value,
        totalInflationPercent: totalInflationPercent.value,
        purchasingPowerChange: purchasingPowerChange.value,
        averageAnnualRate: averageAnnualRate.value,
        cumulativeMultiplier: cumulativeMultiplier.value,
        years: toYear.value - fromYear.value,
    }))

    return {
        // State
        amount,
        fromYear,
        toYear,
        direction,
        // Getters
        summary,
        yearlyBreakdown,
        adjustedAmount,
        totalInflationPercent,
        averageAnnualRate,
        cumulativeMultiplier,
    }
})
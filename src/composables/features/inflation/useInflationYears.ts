import { computed } from 'vue'
import { useInflationStore } from '@/stores/inflationCalculator/inflationCalculator'
import {INFLATION_MIN_YEAR, INFLATION_MAX_YEAR} from "@/constants/inflationOptions";

export const useInflationYears = () => {
    const store = useInflationStore()

    const fromYearOptions = computed(() => {
        const years = []
        for (let y = INFLATION_MIN_YEAR; y < store.toYear; y++) {
            years.push(y)
        }
        return years
    })

    const toYearOptions = computed(() => {
        const years = []
        for (let y = store.fromYear + 1; y <= INFLATION_MAX_YEAR; y++) {
            years.push(y)
        }
        return years
    })

    const setFromYear = (year: number) => {
        store.fromYear = year
        if (store.toYear <= year) {
            store.toYear = year + 1
        }
    }

    const setToYear = (year: number) => {
        store.toYear = year
        if (store.fromYear >= year) {
            store.fromYear = year - 1
        }
    }

    const yearRange = computed(() => toYearOptions.value.length)

    return {
        fromYearOptions,
        toYearOptions,
        setFromYear,
        setToYear,
        yearRange,
    }
}
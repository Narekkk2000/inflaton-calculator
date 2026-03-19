import { useInflationStore } from '@/stores/inflationCalculator/inflationCalculator'
import { useValidatedNumberField } from '@/composables/utils/useValidatedNumberField'
import { validateLoanAmount } from '@/utils/validators'
import {MAX_INFLATION_AMOUNT} from "@/constants/inflationOptions";

export const useInflationAmount = () => {
    const store = useInflationStore()

    const { localValue, validationError, onInput } = useValidatedNumberField({
        source:    () => store.amount,
        commit:    (n) => { store.amount = n },
        validator: (val) => validateLoanAmount(val, MAX_INFLATION_AMOUNT),
        parse:     (val) => parseFloat(val.replace(/\./g, '')),
    })

    const isPresetActive = (preset: number) => store.amount === preset

    const selectPreset = (preset: number) => {
        store.amount = preset
        localValue.value = String(preset)
        validationError.value = ''
    }

    return { localValue, validationError, onInput, isPresetActive, selectPreset }
}
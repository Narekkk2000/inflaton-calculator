import type { ArmeniaInflation, InflationDirection } from '@/types/inflation'

export const armeniaInflationData: ArmeniaInflation[] = [
    { year: 1993, inflation: 3732 },
    { year: 1994, inflation: 5273 },
    { year: 1995, inflation: 176.7 },
    { year: 1996, inflation: 18.7 },
    { year: 1997, inflation: 14 },
    { year: 1998, inflation: 8.7 },
    { year: 1999, inflation: 0.7 },
    { year: 2000, inflation: -0.8 },
    { year: 2001, inflation: 3.2 },
    { year: 2002, inflation: 1 },
    { year: 2003, inflation: 4.7 },
    { year: 2004, inflation: 6.9 },
    { year: 2005, inflation: 0.6 },
    { year: 2006, inflation: 2.9 },
    { year: 2007, inflation: 4.4 },
    { year: 2008, inflation: 9.1 },
    { year: 2009, inflation: 3.5 },
    { year: 2010, inflation: 8.2 },
    { year: 2011, inflation: 7.7 },
    { year: 2012, inflation: 2.5 },
    { year: 2013, inflation: 5.8 },
    { year: 2014, inflation: 3.0 },
    { year: 2015, inflation: 3.7 },
    { year: 2016, inflation: -1.4 },
    { year: 2017, inflation: 1.0 },
    { year: 2018, inflation: 2.5 },
    { year: 2019, inflation: 1.5 },
    { year: 2020, inflation: 1.4 },
    { year: 2021, inflation: 7.5 },
    { year: 2022, inflation: 8.8 },
    { year: 2023, inflation: 2.0 },
    { year: 2024, inflation: 0.4 },
    { year: 2025, inflation: 3.3 },
    { year: 2026, inflation: 3.8 },
]

export const INFLATION_MIN_YEAR = armeniaInflationData[0].year
export const INFLATION_MAX_YEAR = armeniaInflationData[armeniaInflationData.length - 1].year

export const MIN_INFLATION_AMOUNT = 1
export const MAX_INFLATION_AMOUNT = 1_000_000_000


export const INFLATION_DIRECTION_OPTIONS: {
    value: InflationDirection
    label: string
    description: string
    icon: string
}[] = [
    {
        value: 'forward',
        label: 'Անցյալի գումարն այսօր',
        description: 'Որքա՞ն կարժենար անցյալի գումարն այսօր',
        icon: '▶',
    },
    {
        value: 'backward',
        label: 'Այսօրվա գումարն անցյալում',
        description: 'Որքա՞ն է այսօրվա գումարի համարժեքն անցյալում',
        icon: '◀',
    },
]

export const INFLATION_AMOUNT_PRESETS = [100_000, 500_000, 1_000_000, 5_000_000, 10_000_000]
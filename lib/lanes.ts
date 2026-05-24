export type VehicleSize = 'sedan' | 'mid-suv' | 'full-suv' | 'hd'

export const VEHICLE_SIZES: { value: VehicleSize; label: string }[] = [
  { value: 'sedan', label: 'Sedan / Coupe' },
  { value: 'mid-suv', label: 'Mid SUV / Crossover' },
  { value: 'full-suv', label: 'Full SUV / Pickup' },
  { value: 'hd', label: 'HD Truck / Dually' },
]

export const BASE_RATES: Record<VehicleSize, number> = {
  sedan: 350,
  'mid-suv': 400,
  'full-suv': 450,
  hd: 525,
}

export interface Lane {
  id: string
  origin: string
  destination: string
  distance: number
  departureDays: string[]
  slotsRemaining?: number
}

export const LANES: Lane[] = [
  {
    id: 'hou-dal',
    origin: 'Houston',
    destination: 'Dallas',
    distance: 240,
    departureDays: ['Thu', 'Fri'],

    slotsRemaining: 3,
  },
  {
    id: 'hou-fw',
    origin: 'Houston',
    destination: 'Fort Worth',
    distance: 265,
    departureDays: ['Thu', 'Fri'],

    slotsRemaining: 2,
  },
  {
    id: 'hou-arl',
    origin: 'Houston',
    destination: 'Arlington',
    distance: 240,
    departureDays: ['Thu', 'Fri'],

    slotsRemaining: 4,
  },
]

export const ORIGINS = ['Houston', 'Dallas'] as const
export type Origin = (typeof ORIGINS)[number]

export function getDestinations(origin: Origin): string[] {
  if (origin === 'Houston') {
    return ['Dallas', 'Fort Worth', 'Arlington']
  }
  // From Dallas, only the Houston reverse leg is active
  return ['Houston']
}

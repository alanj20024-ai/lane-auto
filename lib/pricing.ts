import type { VehicleSize } from './lanes'
import { BASE_RATES } from './lanes'

export interface PriceCentsBreakdown {
  baseCents: number
  rushCents: number
  inoperableCents: number
  totalCents: number
}

const BASE_CENTS: Record<VehicleSize, number> = {
  sedan: 35000,
  'mid-suv': 40000,
  'full-suv': 45000,
  hd: 52500,
}

export function calculatePriceCents({
  sizeClass,
  pickupDate,
  isInoperable,
}: {
  sizeClass: VehicleSize
  pickupDate: string
  isInoperable: boolean
}): PriceCentsBreakdown {
  const baseCents = BASE_CENTS[sizeClass]
  const departure = parseDepartureDate(pickupDate)
  const hoursUntil = (departure.getTime() - Date.now()) / (1000 * 60 * 60)
  const rushCents = hoursUntil < 72 ? 12500 : 0
  const inoperableCents = isInoperable ? 17500 : 0
  return {
    baseCents,
    rushCents,
    inoperableCents,
    totalCents: baseCents + rushCents + inoperableCents,
  }
}

export interface PriceBreakdown {
  base: number
  rush: number
  inoperable: number
  total: number
}

export function calcPrice(
  vehicle: VehicleSize,
  departureDate: Date,
  inoperable: boolean,
): PriceBreakdown {
  const base = BASE_RATES[vehicle]
  const hoursUntil = (departureDate.getTime() - Date.now()) / (1000 * 60 * 60)
  const rush = hoursUntil < 72 ? 125 : 0
  const inoperableSurcharge = inoperable ? 175 : 0
  return {
    base,
    rush,
    inoperable: inoperableSurcharge,
    total: base + rush + inoperableSurcharge,
  }
}

export function getNextThursday(): string {
  const today = new Date()
  const day = today.getDay() // 0=Sun … 6=Sat
  // days until Thursday: Sun→4, Mon→3, Tue→2, Wed→1, Thu→0, Fri→6, Sat→5
  const daysToThursday = day <= 4 ? 4 - day : 11 - day
  const next = new Date(today)
  next.setDate(today.getDate() + daysToThursday)
  return toDateString(next)
}

export function toDateString(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function isValidDepartureDay(dateStr: string): boolean {
  const d = new Date(dateStr + 'T12:00:00')
  return d.getDay() === 4 || d.getDay() === 5 // Thu or Fri
}

export function parseDepartureDate(dateStr: string): Date {
  return new Date(dateStr + 'T08:00:00') // treat departure as 8am local
}

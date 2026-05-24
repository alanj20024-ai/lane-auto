import type { VehicleSize } from './lanes'
import { BASE_RATES } from './lanes'

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

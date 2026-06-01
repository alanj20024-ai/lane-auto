import { createServerClient } from './supabase'

export const CAPACITY = 8

export const LANE_DEFS = [
  { origin: 'Houston', destination: 'Dallas' },
  { origin: 'Houston', destination: 'Fort Worth' },
  { origin: 'Houston', destination: 'Arlington' },
] as const

export interface DepartureRow {
  date: string          // "2026-06-05"
  dayLabel: string      // "THU" | "FRI"
  dateLabel: string     // "Jun 5"
  origin: string
  destination: string
  slotsRemaining: number
  isFull: boolean
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function getUpcomingDates(): string[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dates: string[] = []

  for (let i = 1; i <= 14; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const day = d.getDay()
    if (day === 4 || day === 5) {
      const yyyy = d.getFullYear()
      const mm = String(d.getMonth() + 1).padStart(2, '0')
      const dd = String(d.getDate()).padStart(2, '0')
      dates.push(`${yyyy}-${mm}-${dd}`)
    }
  }
  return dates
}

export async function getDepartures(): Promise<DepartureRow[]> {
  const dates = getUpcomingDates()
  if (dates.length === 0) return []

  const sb = createServerClient()
  const { data: bookings } = await sb
    .from('bookings')
    .select('pickup_date, origin, destination')
    .in('pickup_date', dates)
    .eq('origin', 'Houston')
    .in('status', ['paid', 'carrier_assigned', 'in_transit', 'delivered'])

  const counts: Record<string, number> = {}
  for (const b of bookings ?? []) {
    const key = `${b.pickup_date}|${b.origin}|${b.destination}`
    counts[key] = (counts[key] ?? 0) + 1
  }

  const rows: DepartureRow[] = []
  for (const date of dates) {
    const d = new Date(date + 'T12:00:00')
    const dayLabel = d.getDay() === 4 ? 'THU' : 'FRI'
    const dateLabel = `${MONTHS[d.getMonth()]} ${d.getDate()}`

    for (const lane of LANE_DEFS) {
      const booked = counts[`${date}|${lane.origin}|${lane.destination}`] ?? 0
      const slotsRemaining = Math.max(0, CAPACITY - booked)
      rows.push({
        date,
        dayLabel,
        dateLabel,
        origin: lane.origin,
        destination: lane.destination,
        slotsRemaining,
        isFull: slotsRemaining === 0,
      })
    }
  }

  return rows
}

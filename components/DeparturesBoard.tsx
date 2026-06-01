import { getDepartures, CAPACITY } from '@/lib/departures'
import type { DepartureRow } from '@/lib/departures'

function StatusDot({ slots }: { slots: number }) {
  if (slots === 0) return null
  const color = slots > 4 ? '#00D17A' : '#F59E0B'
  return (
    <span
      className="inline-block w-2 h-2 rounded-full shrink-0"
      style={{ background: color }}
      aria-hidden
    />
  )
}

function SlotsLabel({ row }: { row: DepartureRow }) {
  if (row.isFull) {
    return (
      <span className="text-sm text-red-400/80 font-medium">Departure full</span>
    )
  }
  return (
    <span className="flex items-center gap-1.5 text-sm text-lane-ink">
      <StatusDot slots={row.slotsRemaining} />
      <span>
        <span className="font-mono font-semibold">{row.slotsRemaining}</span>
        <span className="text-neutral-400"> of {CAPACITY}</span>
      </span>
    </span>
  )
}

function bookUrl(row: DepartureRow): string {
  return `/book?origin=${encodeURIComponent(row.origin)}&destination=${encodeURIComponent(row.destination)}&pickup_date=${row.date}`
}

export default async function DeparturesBoard() {
  const departures = await getDepartures()

  return (
    <section className="bg-lane-bg border-b border-lane-divider py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-lane-ink mb-1">
            This week&apos;s departures
          </h2>
          <p className="text-neutral-500 text-sm">
            Live slot availability — Houston departures only.
          </p>
        </div>

        {/* ── Table header (desktop only) ──────────────────────────── */}
        <div className="hidden md:grid grid-cols-[4rem_5.5rem_1fr_8.5rem_10rem] gap-x-4 px-4 pb-2 border-b border-[#E8E6DE]">
          {['Day', 'Date', 'Lane', 'Slots', ''].map((h) => (
            <span key={h} className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest">
              {h}
            </span>
          ))}
        </div>

        {/* ── Rows ─────────────────────────────────────────────────── */}
        <div className="divide-y divide-[#E8E6DE]">
          {departures.map((row, i) => {
            // Slightly darker separator when the date changes
            const dateChanged = i > 0 && departures[i - 1].date !== row.date

            return (
              <div
                key={`${row.date}-${row.destination}`}
                className={dateChanged ? 'border-t-2 border-[#E8E6DE]' : ''}
              >
                {/* Desktop row */}
                <div className="hidden md:grid grid-cols-[4rem_5.5rem_1fr_8.5rem_10rem] gap-x-4 items-center px-4 py-3.5">
                  <span className="font-mono text-sm font-semibold text-lane-ink tabular-nums">
                    {row.dayLabel}
                  </span>
                  <span className="font-mono text-sm text-neutral-500 tabular-nums">
                    {row.dateLabel}
                  </span>
                  <span className="text-sm font-medium text-lane-ink">
                    {row.origin} → {row.destination}
                  </span>
                  <SlotsLabel row={row} />
                  {row.isFull ? (
                    <span className="text-sm text-neutral-300 cursor-default select-none">
                      Booked out
                    </span>
                  ) : (
                    <a
                      href={bookUrl(row)}
                      className="text-sm font-medium text-lane-ink hover:underline underline-offset-2 whitespace-nowrap"
                    >
                      Book this slot →
                    </a>
                  )}
                </div>

                {/* Mobile card */}
                <div className="md:hidden px-1 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[11px] font-medium text-neutral-400 uppercase tracking-widest">
                        {row.dayLabel} · {row.dateLabel}
                      </span>
                      <span className="text-sm font-semibold text-lane-ink">
                        {row.origin} → {row.destination}
                      </span>
                      <SlotsLabel row={row} />
                    </div>
                    {row.isFull ? (
                      <span className="text-xs text-neutral-300 mt-1 whitespace-nowrap">
                        Booked out
                      </span>
                    ) : (
                      <a
                        href={bookUrl(row)}
                        className="shrink-0 mt-1 text-sm font-medium text-lane-ink hover:underline underline-offset-2 whitespace-nowrap"
                      >
                        Book →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {departures.length === 0 && (
          <p className="text-sm text-neutral-400 py-8 text-center">
            No upcoming departures found. Check back soon.
          </p>
        )}
      </div>
    </section>
  )
}

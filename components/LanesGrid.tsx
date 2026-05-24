import { LANES, BASE_RATES } from '@/lib/lanes'

export default function LanesGrid() {
  return (
    <section id="lanes" className="bg-white border-y border-lane-divider py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-lane-ink mb-2">
            Active lanes
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base">
            Houston ⇄ Dallas-Fort Worth area. Prices are flat across all lanes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LANES.map((lane) => (
            <div
              key={lane.id}
              className="rounded-xl border border-lane-divider bg-white p-5 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-lane-ink text-[15px] leading-tight">
                  {lane.origin} → {lane.destination}
                </h3>
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-lane-ink whitespace-nowrap shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-lane-accent" />
                  Available
                </span>
              </div>

              <div className="flex gap-5 text-sm text-neutral-500">
                <span>{lane.distance} mi</span>
                <span>{lane.departureDays.join(' + ')}</span>
              </div>

              <div className="border-t border-lane-divider pt-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-neutral-400 mb-0.5">Starting at</p>
                  <span className="font-mono text-xl font-medium text-lane-ink tabular-nums">
                    ${BASE_RATES.sedan}
                  </span>
                </div>
                {lane.slotsRemaining !== undefined && (
                  <p className="text-xs text-neutral-400 text-right">
                    <span className="font-medium text-lane-ink">{lane.slotsRemaining}</span>{' '}
                    slot{lane.slotsRemaining !== 1 ? 's' : ''} remaining
                    <br />
                    <span className="text-[11px]">this week</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

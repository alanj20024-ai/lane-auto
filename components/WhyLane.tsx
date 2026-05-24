const DIFFERENTIATORS = [
  {
    title: 'Published prices',
    body: "The number you see is the number you pay. No markups after dispatch, no surprises at delivery.",
  },
  {
    title: 'Scheduled departures',
    body: "Thursdays and Fridays from Houston. A real schedule — not a guess about when the truck might leave.",
  },
  {
    title: 'Carrier transparency',
    body: "Know who's hauling your car 48 hours before pickup — name, driver, direct number.",
  },
  {
    title: 'Fully bonded',
    body: "MC# authority active. BMC-84 surety bond posted. Licensed and bonded, not just brokered.",
  },
]

export default function WhyLane() {
  return (
    <section className="bg-white border-y border-lane-divider py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-lane-ink mb-2">
            Why Lane
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base">
            Most auto transport brokers quote low and charge high. We don&apos;t.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
          {DIFFERENTIATORS.map((item) => (
            <div key={item.title} className="flex flex-col gap-2">
              <h3 className="font-semibold text-lane-ink">{item.title}</h3>
              <p className="text-neutral-500 leading-relaxed text-sm sm:text-base">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import QuoteCalculator from './QuoteCalculator'

export default function Hero() {
  return (
    <section className="bg-lane-bg pt-16 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-semibold tracking-[-0.02em] text-lane-ink leading-[1.1] mb-4">
          Scheduled auto transport
          <br className="hidden sm:block" /> between Houston and DFW.
        </h1>
        <p className="text-base sm:text-lg text-neutral-500 mb-10 max-w-lg leading-relaxed">
          Published prices that don&apos;t change after dispatch. Thursday and Friday
          departures from Houston to Dallas, Fort Worth, and Arlington — book a slot like a flight, not a prayer.
        </p>
        <QuoteCalculator />
      </div>
    </section>
  )
}

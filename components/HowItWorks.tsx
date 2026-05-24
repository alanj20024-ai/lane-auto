const STEPS = [
  {
    n: '01',
    title: 'Pick your slot',
    body: "Choose a lane and departure day. Get an instant price that doesn't change.",
  },
  {
    n: '02',
    title: 'Book and pay',
    body: "Lock your spot on the truck. No hold fees, no moving targets.",
  },
  {
    n: '03',
    title: 'Know your carrier',
    body: "48 hours before pickup, we send the carrier's name, driver, and direct contact number.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-lane-bg py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-lane-ink mb-12">
          How it works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-16">
          {STEPS.map((step) => (
            <div key={step.n} className="flex flex-col gap-4">
              <span className="font-mono text-sm font-medium text-lane-accent">{step.n}</span>
              <h3 className="text-lg font-semibold text-lane-ink tracking-tight">{step.title}</h3>
              <p className="text-neutral-500 leading-relaxed text-sm sm:text-base">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

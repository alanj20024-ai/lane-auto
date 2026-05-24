'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'How do scheduled departures work?',
    a: "Lane runs trucks on a fixed weekly schedule — Thursdays and Fridays from Houston. When you book a slot, you're reserving space on a specific departure. Your car is picked up in the days prior and loaded for your chosen day.",
  },
  {
    q: "What happens if a truck doesn't fill?",
    a: "We run on schedule regardless of load factor. If a truck is lightly loaded, your car moves anyway. We don't hold vehicles to wait for a full trailer.",
  },
  {
    q: 'What is the cancellation policy?',
    a: "Full refund if you cancel 7 or more days before departure. 50% refund if you cancel inside 7 days. No refund inside 72 hours once the truck has been dispatched.",
  },
  {
    q: 'What cargo coverage does my car have?',
    a: "All shipments are covered under the carrier's commercial cargo insurance. Full coverage details are provided at booking. For high-value vehicles, we recommend confirming limits with your personal auto insurer.",
  },
  {
    q: 'Can I leave personal items in my car?',
    a: "We recommend keeping the car empty. Personal items are not covered by cargo insurance and add weight that affects transport logistics. Small amounts (under 100 lbs in the trunk) are generally tolerated but not guaranteed.",
  },
  {
    q: 'Is enclosed transport available?',
    a: "Not yet — enclosed transport is on our roadmap. We currently offer open transport only. Sign up for lane updates to hear when enclosed shipping launches.",
  },
  {
    q: 'Do you offer dealer or fleet accounts?',
    a: "Yes. If you move 4 or more vehicles per month, reach out to discuss volume rates and invoicing. Dealer accounts get priority scheduling and a dedicated point of contact.",
  },
  {
    q: 'How do I track my car?',
    a: "You'll receive the carrier's name and the driver's direct number 48 hours before pickup. For real-time location, contact the driver directly. In-app tracking is on our near-term roadmap.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-lane-bg py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-lane-ink mb-10">
          FAQ
        </h2>
        <div className="divide-y divide-lane-divider">
          {FAQS.map((item, i) => (
            <div key={i}>
              <button
                className="w-full text-left py-4 flex items-center justify-between gap-4 group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-medium text-lane-ink text-sm sm:text-base">{item.q}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`text-neutral-400 shrink-0 transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                >
                  <path
                    d="M3 6L8 11L13 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {openIndex === i && (
                <p className="pb-4 text-neutral-500 leading-relaxed text-sm sm:text-base">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

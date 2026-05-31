import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — Lane',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-lane-bg">
      <header className="border-b border-lane-divider px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-sm font-semibold text-lane-ink hover:opacity-70 transition-opacity">
            Lane
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-lane-ink mb-4">
            Terms of Service
          </h1>
          <p className="text-neutral-500 text-sm">Last updated: May 31, 2026</p>
        </div>

        <div className="prose-legal">
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">1. Who we are</h2>
            <p className="text-neutral-600 leading-relaxed">
              Lane (autos.limitlesspro.one) is operated by Limitless Pro LLC, a Texas LLC. We are a
              licensed motor carrier broker (MC#1532052) and maintain an active BMC-84 surety bond
              (#JT016993). Principal place of business: Houston, Texas, with operations across the
              Texas Triangle.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">2. What we do</h2>
            <p className="text-neutral-600 leading-relaxed">
              Lane is a broker — we arrange transportation of vehicles between Houston and the
              Dallas-Fort Worth area using licensed motor carriers. We do not own or operate trucks.
              All vehicles are transported by authorized, insured motor carriers contracted on your
              behalf.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">3. Booking and acceptance</h2>
            <p className="text-neutral-600 leading-relaxed mb-3">
              When you book a slot, your booking is a request to reserve space on a scheduled
              departure. Bookings are confirmed when payment is successfully processed. We may
              decline or modify a booking if:
            </p>
            <ul className="list-disc pl-5 text-neutral-600 leading-relaxed space-y-1.5">
              <li>A departure doesn't meet minimum capacity</li>
              <li>Carrier safety or capacity requirements aren't met</li>
              <li>The vehicle materially differs from what was booked</li>
              <li>Weather, road, or carrier issues require rescheduling</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">4. Pricing and payment</h2>
            <p className="text-neutral-600 leading-relaxed">
              Pricing is flat-rate per vehicle, published on our website. The price you see at
              booking is the price you pay — we do not change quoted prices after dispatch.
              Surcharges for rush bookings (less than 72 hours from departure) and inoperable
              vehicles are applied at quote and visible before payment. Payment is due in full at
              booking via Stripe. We do not store payment card information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">
              5. Cancellation and refund policy
            </h2>
            <ul className="list-disc pl-5 text-neutral-600 leading-relaxed space-y-1.5 mb-3">
              <li>More than 7 days before pickup: full refund.</li>
              <li>3–7 days before pickup: 50% refund.</li>
              <li>
                Within 72 hours of pickup, or after a carrier has been dispatched: no refund.
              </li>
            </ul>
            <p className="text-neutral-600 leading-relaxed">
              If we cancel a departure due to insufficient capacity, weather, or carrier issues, you
              receive a full refund or the option to roll forward to the next available departure
              with a $50 credit.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">6. Cargo coverage</h2>
            <p className="text-neutral-600 leading-relaxed">
              Vehicles are insured under the carrier's primary cargo insurance policy while in
              transit. Lane maintains a contingent cargo policy that responds if the carrier's
              primary coverage fails. Limits vary by carrier; details are available on request.
              Customer is responsible for inspecting the vehicle and noting pre-existing damage on
              the bill of lading at pickup, and any new damage at delivery.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">7. Pickup and delivery</h2>
            <p className="text-neutral-600 leading-relaxed">
              Pickup windows are scheduled and communicated 48 hours before pickup with carrier
              name, driver name, and direct contact number. Customer or designated contact must be
              available to release and receive the vehicle, sign the bill of lading, and inspect the
              vehicle. We are not responsible for delays caused by unavailable pickup or delivery
              contacts.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">8. Personal items</h2>
            <p className="text-neutral-600 leading-relaxed">
              Personal items left in the vehicle are at the customer's own risk and are not covered
              by cargo insurance. We recommend removing all valuables. Up to 100 lbs in the trunk
              may be allowed; items must not be visible from outside the vehicle or interfere with
              its operation.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">9. Liability</h2>
            <p className="text-neutral-600 leading-relaxed">
              Lane's liability as a broker is limited to the difference between the carrier's cargo
              coverage limit and documented damage, up to the total amount paid for the booking.
              Lane is not liable for indirect, incidental, or consequential damages.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">
              10. Disputes and governing law
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              These terms are governed by the laws of the State of Texas. Disputes shall be resolved
              in state or federal courts in Harris County, Texas, unless otherwise required by
              applicable consumer protection law.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">11. Changes</h2>
            <p className="text-neutral-600 leading-relaxed">
              We may update these terms from time to time. The "Last updated" date at the top of
              this page reflects the most recent revision. Material changes will be communicated to
              active customers by email.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">12. Contact</h2>
            <p className="text-neutral-600 leading-relaxed">
              Limitless Pro LLC ·{' '}
              <a href="tel:+18326007513" className="text-lane-ink hover:underline">
                (832) 600-7513
              </a>{' '}
              ·{' '}
              <a href="mailto:freight@limitlesspro.one" className="text-lane-ink hover:underline">
                freight@limitlesspro.one
              </a>{' '}
              · Houston, TX
            </p>
          </section>
        </div>

        <div className="border-t border-lane-divider pt-8 mt-4">
          <Link href="/" className="text-sm text-neutral-500 hover:text-lane-ink transition-colors">
            ← Back to Lane
          </Link>
        </div>
      </main>
    </div>
  )
}

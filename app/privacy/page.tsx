import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Lane',
}

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-neutral-500 text-sm">Last updated: May 31, 2026</p>
        </div>

        <div>
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">1. What we collect</h2>
            <p className="text-neutral-600 leading-relaxed">
              Name, email, phone, pickup and delivery addresses, vehicle details, and any notes
              provided with your booking. Payment card information is handled directly by Stripe —
              we never see or store full card numbers. Basic technical information through site
              analytics: pages viewed, approximate location, and device type.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">2. How we use it</h2>
            <p className="text-neutral-600 leading-relaxed">
              To process your booking, communicate with you about your shipment, coordinate with
              carriers, send confirmation and status updates, and comply with applicable legal and
              regulatory requirements — including FMCSA recordkeeping for licensed brokers.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">3. Who we share with</h2>
            <p className="text-neutral-600 leading-relaxed mb-3">
              Only as needed to operate the service:
            </p>
            <ul className="list-disc pl-5 text-neutral-600 leading-relaxed space-y-1.5 mb-3">
              <li>
                Carriers we engage on your behalf (name, contact, pickup/delivery addresses, vehicle
                details)
              </li>
              <li>
                Stripe for payment processing —{' '}
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lane-ink hover:underline"
                >
                  stripe.com/privacy
                </a>
              </li>
              <li>
                Supabase for database hosting —{' '}
                <a
                  href="https://supabase.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lane-ink hover:underline"
                >
                  supabase.com/privacy
                </a>
              </li>
              <li>
                Resend for transactional email —{' '}
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lane-ink hover:underline"
                >
                  resend.com/legal/privacy-policy
                </a>
              </li>
              <li>Regulatory bodies when required by law</li>
            </ul>
            <p className="text-neutral-600 leading-relaxed font-medium">
              We do not sell your information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">4. Data retention</h2>
            <p className="text-neutral-600 leading-relaxed">
              Booking records are retained for a minimum of three years per FMCSA broker
              recordkeeping rules (49 CFR § 371.3). Records may be retained longer for accounting
              and dispute resolution purposes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">5. Your rights</h2>
            <p className="text-neutral-600 leading-relaxed">
              You may request a copy of personal information we hold, request correction, or request
              deletion (subject to legal retention requirements). Email{' '}
              <a href="mailto:freight@limitlesspro.one" className="text-lane-ink hover:underline">
                freight@limitlesspro.one
              </a>{' '}
              to make a request.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">
              6. Cookies and analytics
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              We use minimal first-party analytics to understand site usage. We do not use
              cross-site tracking cookies.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">7. Children</h2>
            <p className="text-neutral-600 leading-relaxed">
              Lane is not intended for individuals under 18. We do not knowingly collect
              information from minors.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">8. Changes</h2>
            <p className="text-neutral-600 leading-relaxed">
              We may update this policy from time to time. The "Last updated" date at the top of
              this page reflects the most recent revision.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-semibold text-lane-ink mb-3">9. Contact</h2>
            <p className="text-neutral-600 leading-relaxed">
              Limitless Pro LLC ·{' '}
              <a href="tel:+18326007513" className="text-lane-ink hover:underline">
                (832) 600-7513
              </a>{' '}
              ·{' '}
              <a href="mailto:freight@limitlesspro.one" className="text-lane-ink hover:underline">
                freight@limitlesspro.one
              </a>
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

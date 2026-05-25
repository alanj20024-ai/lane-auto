import type { Metadata } from 'next'
import Link from 'next/link'
import Stripe from 'stripe'
import TopNav from '@/components/TopNav'
import { createServerClient } from '@/lib/supabase'
import { VEHICLE_SIZES } from '@/lib/lanes'

export const metadata: Metadata = {
  title: 'Booking confirmed — Lane',
  robots: { index: false, follow: false },
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
})

function formatDate(dateStr: string): string {
  if (!dateStr) return '—'
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-lane-bg">
      <TopNav />
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-neutral-500 mb-4">{message}</p>
        <Link href="/" className="text-sm text-lane-ink underline underline-offset-2">
          Return home
        </Link>
      </div>
    </div>
  )
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { booking_id, session_id } = await searchParams

  if (!session_id || !booking_id) {
    return <ErrorState message="Missing payment information." />
  }

  // ── verify payment with Stripe ───────────────────────────────────────────
  let session: Stripe.Checkout.Session
  try {
    session = await stripe.checkout.sessions.retrieve(String(session_id))
  } catch {
    return <ErrorState message="Could not verify payment. Contact hello@laneauto.com." />
  }

  if (session.payment_status !== 'paid') {
    return <ErrorState message="Payment not completed. If you were charged, contact hello@laneauto.com." />
  }

  // ── mark booking paid ────────────────────────────────────────────────────
  const sb = createServerClient()
  await sb
    .from('bookings')
    .update({
      status: 'paid',
      stripe_payment_intent_id: String(session.payment_intent ?? ''),
    })
    .eq('id', String(booking_id))

  const { data: booking } = await sb
    .from('bookings')
    .select('*')
    .eq('id', String(booking_id))
    .single()

  if (!booking) {
    return <ErrorState message="Booking not found. Save your reference from the email." />
  }

  const refNumber = `BR-${String(booking.id).slice(-8).toUpperCase()}`
  const sizeLabel =
    VEHICLE_SIZES.find((s) => s.value === booking.vehicle_size)?.label ?? booking.vehicle_size
  const totalDollars = (booking.total_price_cents / 100).toFixed(2)

  return (
    <div className="min-h-screen bg-lane-bg">
      <TopNav />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        {/* Confirmed header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-14 h-14 rounded-full bg-lane-accent flex items-center justify-center mb-6">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path
                d="M4 13L10 19L22 7"
                stroke="#0F0F0F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-lane-ink mb-3">
            Booking confirmed.
          </h1>
          <p className="text-neutral-500">
            Reference{' '}
            <span className="font-mono font-medium text-lane-ink">{refNumber}</span>
          </p>
        </div>

        {/* Summary card */}
        <div className="bg-white border border-lane-divider rounded-xl p-6 mb-8">
          <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-widest mb-4">
            Booking details
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            <div>
              <p className="text-neutral-400 text-xs mb-1">Route</p>
              <p className="font-medium text-lane-ink">
                {booking.origin} → {booking.destination}
              </p>
            </div>
            <div>
              <p className="text-neutral-400 text-xs mb-1">Pickup date</p>
              <p className="font-medium text-lane-ink">{formatDate(booking.pickup_date)}</p>
            </div>
            <div>
              <p className="text-neutral-400 text-xs mb-1">Vehicle</p>
              <p className="font-medium text-lane-ink">
                {booking.vehicle_year} {booking.vehicle_make} {booking.vehicle_model}
              </p>
              <p className="text-neutral-400 text-xs mt-0.5">{sizeLabel}</p>
            </div>
            <div>
              <p className="text-neutral-400 text-xs mb-1">Total paid</p>
              <p className="font-mono text-2xl font-medium text-lane-ink tabular-nums">
                ${totalDollars}
              </p>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div className="mb-10">
          <h2 className="text-base font-semibold text-lane-ink mb-5">What happens next</h2>
          <div className="flex flex-col gap-5">
            {[
              {
                n: '01',
                title: 'Confirmation email',
                body: "You'll receive a confirmation at " + booking.customer_email + " shortly with full booking details.",
              },
              {
                n: '02',
                title: 'Carrier details 48 hours out',
                body: "We'll send the carrier name, driver name, and direct phone number 48 hours before your pickup.",
              },
              {
                n: '03',
                title: 'Pickup window',
                body: 'The driver will contact you to confirm the exact pickup window. Plan for an 8am–12pm window on your departure day.',
              },
            ].map((step) => (
              <div key={step.n} className="flex gap-4">
                <span className="font-mono text-sm text-lane-accent font-medium w-6 shrink-0 mt-0.5">
                  {step.n}
                </span>
                <div>
                  <p className="font-medium text-lane-ink text-sm">{step.title}</p>
                  <p className="text-neutral-500 text-sm mt-0.5">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-lane-divider pt-8 text-center text-sm text-neutral-500">
          Questions?{' '}
          <a href="mailto:hello@laneauto.com" className="text-lane-ink hover:underline">
            hello@laneauto.com
          </a>{' '}
          · (713) XXX-XXXX
        </div>
      </div>
    </div>
  )
}

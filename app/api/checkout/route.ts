import type { NextRequest } from 'next/server'
import Stripe from 'stripe'
import { createServerClient } from '@/lib/supabase'
import { calculatePriceCents } from '@/lib/pricing'
import type { VehicleSize } from '@/lib/lanes'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
})

const VALID_SIZES: VehicleSize[] = ['sedan', 'mid-suv', 'full-suv', 'hd']

function formatPickupDate(dateStr: string): string {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function bad(msg: string) {
  return Response.json({ error: msg }, { status: 400 })
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return bad('Invalid request body')
  }

  // ── server-side validation ────────────────────────────────────────────────
  const required = [
    'origin', 'destination', 'pickupDate', 'sizeClass',
    'vehicleYear', 'vehicleMake', 'vehicleModel',
    'pickupStreet', 'pickupCity', 'pickupState', 'pickupZip',
    'dropoffStreet', 'dropoffCity', 'dropoffState', 'dropoffZip',
    'fullName', 'email', 'phone',
  ]
  for (const field of required) {
    if (!body[field]) return bad(`Missing required field: ${field}`)
  }

  const sizeClass = body.sizeClass as string
  if (!VALID_SIZES.includes(sizeClass as VehicleSize)) {
    return bad('Invalid sizeClass')
  }

  const pickupDate = String(body.pickupDate)
  const isInoperable = Boolean(body.isInoperable)

  // ── re-calculate price server-side ───────────────────────────────────────
  const pricing = calculatePriceCents({
    sizeClass: sizeClass as VehicleSize,
    pickupDate,
    isInoperable,
  })

  // ── insert booking row ───────────────────────────────────────────────────
  const sb = createServerClient()
  const { data: booking, error: insertError } = await sb
    .from('bookings')
    .insert({
      origin: String(body.origin),
      destination: String(body.destination),
      vehicle_year: Number(body.vehicleYear),
      vehicle_make: String(body.vehicleMake),
      vehicle_model: String(body.vehicleModel),
      vehicle_size_class: sizeClass.replace(/-/g, '_'),
      is_inoperable: isInoperable,
      pickup_date: pickupDate,
      pickup_address: String(body.pickupStreet),
      pickup_city: String(body.pickupCity),
      pickup_state: String(body.pickupState),
      pickup_zip: String(body.pickupZip),
      pickup_contact_name: String(body.pickupContactName ?? ''),
      pickup_contact_phone: String(body.pickupContactPhone ?? ''),
      dropoff_address: String(body.dropoffStreet),
      dropoff_city: String(body.dropoffCity),
      dropoff_state: String(body.dropoffState),
      dropoff_zip: String(body.dropoffZip),
      dropoff_contact_name: String(body.dropoffContactName ?? ''),
      dropoff_contact_phone: String(body.dropoffContactPhone ?? ''),
      customer_name: String(body.fullName),
      customer_email: String(body.email),
      customer_phone: String(body.phone),
      customer_notes: String(body.notes ?? ''),
      base_price_cents: pricing.baseCents,
      rush_surcharge_cents: pricing.rushCents,
      inoperable_surcharge_cents: pricing.inoperableCents,
      total_price_cents: pricing.totalCents,
    })
    .select('id')
    .single()

  if (insertError || !booking) {
    console.error('[checkout] Supabase insert error:', insertError?.message)
    return Response.json({ error: 'Failed to create booking. Please try again.' }, { status: 500 })
  }

  // ── create Stripe Checkout session ───────────────────────────────────────
  const origin = new URL(request.url).origin
  const vehicleDesc = `${body.vehicleYear} ${body.vehicleMake} ${body.vehicleModel}`

  let session: Stripe.Checkout.Session
  try {
    session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Lane auto transport — ${body.origin} to ${body.destination}`,
              description: `${vehicleDesc} · ${formatPickupDate(pickupDate)}`,
            },
            unit_amount: pricing.totalCents,
          },
          quantity: 1,
        },
      ],
      customer_email: String(body.email),
      metadata: { booking_id: booking.id },
      success_url: `${origin}/book/success?booking_id=${booking.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/book?canceled=true&booking_id=${booking.id}&origin=${encodeURIComponent(String(body.origin))}&destination=${encodeURIComponent(String(body.destination))}&vehicle_size=${sizeClass.replace(/-/g, '_')}&pickup_date=${pickupDate}&inoperable=${isInoperable}`,
    })
  } catch (err) {
    console.error('[checkout] Stripe session error:', err)
    return Response.json({ error: 'Payment provider error. Please try again.' }, { status: 500 })
  }

  // ── store session ID on booking ──────────────────────────────────────────
  await sb
    .from('bookings')
    .update({ stripe_checkout_session_id: session.id })
    .eq('id', booking.id)

  return Response.json({ checkoutUrl: session.url })
}

import type { Metadata } from 'next'
import BookingForm from './BookingForm'

export const metadata: Metadata = {
  title: 'Book a slot — Lane',
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const p = await searchParams
  const str = (k: string, fallback = '') => String(p[k] ?? fallback)

  return (
    <BookingForm
      origin={str('origin', 'Houston')}
      destination={str('destination', 'Dallas')}
      vehicleSize={str('vehicle_size', 'sedan')}
      pickupDate={str('pickup_date')}
      inoperable={str('inoperable') === 'true'}
      canceled={str('canceled') === 'true'}
    />
  )
}

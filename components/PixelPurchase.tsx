'use client'

import { useEffect } from 'react'
import { fbqTrack } from '@/lib/pixel'

export default function PixelPurchase({ value }: { value: number }) {
  useEffect(() => {
    fbqTrack('Purchase', { value, currency: 'USD' })
  }, [value])
  return null
}

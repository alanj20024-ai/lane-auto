'use client'

import { useState, useEffect } from 'react'
import { VEHICLE_SIZES, getDestinations, type Origin, type VehicleSize } from '@/lib/lanes'
import {
  calcPrice,
  getNextThursday,
  isValidDepartureDay,
  parseDepartureDate,
  toDateString,
} from '@/lib/pricing'
import Link from 'next/link'
import { createQuoteHoldLead } from '@/lib/leads'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type HoldStatus = 'idle' | 'loading' | 'success' | 'error'

export default function QuoteCalculator() {
  const [origin, setOrigin] = useState<Origin>('Houston')
  const [destination, setDestination] = useState<string>('Dallas')
  const [vehicle, setVehicle] = useState<VehicleSize>('sedan')
  const [date, setDate] = useState<string>('')
  const [inoperable, setInoperable] = useState(false)
  const [dateError, setDateError] = useState('')

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [holdStatus, setHoldStatus] = useState<HoldStatus>('idle')

  // Set default date client-side to avoid SSR hydration mismatch
  useEffect(() => {
    setDate(getNextThursday())
  }, [])

  // Reset destination when origin changes
  useEffect(() => {
    setDestination(getDestinations(origin)[0])
  }, [origin])

  const destinations = getDestinations(origin)

  const handleDateChange = (val: string) => {
    setDate(val)
    setDateError(val && !isValidDepartureDay(val) ? 'Only Thursday and Friday departures are available.' : '')
  }

  const validDate = date && !dateError && isValidDepartureDay(date)
  const breakdown = validDate ? calcPrice(vehicle, parseDepartureDate(date), inoperable) : null

  const today = new Date()
  const minDate = toDateString(today)

  const handleHoldSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setEmailError('Enter a valid email address.')
      return
    }
    setEmailError('')
    setHoldStatus('loading')
    const result = await createQuoteHoldLead({
      email,
      origin,
      destination,
      vehicleSize: vehicle,
      pickupDate: date,
      priceCents: breakdown!.total * 100,
    })
    setHoldStatus(result.success ? 'success' : 'error')
  }

  const inputClass =
    'h-10 w-full px-3 border border-lane-divider rounded-md text-sm text-lane-ink bg-white focus:outline-none focus:ring-2 focus:ring-lane-accent/30 focus:border-lane-accent transition-colors'

  const labelClass = 'text-[11px] font-medium text-neutral-400 uppercase tracking-widest'

  return (
    <div id="quote" className="bg-white border border-lane-divider rounded-xl overflow-hidden shadow-sm">
      {/* Inputs */}
      <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>From</label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value as Origin)}
            className={inputClass}
          >
            <option value="Houston">Houston</option>
            <option value="Dallas">Dallas</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>To</label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={inputClass}
          >
            {destinations.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Vehicle</label>
          <select
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value as VehicleSize)}
            className={inputClass}
          >
            {VEHICLE_SIZES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Pickup date</label>
          <input
            type="date"
            value={date}
            min={minDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className={inputClass}
          />
          {dateError && <p className="text-xs text-red-500 mt-0.5">{dateError}</p>}
        </div>

        <div className="flex flex-col gap-1.5 justify-end sm:col-span-2 lg:col-span-1">
          <label className="flex items-start gap-2.5 cursor-pointer py-2">
            <input
              type="checkbox"
              checked={inoperable}
              onChange={(e) => setInoperable(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-lane-divider accent-lane-accent flex-shrink-0"
            />
            <span className="text-sm text-lane-ink leading-snug">
              Vehicle won&apos;t run or roll
              <span className="block text-xs text-neutral-400 mt-0.5">+$175 inoperable surcharge</span>
            </span>
          </label>
        </div>
      </div>

      {/* Price output */}
      {breakdown && (
        <div className="border-t border-lane-divider px-5 sm:px-6 py-5 bg-lane-bg/50">
          <p className={`${labelClass} mb-3`}>Your price</p>
          <div className="flex flex-wrap items-end gap-x-8 gap-y-2">
            <span className="font-mono text-[60px] sm:text-[72px] leading-none font-medium text-lane-ink tabular-nums">
              ${breakdown.total}
            </span>
            <div className="flex flex-col gap-1 pb-1 font-mono text-xs text-neutral-400">
              <span>Base rate · ${breakdown.base}</span>
              {breakdown.rush > 0 && (
                <span className="text-amber-600">Rush surcharge · +${breakdown.rush}</span>
              )}
              {breakdown.inoperable > 0 && (
                <span>Inoperable · +${breakdown.inoperable}</span>
              )}
            </div>
          </div>
          <p className="text-xs text-neutral-400 mt-3">
            This is the price you pay. No adjustments after dispatch.
          </p>
        </div>
      )}

      {/* Book + hold */}
      {breakdown && (
        <div className="border-t border-lane-divider px-5 sm:px-6 py-5 flex flex-col gap-4">
          {/* Primary CTA */}
          <Link
            href={`/book?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&vehicle_size=${vehicle.replace(/-/g, '_')}&pickup_date=${date}&inoperable=${inoperable}`}
            className="flex items-center justify-center gap-2 h-11 px-6 bg-lane-accent text-lane-ink text-sm font-semibold rounded-md hover:opacity-90 transition-opacity"
          >
            Book this slot →
          </Link>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-lane-divider" />
            <span className="text-[11px] text-neutral-400">or not ready to commit yet?</span>
            <div className="flex-1 border-t border-lane-divider" />
          </div>

          {/* Hold form */}
          {holdStatus === 'success' ? (
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-lane-accent flex items-center justify-center flex-shrink-0">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path
                    d="M1.5 5.5L4 8L9.5 2.5"
                    stroke="#0F0F0F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="text-sm text-lane-ink">
                We saved your quote. We&apos;ll email a booking link shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleHoldSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className={labelClass}>Hold this slot</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
                    placeholder="your@email.com"
                    disabled={holdStatus === 'loading'}
                    className={`${inputClass} disabled:opacity-50`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={holdStatus === 'loading'}
                  className="sm:self-end h-10 px-5 bg-lane-accent text-lane-ink text-sm font-medium rounded-md hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-60"
                >
                  {holdStatus === 'loading' ? 'Saving…' : 'Save quote'}
                </button>
              </div>
              {emailError && <p className="text-xs text-red-500">{emailError}</p>}
              {holdStatus === 'error' && (
                <p className="text-xs text-red-500">Something went wrong. Try again.</p>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  )
}


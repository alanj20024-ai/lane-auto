'use client'

import { useState } from 'react'
import Link from 'next/link'
import TopNav from '@/components/TopNav'
import { VEHICLE_SIZES, BASE_RATES, type VehicleSize } from '@/lib/lanes'
import { calculatePriceCents, getNextThursday } from '@/lib/pricing'

// ─── helpers ────────────────────────────────────────────────────────────────

function urlSizeToVehicleSize(s: string): VehicleSize {
  const map: Record<string, VehicleSize> = {
    sedan: 'sedan',
    mid_suv: 'mid-suv',
    full_suv: 'full-suv',
    hd: 'hd',
  }
  return map[s] ?? 'sedan'
}

function formatPickupDate(dateStr: string): string {
  if (!dateStr) return '—'
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ZIP_RE = /^\d{5}$/

function isValidPhone(p: string): boolean {
  return p.replace(/\D/g, '').length === 10
}

interface FormState {
  year: string
  make: string
  model: string
  sizeClass: VehicleSize
  isInoperable: boolean
  pickupStreet: string
  pickupCity: string
  pickupState: string
  pickupZip: string
  pickupContactName: string
  pickupContactPhone: string
  dropoffStreet: string
  dropoffCity: string
  dropoffState: string
  dropoffZip: string
  dropoffContactName: string
  dropoffContactPhone: string
  fullName: string
  email: string
  phone: string
  notes: string
}

function validate(f: FormState): Record<string, string> {
  const e: Record<string, string> = {}
  if (!f.make.trim()) e.make = 'Required'
  if (!f.model.trim()) e.model = 'Required'
  if (!f.pickupStreet.trim()) e.pickupStreet = 'Required'
  if (!f.pickupCity.trim()) e.pickupCity = 'Required'
  if (!ZIP_RE.test(f.pickupZip)) e.pickupZip = 'Enter a valid 5-digit ZIP'
  if (!f.dropoffStreet.trim()) e.dropoffStreet = 'Required'
  if (!f.dropoffCity.trim()) e.dropoffCity = 'Required'
  if (!ZIP_RE.test(f.dropoffZip)) e.dropoffZip = 'Enter a valid 5-digit ZIP'
  if (!f.fullName.trim()) e.fullName = 'Required'
  if (!EMAIL_RE.test(f.email)) e.email = 'Enter a valid email address'
  if (!isValidPhone(f.phone)) e.phone = 'Enter a valid 10-digit US phone number'
  return e
}

// ─── sub-components ─────────────────────────────────────────────────────────

function Field({
  id,
  label,
  error,
  children,
  colSpan2,
}: {
  id?: string
  label: string
  error?: string
  children: React.ReactNode
  colSpan2?: boolean
}) {
  return (
    <div className={colSpan2 ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="block text-xs font-medium text-neutral-500 mb-1">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-base font-semibold text-lane-ink pb-3 mb-5 border-b border-lane-divider">
      {title}
    </h2>
  )
}

interface SummaryCardProps {
  origin: string
  destination: string
  pickupDate: string
  form: FormState
}

function SummaryCard({ origin, destination, pickupDate, form }: SummaryCardProps) {
  const pricing = calculatePriceCents({
    sizeClass: form.sizeClass,
    pickupDate: pickupDate || getNextThursday(),
    isInoperable: form.isInoperable,
  })

  const sizeLabel = VEHICLE_SIZES.find((s) => s.value === form.sizeClass)?.label ?? form.sizeClass
  const vehicleDesc = [form.year, form.make, form.model].filter(Boolean).join(' ') || '—'

  return (
    <div className="bg-white border border-lane-divider rounded-xl p-5 flex flex-col gap-4">
      <div>
        <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-widest mb-2">
          Booking summary
        </p>
        <p className="font-semibold text-lane-ink">
          {origin} → {destination}
        </p>
        <p className="text-sm text-neutral-500 mt-0.5">{formatPickupDate(pickupDate)}</p>
      </div>

      <div className="border-t border-lane-divider pt-4">
        <p className="text-sm text-neutral-500">{vehicleDesc}</p>
        <p className="text-xs text-neutral-400 mt-0.5">{sizeLabel}</p>
      </div>

      <div className="border-t border-lane-divider pt-4 flex flex-col gap-2 font-mono text-sm">
        <div className="flex justify-between text-neutral-500">
          <span>Base rate</span>
          <span>${pricing.baseCents / 100}</span>
        </div>
        {pricing.rushCents > 0 && (
          <div className="flex justify-between text-amber-600">
            <span>Rush surcharge</span>
            <span>+${pricing.rushCents / 100}</span>
          </div>
        )}
        {pricing.inoperableCents > 0 && (
          <div className="flex justify-between text-neutral-500">
            <span>Inoperable</span>
            <span>+${pricing.inoperableCents / 100}</span>
          </div>
        )}
        <div className="flex justify-between items-end border-t border-lane-divider pt-3 mt-1">
          <span className="text-xs text-neutral-400">Total</span>
          <span className="text-[32px] leading-none font-medium text-lane-ink tabular-nums">
            ${pricing.totalCents / 100}
          </span>
        </div>
      </div>

      <p className="text-[11px] text-neutral-400 text-center">
        Secured by Stripe · You&apos;ll review before payment
      </p>
    </div>
  )
}

// ─── main component ──────────────────────────────────────────────────────────

export interface BookingFormProps {
  origin: string
  destination: string
  vehicleSize: string
  pickupDate: string
  inoperable: boolean
  canceled: boolean
}

const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: currentYear + 1 - 1990 + 1 }, (_, i) =>
  String(currentYear + 1 - i),
)

export default function BookingForm({
  origin,
  destination,
  vehicleSize,
  pickupDate,
  inoperable,
  canceled,
}: BookingFormProps) {
  const [form, setForm] = useState<FormState>({
    year: String(currentYear - 1),
    make: '',
    model: '',
    sizeClass: urlSizeToVehicleSize(vehicleSize),
    isInoperable: inoperable,
    pickupStreet: '',
    pickupCity: origin,
    pickupState: 'TX',
    pickupZip: '',
    pickupContactName: '',
    pickupContactPhone: '',
    dropoffStreet: '',
    dropoffCity: destination,
    dropoffState: 'TX',
    dropoffZip: '',
    dropoffContactName: '',
    dropoffContactPhone: '',
    fullName: '',
    email: '',
    phone: '',
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [serverError, setServerError] = useState('')

  const set = (field: keyof FormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const clearError = (field: string) =>
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next })

  const inputClass = (field?: string) =>
    `h-10 w-full px-3 border rounded-md text-sm text-lane-ink bg-white focus:outline-none focus:ring-2 focus:ring-lane-accent/30 focus:border-lane-accent transition-colors ${
      field && errors[field] ? 'border-red-400' : 'border-lane-divider'
    }`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const firstKey = Object.keys(errs)[0]
      document.getElementById(firstKey)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setErrors({})
    setSubmitStatus('loading')
    setServerError('')

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin,
          destination,
          pickupDate: pickupDate || getNextThursday(),
          sizeClass: form.sizeClass,
          isInoperable: form.isInoperable,
          vehicleYear: form.year,
          vehicleMake: form.make,
          vehicleModel: form.model,
          pickupStreet: form.pickupStreet,
          pickupCity: form.pickupCity,
          pickupState: form.pickupState,
          pickupZip: form.pickupZip,
          pickupContactName: form.pickupContactName,
          pickupContactPhone: form.pickupContactPhone,
          dropoffStreet: form.dropoffStreet,
          dropoffCity: form.dropoffCity,
          dropoffState: form.dropoffState,
          dropoffZip: form.dropoffZip,
          dropoffContactName: form.dropoffContactName,
          dropoffContactPhone: form.dropoffContactPhone,
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          notes: form.notes,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setServerError(data.error ?? 'Something went wrong. Please try again.')
        setSubmitStatus('error')
        return
      }
      window.location.href = data.checkoutUrl
    } catch {
      setServerError('Network error. Please check your connection and try again.')
      setSubmitStatus('error')
    }
  }

  const ctaLabel = submitStatus === 'loading' ? 'Redirecting to payment…' : 'Continue to payment →'
  const ctaClass =
    'w-full h-11 px-6 bg-lane-accent text-lane-ink text-sm font-semibold rounded-md hover:opacity-90 transition-opacity disabled:opacity-60'

  return (
    <div className="min-h-screen bg-lane-bg">
      <TopNav />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-28 lg:pb-12">
        {/* Back link */}
        <Link
          href="/#quote"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-lane-ink mb-6 transition-colors"
        >
          ← Back to quote
        </Link>

        {canceled && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            Payment was canceled. Your quote details are still here — try again when you&apos;re ready.
          </div>
        )}

        {/* Mobile summary */}
        <div className="lg:hidden mb-6">
          <SummaryCard origin={origin} destination={destination} pickupDate={pickupDate} form={form} />
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-12 lg:items-start">
          {/* ── Form ── */}
          <form id="booking-form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
            {/* Vehicle */}
            <section>
              <SectionHeader title="Vehicle" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field id="year" label="Year">
                  <select
                    id="year"
                    value={form.year}
                    onChange={(e) => set('year', e.target.value)}
                    className={inputClass()}
                  >
                    {YEARS.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </Field>

                <Field id="make" label="Make *" error={errors.make}>
                  <input
                    id="make"
                    type="text"
                    value={form.make}
                    onChange={(e) => { set('make', e.target.value); clearError('make') }}
                    placeholder="e.g. Toyota"
                    className={inputClass('make')}
                  />
                </Field>

                <Field id="model" label="Model *" error={errors.model} colSpan2>
                  <input
                    id="model"
                    type="text"
                    value={form.model}
                    onChange={(e) => { set('model', e.target.value); clearError('model') }}
                    placeholder="e.g. Camry"
                    className={inputClass('model')}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-neutral-500 mb-2">
                    Size class *
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {VEHICLE_SIZES.map((s) => (
                      <label
                        key={s.value}
                        className={`flex flex-col gap-1 p-3 rounded-lg border cursor-pointer transition-colors ${
                          form.sizeClass === s.value
                            ? 'border-lane-accent bg-lane-accent/5'
                            : 'border-lane-divider hover:border-neutral-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="sizeClass"
                          value={s.value}
                          checked={form.sizeClass === s.value}
                          onChange={() => set('sizeClass', s.value)}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium text-lane-ink leading-snug">{s.label}</span>
                        <span className="font-mono text-sm text-neutral-500">${BASE_RATES[s.value]}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isInoperable}
                      onChange={(e) => set('isInoperable', e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-lane-divider accent-lane-accent flex-shrink-0"
                    />
                    <span className="text-sm text-lane-ink leading-snug">
                      Vehicle won&apos;t run or roll
                      <span className="block text-xs text-neutral-400 mt-0.5">+$175 inoperable surcharge</span>
                    </span>
                  </label>
                </div>
              </div>
            </section>

            {/* Pickup */}
            <section>
              <SectionHeader title="Pickup address" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field id="pickupStreet" label="Street address *" error={errors.pickupStreet} colSpan2>
                  <input
                    id="pickupStreet"
                    type="text"
                    value={form.pickupStreet}
                    onChange={(e) => { set('pickupStreet', e.target.value); clearError('pickupStreet') }}
                    placeholder="123 Main St"
                    className={inputClass('pickupStreet')}
                  />
                </Field>

                <Field id="pickupCity" label="City *" error={errors.pickupCity}>
                  <input
                    id="pickupCity"
                    type="text"
                    value={form.pickupCity}
                    onChange={(e) => { set('pickupCity', e.target.value); clearError('pickupCity') }}
                    className={inputClass('pickupCity')}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field id="pickupState" label="State">
                    <input
                      id="pickupState"
                      type="text"
                      value={form.pickupState}
                      onChange={(e) => set('pickupState', e.target.value.toUpperCase().slice(0, 2))}
                      maxLength={2}
                      className={inputClass()}
                    />
                  </Field>
                  <Field id="pickupZip" label="ZIP *" error={errors.pickupZip}>
                    <input
                      id="pickupZip"
                      type="text"
                      value={form.pickupZip}
                      onChange={(e) => { set('pickupZip', e.target.value.replace(/\D/g, '').slice(0, 5)); clearError('pickupZip') }}
                      placeholder="77001"
                      inputMode="numeric"
                      className={inputClass('pickupZip')}
                    />
                  </Field>
                </div>

                <Field id="pickupContactName" label="Pickup contact name (optional)">
                  <input
                    id="pickupContactName"
                    type="text"
                    value={form.pickupContactName}
                    onChange={(e) => set('pickupContactName', e.target.value)}
                    placeholder="If different from you"
                    className={inputClass()}
                  />
                </Field>

                <Field id="pickupContactPhone" label="Pickup contact phone (optional)">
                  <input
                    id="pickupContactPhone"
                    type="tel"
                    value={form.pickupContactPhone}
                    onChange={(e) => set('pickupContactPhone', e.target.value)}
                    placeholder="(713) 555-1212"
                    className={inputClass()}
                  />
                </Field>
              </div>
            </section>

            {/* Dropoff */}
            <section>
              <SectionHeader title="Dropoff address" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field id="dropoffStreet" label="Street address *" error={errors.dropoffStreet} colSpan2>
                  <input
                    id="dropoffStreet"
                    type="text"
                    value={form.dropoffStreet}
                    onChange={(e) => { set('dropoffStreet', e.target.value); clearError('dropoffStreet') }}
                    placeholder="456 Oak Ave"
                    className={inputClass('dropoffStreet')}
                  />
                </Field>

                <Field id="dropoffCity" label="City *" error={errors.dropoffCity}>
                  <input
                    id="dropoffCity"
                    type="text"
                    value={form.dropoffCity}
                    onChange={(e) => { set('dropoffCity', e.target.value); clearError('dropoffCity') }}
                    className={inputClass('dropoffCity')}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field id="dropoffState" label="State">
                    <input
                      id="dropoffState"
                      type="text"
                      value={form.dropoffState}
                      onChange={(e) => set('dropoffState', e.target.value.toUpperCase().slice(0, 2))}
                      maxLength={2}
                      className={inputClass()}
                    />
                  </Field>
                  <Field id="dropoffZip" label="ZIP *" error={errors.dropoffZip}>
                    <input
                      id="dropoffZip"
                      type="text"
                      value={form.dropoffZip}
                      onChange={(e) => { set('dropoffZip', e.target.value.replace(/\D/g, '').slice(0, 5)); clearError('dropoffZip') }}
                      placeholder="75201"
                      inputMode="numeric"
                      className={inputClass('dropoffZip')}
                    />
                  </Field>
                </div>

                <Field id="dropoffContactName" label="Dropoff contact name (optional)">
                  <input
                    id="dropoffContactName"
                    type="text"
                    value={form.dropoffContactName}
                    onChange={(e) => set('dropoffContactName', e.target.value)}
                    placeholder="If different from you"
                    className={inputClass()}
                  />
                </Field>

                <Field id="dropoffContactPhone" label="Dropoff contact phone (optional)">
                  <input
                    id="dropoffContactPhone"
                    type="tel"
                    value={form.dropoffContactPhone}
                    onChange={(e) => set('dropoffContactPhone', e.target.value)}
                    placeholder="(214) 555-1212"
                    className={inputClass()}
                  />
                </Field>
              </div>
            </section>

            {/* Your info */}
            <section>
              <SectionHeader title="Your information" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field id="fullName" label="Full name *" error={errors.fullName} colSpan2>
                  <input
                    id="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => { set('fullName', e.target.value); clearError('fullName') }}
                    placeholder="Jane Smith"
                    className={inputClass('fullName')}
                  />
                </Field>

                <Field id="email" label="Email *" error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => { set('email', e.target.value); clearError('email') }}
                    placeholder="jane@example.com"
                    className={inputClass('email')}
                  />
                </Field>

                <Field id="phone" label="Phone *" error={errors.phone}>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => { set('phone', e.target.value); clearError('phone') }}
                    placeholder="(713) 555-1212"
                    className={inputClass('phone')}
                  />
                </Field>
              </div>
            </section>

            {/* Notes */}
            <section>
              <SectionHeader title="Notes (optional)" />
              <textarea
                value={form.notes}
                onChange={(e) => set('notes', e.target.value)}
                rows={3}
                placeholder="Anything we should know about access, timing, or the vehicle…"
                className="w-full px-3 py-2.5 border border-lane-divider rounded-md text-sm text-lane-ink bg-white focus:outline-none focus:ring-2 focus:ring-lane-accent/30 focus:border-lane-accent transition-colors resize-none"
              />
            </section>

            {serverError && (
              <p className="text-sm text-red-500 -mt-4">{serverError}</p>
            )}
          </form>

          {/* ── Desktop sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 flex flex-col gap-4">
              <SummaryCard origin={origin} destination={destination} pickupDate={pickupDate} form={form} />
              <button
                type="submit"
                form="booking-form"
                disabled={submitStatus === 'loading'}
                className={ctaClass}
              >
                {ctaLabel}
              </button>
              {serverError && <p className="text-xs text-red-500 text-center">{serverError}</p>}
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-lane-divider px-4 py-3">
        <button
          type="submit"
          form="booking-form"
          disabled={submitStatus === 'loading'}
          className={ctaClass}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  )
}

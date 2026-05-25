'use client'

import { useState } from 'react'
import { createNotifyLead } from '@/lib/leads'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ZIP_RE = /^\d{5}$/

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function LeadCapture() {
  const [email, setEmail] = useState('')
  const [zip, setZip] = useState('')
  const [emailError, setEmailError] = useState('')
  const [zipError, setZipError] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const validate = () => {
    let ok = true
    if (!EMAIL_RE.test(email)) {
      setEmailError('Enter a valid email address.')
      ok = false
    } else {
      setEmailError('')
    }
    if (zip && !ZIP_RE.test(zip)) {
      setZipError('ZIP must be exactly 5 digits.')
      ok = false
    } else {
      setZipError('')
    }
    return ok
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    const result = await createNotifyLead({ email, zipCode: zip || undefined })
    setStatus(result.success ? 'success' : 'error')
  }

  const fieldClass =
    'h-11 px-4 rounded-md bg-white/8 border border-white/15 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-lane-accent/40 focus:border-lane-accent transition-colors disabled:opacity-50'

  return (
    <section className="bg-lane-ink py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-3">
          Not ready to book?
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mb-10">
          Get notified when we add lanes near you.
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-lane-accent flex items-center justify-center shrink-0">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M2 6.5L5 9.5L11 3.5"
                  stroke="#0F0F0F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="text-white font-medium">You&apos;re on the list. We&apos;ll be in touch.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
                placeholder="Email address"
                disabled={status === 'loading'}
                className={`flex-1 ${fieldClass}`}
              />
              <input
                type="text"
                value={zip}
                onChange={(e) => { setZip(e.target.value); setZipError('') }}
                placeholder="ZIP code"
                maxLength={5}
                inputMode="numeric"
                disabled={status === 'loading'}
                className={`w-full sm:w-28 ${fieldClass}`}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="h-11 px-5 bg-lane-accent text-lane-ink text-sm font-medium rounded-md hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-60"
              >
                {status === 'loading' ? 'Saving…' : 'Notify me'}
              </button>
            </div>
            {(emailError || zipError || status === 'error') && (
              <div className="flex flex-col gap-1 text-left">
                {emailError && <p className="text-xs text-red-400">{emailError}</p>}
                {zipError && <p className="text-xs text-red-400">{zipError}</p>}
                {status === 'error' && (
                  <p className="text-xs text-red-400">Something went wrong. Try again.</p>
                )}
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  )
}

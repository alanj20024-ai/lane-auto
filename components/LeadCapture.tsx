'use client'

import { useState } from 'react'

export default function LeadCapture() {
  const [email, setEmail] = useState('')
  const [zip, setZip] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="bg-lane-ink py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-3">
          Not ready to book?
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mb-10">
          Get notified when we add lanes near you.
        </p>

        {submitted ? (
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
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="flex-1 h-11 px-4 rounded-md bg-white/8 border border-white/15 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-lane-accent/40 focus:border-lane-accent transition-colors"
            />
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="ZIP code"
              maxLength={5}
              inputMode="numeric"
              className="w-full sm:w-28 h-11 px-4 rounded-md bg-white/8 border border-white/15 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-lane-accent/40 focus:border-lane-accent transition-colors"
            />
            <button
              type="submit"
              className="h-11 px-5 bg-lane-accent text-lane-ink text-sm font-medium rounded-md hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Notify me
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

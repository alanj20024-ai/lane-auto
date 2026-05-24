'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TopNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-lane-divider">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-lane-ink font-semibold text-lg tracking-tight">
          Lane
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#lanes" className="text-neutral-500 hover:text-lane-ink transition-colors">
            Lanes
          </a>
          <a href="#how-it-works" className="text-neutral-500 hover:text-lane-ink transition-colors">
            How it works
          </a>
          <a href="#faq" className="text-neutral-500 hover:text-lane-ink transition-colors">
            FAQ
          </a>
          <a
            href="#quote"
            className="bg-lane-accent text-lane-ink text-sm font-medium px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            Get a quote
          </a>
        </nav>

        <button
          className="md:hidden p-2 -mr-2 text-lane-ink"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 6H17M3 10H17M3 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-lane-divider bg-white">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4 text-sm">
            <a href="#lanes" onClick={() => setOpen(false)} className="text-neutral-600">
              Lanes
            </a>
            <a href="#how-it-works" onClick={() => setOpen(false)} className="text-neutral-600">
              How it works
            </a>
            <a href="#faq" onClick={() => setOpen(false)} className="text-neutral-600">
              FAQ
            </a>
            <a
              href="#quote"
              onClick={() => setOpen(false)}
              className="bg-lane-accent text-lane-ink font-medium px-4 py-2.5 rounded-md text-center"
            >
              Get a quote
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

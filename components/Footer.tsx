import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-lane-ink py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          <div>
            <p className="text-white font-semibold text-lg mb-3">Lane</p>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Scheduled auto transport.
              <br />
              Published prices.
              <br />
              Know your carrier before you book.
            </p>
          </div>

          <div>
            <p className="text-neutral-500 text-[11px] uppercase tracking-widest font-medium mb-4">
              Contact
            </p>
            <div className="flex flex-col gap-2 text-sm text-neutral-400">
              <a href="tel:+18326007513" className="hover:text-neutral-200 transition-colors">
                (832) 600-7513
              </a>
              <a href="mailto:freight@limitlesspro.one" className="hover:text-neutral-200 transition-colors">
                freight@limitlesspro.one
              </a>
              <span>Houston, TX · Texas operations</span>
            </div>
          </div>

          <div>
            <p className="text-neutral-500 text-[11px] uppercase tracking-widest font-medium mb-4">
              Authority
            </p>
            <div className="flex flex-col gap-2 text-sm text-neutral-400">
              <span>A Limitless Pro LLC company</span>
              <span className="font-mono">MC#1532052</span>
              <span>BMC-84 bond #JT016993</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-neutral-600">
          <span>© 2026 Limitless Pro LLC. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-neutral-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-neutral-400 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

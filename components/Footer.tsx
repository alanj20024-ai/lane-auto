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
              <span>(713) XXX-XXXX</span>
              <span>hello@laneauto.com</span>
              <span>Houston, TX</span>
            </div>
          </div>

          <div>
            <p className="text-neutral-500 text-[11px] uppercase tracking-widest font-medium mb-4">
              Authority
            </p>
            <div className="flex flex-col gap-2 text-sm text-neutral-400">
              <span>A Limitless Pro LLC company</span>
              <span className="font-mono">MC#XXXXXX</span>
              <span>BMC-84 surety bond posted</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-xs text-neutral-600">
          © 2026 Limitless Pro LLC. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

import { ShieldCheck, Banknote, Truck, MapPin, type LucideIcon } from 'lucide-react'

type TrustItem = {
  Icon: LucideIcon
  heading: string
  primary: string
  sub: string
  href?: string
}

const FMCSA_URL =
  'http://li-public.fmcsa.dot.gov/LIVIEW/pkg_carrquery.prc_carrlist?n_dotno=4045921&s_prefix=MC&n_docketno=1532052&s_legalname=&s_dbaname=&s_state='

const items: TrustItem[] = [
  {
    Icon: ShieldCheck,
    heading: 'FMCSA verified',
    primary: 'MC#1532052',
    sub: 'Active broker authority',
    href: FMCSA_URL,
  },
  {
    Icon: Banknote,
    heading: 'BMC-84 bonded',
    primary: '$75,000 surety bond',
    sub: 'Bond #JT016993',
  },
  {
    Icon: Truck,
    heading: 'Insured carrier network',
    primary: 'Cargo coverage on every haul',
    sub: 'Licensed motor carriers only',
  },
  {
    Icon: MapPin,
    heading: 'Texas operations',
    primary: 'Houston-based',
    sub: 'Texas Triangle since 2026',
  },
]

export default function TrustStrip() {
  return (
    <section className="border-y border-[#E8E6DE] bg-lane-bg">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 lg:divide-x divide-[#E8E6DE]">
        {items.map(({ Icon, heading, primary, sub, href }, i) => (
          <div
            key={heading}
            className={[
              'flex items-start gap-3 px-5 py-5 sm:px-6',
              // Mobile: add bottom border to top row
              i < 2 ? 'border-b border-[#E8E6DE] lg:border-b-0' : '',
            ].join(' ')}
          >
            <Icon className="w-4 h-4 shrink-0 mt-0.5 text-neutral-400" />
            <div className="min-w-0">
              <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-0.5">
                {heading}
              </p>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm font-semibold text-lane-ink hover:underline underline-offset-2 leading-snug"
                >
                  {primary}
                </a>
              ) : (
                <p className="text-sm font-semibold text-lane-ink leading-snug">{primary}</p>
              )}
              <p className="text-xs text-neutral-400 mt-0.5 leading-snug">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

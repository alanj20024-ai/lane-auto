// Inline SVG service area map — no external assets, no fill on state outline
export default function TexasMap() {
  return (
    <section className="bg-white border-b border-lane-divider py-14 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-lane-ink mb-2">
            Service area
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base">
            Three lanes, one DFW-bound truck. Thursdays and Fridays from Houston.
          </p>
        </div>

        <div className="w-full">
          {/*
            viewBox 580×530. Texas outline is stroke-only (no fill).
            City dots: r=4 (8px), fill #0F0F0F, stroke white.
            Lane lines: #00D17A, 2px stroke, quadratic bezier.
          */}
          <svg
            viewBox="0 0 580 530"
            className="w-full max-w-[680px] mx-auto block"
            aria-label="Texas service area map"
          >
            <defs>
              <style>{`
                .city-label { font-family: Inter, system-ui, sans-serif; font-size: 13px; font-weight: 500; fill: #0F0F0F; }
                .city-dot { transition: r 0.15s; }
              `}</style>
            </defs>

            {/* ── Texas state outline (stroke only, no fill) ─────────── */}
            <path
              d={[
                'M 155,28',
                'L 290,28',
                'L 290,112',
                'L 470,112',
                'L 478,155',
                'L 484,212',
                'L 480,270',
                'L 470,328',
                'L 452,375',
                'L 434,415',
                'L 402,452',
                'L 358,472',
                'L 305,482',
                'L 255,474',
                'L 205,452',
                'L 160,422',
                'L 122,385',
                'L 92,342',
                'L 66,298',
                'L 50,252',
                'L 46,208',
                'L 52,170',
                'L 70,147',
                'L 92,132',
                'L 120,120',
                'L 155,112',
                'Z',
              ].join(' ')}
              fill="none"
              stroke="#0F0F0F"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* ── Lane lines: Houston → each DFW city ──────────────────
                Fan out from slightly different points on Houston to avoid
                single overlapping line. Quadratic bezier with right bias. */}

            {/* HOU → Dallas */}
            <path
              d="M 431,361 Q 478,268 416,200"
              fill="none"
              stroke="#00D17A"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* HOU → Fort Worth */}
            <path
              d="M 430,366 Q 456,276 380,205"
              fill="none"
              stroke="#00D17A"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* HOU → Arlington */}
            <path
              d="M 433,364 Q 465,272 397,210"
              fill="none"
              stroke="#00D17A"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* ── City dots ─────────────────────────────────────────────
                8px diameter (r=4), near-black fill, white ring. */}

            {/* Houston */}
            <circle cx="433" cy="365" r="4" fill="#0F0F0F" stroke="white" strokeWidth="2.5" />
            <text x="433" y="348" textAnchor="middle" className="city-label">
              Houston
            </text>

            {/* Dallas — label right-anchored so it clears Fort Worth */}
            <circle cx="416" cy="200" r="4" fill="#0F0F0F" stroke="white" strokeWidth="2.5" />
            <text x="432" y="186" textAnchor="start" className="city-label">
              Dallas
            </text>

            {/* Fort Worth — label left-anchored */}
            <circle cx="380" cy="205" r="4" fill="#0F0F0F" stroke="white" strokeWidth="2.5" />
            <text x="364" y="190" textAnchor="end" className="city-label">
              Fort Worth
            </text>

            {/* Arlington — smaller, label below to avoid DFW cluster overlap */}
            <circle cx="397" cy="210" r="3.5" fill="#0F0F0F" stroke="white" strokeWidth="2" />
            <text x="397" y="227" textAnchor="middle" className="city-label" style={{ fontSize: '11px' }}>
              Arlington
            </text>
          </svg>
        </div>
      </div>
    </section>
  )
}

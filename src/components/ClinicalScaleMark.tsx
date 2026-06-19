export function ClinicalScaleMark({
  className,
  showWordmark = false,
}: {
  className?: string
  showWordmark?: boolean
}) {
  return (
    <div className={`flex flex-col items-center ${className ?? ""}`}>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-label="Clinical Scale"
      >
        <defs>
          <linearGradient id="cs-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DEC59C" />
            <stop offset="100%" stopColor="#A88656" />
          </linearGradient>
          <linearGradient id="cs-forest" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A4434" />
            <stop offset="100%" stopColor="#1F3B2D" />
          </linearGradient>
        </defs>

        {/* gauge arc — gold segment top-left */}
        <path
          d="M 50 30 A 80 80 0 0 1 100 18"
          fill="none"
          stroke="url(#cs-gold)"
          strokeWidth="14"
          strokeLinecap="butt"
        />

        {/* small gap */}

        {/* gauge arc — forest segment top-right */}
        <path
          d="M 108 18 A 80 80 0 0 1 173 65"
          fill="none"
          stroke="url(#cs-forest)"
          strokeWidth="14"
          strokeLinecap="butt"
        />

        {/* gauge arc — forest segment bottom (large) */}
        <path
          d="M 178 75 A 80 80 0 1 1 45 36"
          fill="none"
          stroke="url(#cs-forest)"
          strokeWidth="14"
          strokeLinecap="butt"
        />

        {/* needle */}
        <line
          x1="100"
          y1="100"
          x2="148"
          y2="50"
          stroke="url(#cs-gold)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="100" cy="100" r="6" fill="#1F3B2D" />
        <circle cx="100" cy="100" r="3" fill="#C9A876" />

        {/* CS monogram */}
        <text
          x="100"
          y="118"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontWeight="500"
          fontSize="58"
          fill="#1F3B2D"
          letterSpacing="-3"
        >
          CS
        </text>
      </svg>

      {showWordmark && (
        <div className="mt-3 flex items-center gap-3 text-[#1F3B2D]">
          <span className="h-px w-6 bg-[#C9A876]" />
          <span className="font-display tracking-display text-sm">
            <span className="text-[#1F3B2D]">Clinical</span>{" "}
            <span className="text-[#C9A876]">Scale</span>
          </span>
          <span className="h-px w-6 bg-[#C9A876]" />
        </div>
      )}
    </div>
  )
}

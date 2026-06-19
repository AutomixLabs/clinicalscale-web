"use client"

import { useEffect, useRef, useState } from "react"

export function VoiceWave({ bars = 64 }: { bars?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setActive(true),
      { threshold: 0.2 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center gap-[3px] h-20"
      aria-hidden="true"
    >
      {Array.from({ length: bars }).map((_, i) => {
        const delay = (i * 70) % 1400
        const variance = (Math.sin(i * 1.3) + 1) * 0.5
        const baseH = 20 + variance * 50
        return (
          <span
            key={i}
            className="block w-[3px] rounded-full bg-gradient-to-t from-gold-deep to-gold-soft"
            style={{
              height: active ? `${baseH}%` : "10%",
              animation: active
                ? `voice-pulse 1.4s ease-in-out ${delay}ms infinite alternate`
                : "none",
              transition: "height 0.6s ease-out",
            }}
          />
        )
      })}
      <style>{`
        @keyframes voice-pulse {
          0%   { transform: scaleY(0.2); opacity: 0.4; }
          50%  { transform: scaleY(0.9); opacity: 0.9; }
          100% { transform: scaleY(0.45); opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}

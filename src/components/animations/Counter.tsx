"use client"

import { useEffect, useRef, useState } from "react"

interface CounterProps {
  value: string
  duration?: number
  className?: string
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

function parseNumeric(raw: string): { num: number; prefix: string; suffix: string } {
  const match = raw.match(/^(\D*)([\d.,]+)(\D*)$/)
  if (!match) return { num: 0, prefix: raw, suffix: "" }
  const [, prefix, digits, suffix] = match
  const normalized = digits.replace(/\./g, "").replace(",", ".")
  return { num: parseFloat(normalized) || 0, prefix, suffix }
}

function formatThousands(n: number): string {
  return Math.round(n).toLocaleString("es-ES").replace(/,/g, ".")
}

export function Counter({ value, duration = 1600, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true)
      },
      { threshold: 0.5 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) {
      setDisplay(value.replace(/[\d.,]+/g, "0"))
      return
    }
    const { num, prefix, suffix } = parseNumeric(value)
    if (num === 0) {
      setDisplay(value)
      return
    }
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = easeOutCubic(t)
      const current = num * eased
      setDisplay(`${prefix}${formatThousands(current)}${suffix}`)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, value, duration])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

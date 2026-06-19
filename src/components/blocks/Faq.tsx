"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Plus } from "lucide-react"

export function Faq() {
  const t = useTranslations("faq")
  const [open, setOpen] = useState<number | null>(0)

  const items = [1, 2, 3, 4, 5].map((i) => ({
    q: t(`q${i}` as "q1"),
    a: t(`a${i}` as "a1"),
  }))

  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-display font-medium text-gold-deep mb-4">
              {t("eyebrow")}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium text-forest leading-tight">
              {t("title")}
            </h2>
          </div>

          <div className="space-y-3">
            {items.map((it, i) => (
              <div
                key={i}
                className="rounded-2xl border border-line bg-cream-soft overflow-hidden"
              >
                <button
                  className="w-full text-left p-5 lg:p-6 flex items-start gap-4 hover:bg-cream transition-colors"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="flex-1 font-display text-lg lg:text-xl font-medium text-forest">
                    {it.q}
                  </span>
                  <Plus
                    className={`size-5 shrink-0 text-gold-deep transition-transform duration-300 ${
                      open === i ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    open === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 lg:px-6 pb-5 lg:pb-6 text-base text-ink-soft leading-relaxed border-t border-line-soft pt-4">
                    {it.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

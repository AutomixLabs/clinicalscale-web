import { useTranslations } from "next-intl"
import { Layers, Sparkles, Flag, ArrowRightLeft } from "lucide-react"

export function WhyClinicalScale() {
  const t = useTranslations("why")

  const items = [
    { icon: Layers, title: t("w1Title"), desc: t("w1Desc") },
    { icon: Sparkles, title: t("w2Title"), desc: t("w2Desc") },
    { icon: Flag, title: t("w3Title"), desc: t("w3Desc") },
    { icon: ArrowRightLeft, title: t("w4Title"), desc: t("w4Desc") },
  ]

  return (
    <section id="why" className="py-24 lg:py-32 bg-cream-soft border-y border-line-soft">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-[11px] tracking-display font-medium text-gold-deep mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-medium text-forest leading-tight">
            {t("title1")}
            <br />
            <span className="italic text-gold">{t("title2")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {items.map((it, i) => (
            <div
              key={i}
              className="rounded-2xl border border-line bg-cream p-7 lg:p-8 hover:border-gold/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-forest text-cream flex items-center justify-center mb-5">
                <it.icon className="size-5" />
              </div>
              <h3 className="font-display text-xl lg:text-2xl font-medium text-forest mb-3">{it.title}</h3>
              <p className="text-sm lg:text-base text-ink-soft leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

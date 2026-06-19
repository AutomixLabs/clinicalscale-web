import { useTranslations } from "next-intl"
import { Monitor, FileText, Wallet, Keyboard } from "lucide-react"

export function Problem() {
  const t = useTranslations("problem")

  const items = [
    { icon: Monitor, title: t("p1Title"), desc: t("p1Desc") },
    { icon: FileText, title: t("p2Title"), desc: t("p2Desc") },
    { icon: Wallet, title: t("p3Title"), desc: t("p3Desc") },
    { icon: Keyboard, title: t("p4Title"), desc: t("p4Desc") },
  ]

  return (
    <section className="py-24 lg:py-32 bg-cream-soft border-y border-line-soft">
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
          <p className="mt-5 text-lg text-ink-soft">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {items.map((it, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-line bg-cream p-6 lg:p-7 hover:border-gold/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-forest/8 flex items-center justify-center group-hover:bg-gold/15 transition-colors">
                  <it.icon className="size-5 text-forest group-hover:text-gold-deep transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-medium text-forest mb-1.5">
                    {it.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{it.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

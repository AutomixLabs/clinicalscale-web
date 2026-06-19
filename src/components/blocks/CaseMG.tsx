import { useTranslations } from "next-intl"
import { Quote } from "lucide-react"

export function CaseMG() {
  const t = useTranslations("case")

  return (
    <section id="case" className="py-24 lg:py-32">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <p className="text-[11px] tracking-display font-medium text-gold-deep mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-forest leading-[1.05] tracking-tight">
            {t("title1")}
            <br />
            <span className="italic text-gold">{t("title2")}</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
            <MetricCard value={t("metric1Value")} label={t("metric1Label")} />
            <MetricCard value={t("metric2Value")} label={t("metric2Label")} accent />
            <MetricCard value={t("metric3Value")} label={t("metric3Label")} />
          </div>

          <div className="rounded-3xl bg-forest p-8 lg:p-14 relative overflow-hidden">
            <div className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-gold/15 blur-3xl" />

            <Quote className="size-12 text-gold/40 mb-5" />

            <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl text-cream leading-relaxed max-w-4xl">
              "{t("quote")}"
            </blockquote>

            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
                <span className="font-display text-lg text-gold">MG</span>
              </div>
              <div>
                <p className="text-cream font-medium">{t("author")}</p>
                <p className="text-sm text-cream/60">{t("role")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MetricCard({ value, label, accent = false }: { value: string; label: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-2xl border p-6 lg:p-8 ${
        accent ? "bg-gold/10 border-gold/30" : "bg-cream-soft border-line"
      }`}
    >
      <p
        className={`font-display text-5xl lg:text-6xl font-medium leading-none ${
          accent ? "text-gold-deep" : "text-forest"
        }`}
      >
        {value}
      </p>
      <p className="mt-3 text-sm text-ink-soft">{label}</p>
    </div>
  )
}

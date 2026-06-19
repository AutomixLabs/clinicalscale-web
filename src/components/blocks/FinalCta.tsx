import { useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"

export function FinalCta() {
  const t = useTranslations("cta")

  return (
    <section id="cta" className="py-24 lg:py-32 bg-forest relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-gold/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-gold/8 blur-3xl" />

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-cream leading-[1.05]">
            {t("title1")}
            <br />
            <span className="italic text-gold">{t("title2")}</span>
          </h2>
          <p className="mt-7 text-lg sm:text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="mt-10">
            <a
              href="mailto:hola@clinicalscale.com?subject=Quiero%20una%20demo%20de%20Clinical%20Scale"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-9 py-4 text-base font-medium text-forest-deep hover:bg-gold-soft transition-colors shadow-[0_8px_28px_-8px_rgba(201,168,118,0.5)]"
            >
              {t("primaryCta")}
              <ArrowRight className="size-4" />
            </a>
          </div>

          <p className="mt-6 text-xs text-cream/50">{t("microcopy")}</p>
        </div>
      </div>
    </section>
  )
}

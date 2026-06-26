import { useTranslations } from "next-intl"
import { DemoForm } from "./DemoForm"

export function FinalCta() {
  const t = useTranslations("cta")

  return (
    <section id="cta" className="py-24 lg:py-32 bg-forest relative overflow-hidden scroll-mt-24">
      <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-gold/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-gold/8 blur-3xl" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
          <div className="text-center lg:text-left">
            <h2 className="font-display text-4xl sm:text-5xl font-medium text-cream leading-[1.05]">
              {t("title1")}
              <br />
              <span className="italic text-gold">{t("title2")}</span>
            </h2>
            <p className="mt-7 text-lg text-cream/70 max-w-md mx-auto lg:mx-0 leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <DemoForm />
        </div>
      </div>
    </section>
  )
}

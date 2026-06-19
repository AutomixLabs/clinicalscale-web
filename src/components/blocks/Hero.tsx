import { useTranslations } from "next-intl"
import { ArrowRight, ShieldCheck, MapPin, Sparkles } from "lucide-react"

export function Hero() {
  const t = useTranslations("hero")

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">
      <div className="pointer-events-none absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-gold/12 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-32 h-[28rem] w-[28rem] rounded-full bg-forest/6 blur-3xl" />

      <div className="container relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-cream-soft px-4 py-1.5 text-[11px] tracking-display font-medium text-gold-deep">
            <Sparkles className="size-3" />
            {t("eyebrow")}
          </span>

          <h1 className="mt-7 font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-medium text-forest leading-[1.02] tracking-tight">
            {t("title1")}
            <br />
            <span className="italic text-gold">{t("title2")}</span>
          </h1>

          <p className="mt-7 text-lg sm:text-xl text-ink-soft max-w-2xl leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href="#cta"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-8 py-4 text-base font-medium text-cream hover:bg-forest-deep transition-colors shadow-[0_8px_28px_-8px_rgba(31,59,45,0.4)]"
            >
              {t("primaryCta")}
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#case"
              className="inline-flex items-center justify-center rounded-full border border-forest/20 bg-transparent px-8 py-4 text-base font-medium text-forest hover:bg-forest/5 transition-colors"
            >
              {t("secondaryCta")}
            </a>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
            <TrustItem icon={MapPin} label={t("trust1")} />
            <TrustItem icon={ShieldCheck} label={t("trust2")} />
            <TrustItem icon={Sparkles} label={t("trust3")} />
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustItem({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 text-sm text-ink-soft">
      <Icon className="size-4 text-gold-deep" />
      <span>{label}</span>
    </div>
  )
}

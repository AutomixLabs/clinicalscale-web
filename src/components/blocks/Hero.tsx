import { useTranslations } from "next-intl"
import { ArrowRight, ShieldCheck, MapPin, Sparkles } from "lucide-react"
import { Reveal } from "@/components/animations/Reveal"

export function Hero() {
  const t = useTranslations("hero")

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">
      <div className="pointer-events-none absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-gold/12 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-32 h-[28rem] w-[28rem] rounded-full bg-forest/6 blur-3xl" />

      <div className="container relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <Reveal y={12}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-cream-soft px-4 py-1.5 text-[11px] tracking-display font-medium text-gold-deep">
              <Sparkles className="size-3" />
              {t("eyebrow")}
            </span>
          </Reveal>

          <Reveal y={28} delay={0.05}>
            <h1 className="mt-7 font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-medium text-forest leading-[1.02] tracking-tight">
              {t("title1")}
              <br />
              <span className="italic text-gold">{t("title2")}</span>
            </h1>
          </Reveal>

          <Reveal y={20} delay={0.18}>
            <p className="mt-7 text-lg sm:text-xl text-ink-soft max-w-2xl leading-relaxed">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal y={20} delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#cta"
                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-forest px-8 py-4 text-base font-medium text-cream transition-all duration-300 hover:bg-forest-deep hover:-translate-y-0.5 shadow-[0_8px_28px_-8px_rgba(31,59,45,0.4)] hover:shadow-[0_16px_40px_-12px_rgba(201,168,118,0.5)]"
              >
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative">{t("primaryCta")}</span>
                <ArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#case"
                className="inline-flex items-center justify-center rounded-full border border-forest/20 bg-transparent px-8 py-4 text-base font-medium text-forest hover:bg-forest/5 transition-colors"
              >
                {t("secondaryCta")}
              </a>
            </div>
          </Reveal>

          <Reveal y={16} delay={0.4}>
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
              <TrustItem icon={MapPin} label={t("trust1")} />
              <TrustItem icon={ShieldCheck} label={t("trust2")} />
              <TrustItem icon={Sparkles} label={t("trust3")} />
            </div>
          </Reveal>
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

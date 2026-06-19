import { useTranslations } from "next-intl"
import {
  CalendarDays,
  Users,
  CreditCard,
  BarChart3,
  UserPlus,
  Boxes,
  ShieldCheck,
  Database,
} from "lucide-react"

export function CapabilitiesGrid() {
  const t = useTranslations("grid")

  const items = [
    { icon: CalendarDays, title: t("g1Title"), desc: t("g1Desc") },
    { icon: Users, title: t("g2Title"), desc: t("g2Desc") },
    { icon: CreditCard, title: t("g3Title"), desc: t("g3Desc") },
    { icon: BarChart3, title: t("g4Title"), desc: t("g4Desc") },
    { icon: UserPlus, title: t("g5Title"), desc: t("g5Desc") },
    { icon: Boxes, title: t("g6Title"), desc: t("g6Desc") },
    { icon: ShieldCheck, title: t("g7Title"), desc: t("g7Desc") },
    { icon: Database, title: t("g8Title"), desc: t("g8Desc") },
  ]

  return (
    <section className="py-24 lg:py-32 bg-cream-soft border-y border-line-soft">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-[11px] tracking-display font-medium text-gold-deep mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-medium text-forest leading-tight">
            {t("title1")}
            <br />
            <span className="italic text-gold">{t("title2")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {items.map((it, i) => (
            <div
              key={i}
              className="rounded-2xl border border-line bg-cream p-6 hover:border-gold/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-forest/8 flex items-center justify-center mb-4">
                <it.icon className="size-5 text-forest" />
              </div>
              <h3 className="font-display text-lg font-medium text-forest mb-1.5">{it.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

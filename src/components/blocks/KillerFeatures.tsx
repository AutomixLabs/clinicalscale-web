import { useTranslations } from "next-intl"
import { Mic, FileSignature, Tablet, ArrowUpRight } from "lucide-react"
import { VoiceWave } from "@/components/animations/VoiceWave"
import { Reveal } from "@/components/animations/Reveal"

export function KillerFeatures() {
  const t = useTranslations("killer")

  const features = [
    {
      icon: Mic,
      tag: t("f1Tag"),
      title: t("f1Title"),
      desc: t("f1Desc"),
      visual: <DictationVisual />,
    },
    {
      icon: FileSignature,
      tag: t("f2Tag"),
      title: t("f2Title"),
      desc: t("f2Desc"),
      visual: <BudgetVisual />,
    },
    {
      icon: Tablet,
      tag: t("f3Tag"),
      title: t("f3Title"),
      desc: t("f3Desc"),
      visual: <KioskVisual />,
    },
  ]

  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <p className="text-[11px] tracking-display font-medium text-gold-deep mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-forest leading-tight">
            {t("title1")}{" "}
            <span className="italic text-gold">{t("title2")}</span>
          </h2>
        </div>

        <div className="space-y-10 lg:space-y-24">
          {features.map((f, i) => {
            const reversed = i % 2 === 1
            return (
              <Reveal key={i} y={36} delay={0}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  <div className={reversed ? "lg:order-2" : ""}>
                    <span className="inline-flex items-center gap-1.5 text-[11px] tracking-display font-medium text-gold-deep mb-4">
                      <f.icon className="size-3.5" />
                      {f.tag}
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-forest leading-tight mb-5">
                      {f.title}
                    </h3>
                    <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl">
                      {f.desc}
                    </p>
                  </div>

                  <div className={reversed ? "lg:order-1" : ""}>{f.visual}</div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function DictationVisual() {
  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-cream-deep to-cream-soft border border-line p-8 shadow-lg overflow-hidden">
      <div className="pointer-events-none absolute -top-12 -right-12 size-48 rounded-full bg-gold/15 blur-3xl" />

      <div className="flex items-center justify-between mb-6 relative">
        <div className="flex items-center gap-2.5 text-xs font-medium text-ink-soft">
          <span className="relative flex size-2.5">
            <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
            <span className="relative rounded-full bg-red-500 size-2.5" />
          </span>
          Grabando en directo
        </div>
        <span className="font-mono text-xs text-muted">02:14</span>
      </div>

      <div className="rounded-2xl bg-forest p-6 mb-5 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest via-transparent to-forest opacity-40" />
        <VoiceWave bars={56} />
      </div>

      <div className="rounded-xl bg-cream border border-line-soft p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] tracking-display font-medium text-gold-deep">SOAP · Generado por IA</p>
          <span className="text-[10px] text-muted">hace 1s</span>
        </div>
        <div className="space-y-2.5 text-sm">
          <div>
            <p className="text-forest font-medium mb-1">S — Subjetivo</p>
            <p className="text-ink-soft text-xs leading-relaxed">
              Paciente refiere sensibilidad en 36 al frío desde hace 2 semanas.
            </p>
          </div>
          <div>
            <p className="text-forest font-medium mb-1">O — Objetivo</p>
            <p className="text-ink-soft text-xs leading-relaxed">
              Test de frío positivo, percusión negativa, sin caries clínica visible.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function BudgetVisual() {
  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-cream-deep to-cream-soft border border-line p-8 shadow-sm">
      <div className="rounded-2xl bg-cream border border-line-soft p-5 shadow-lg max-w-[280px] mx-auto">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-line-soft">
          <div>
            <p className="text-[10px] tracking-display font-medium text-gold-deep">Presupuesto</p>
            <p className="text-sm font-medium text-forest">P-2026-0184</p>
          </div>
          <ArrowUpRight className="size-4 text-ink-soft" />
        </div>
        <div className="space-y-2.5 text-xs mb-4">
          <BudgetLine label="Endodoncia 36" price="285 €" accepted />
          <BudgetLine label="Empaste 37" price="95 €" accepted />
          <BudgetLine label="Limpieza" price="60 €" />
          <BudgetLine label="Blanqueamiento" price="320 €" />
        </div>
        <div className="flex items-center justify-between text-sm pt-3 border-t border-line-soft">
          <span className="text-ink-soft">Aceptado</span>
          <span className="font-display font-medium text-forest text-lg">380 €</span>
        </div>
        <button className="mt-4 w-full rounded-lg bg-forest text-cream py-2 text-xs font-medium">
          Aceptar y firmar
        </button>
      </div>
    </div>
  )
}

function BudgetLine({ label, price, accepted = false }: { label: string; price: string; accepted?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 flex-1">
        <span
          className={`size-3.5 rounded-sm border ${
            accepted ? "bg-forest border-forest" : "border-line"
          } flex items-center justify-center`}
        >
          {accepted && <span className="text-cream text-[8px]">✓</span>}
        </span>
        <span className={accepted ? "text-forest" : "text-ink-soft"}>{label}</span>
      </div>
      <span className={accepted ? "text-forest font-medium" : "text-ink-soft"}>{price}</span>
    </div>
  )
}

function KioskVisual() {
  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-cream-deep to-cream-soft border border-line p-8 shadow-sm">
      <div className="rounded-[2rem] bg-forest p-3 max-w-[280px] mx-auto shadow-xl">
        <div className="rounded-2xl bg-cream p-5">
          <div className="text-center mb-4">
            <div className="inline-block mb-2 px-2 py-0.5 rounded-full bg-gold/15 text-[9px] tracking-display font-medium text-gold-deep">
              Bienvenido
            </div>
            <p className="font-display text-sm font-medium text-forest leading-tight">
              Tus datos<br />en 2 minutos
            </p>
          </div>
          <div className="space-y-2 mb-4">
            <KioskField label="Nombre" value="María García" />
            <KioskField label="Teléfono" value="600 123 456" />
            <KioskField label="DNI" value="••• 4567A" />
          </div>
          <div className="rounded-lg border border-line-soft p-3 mb-3">
            <p className="text-[10px] text-ink-soft mb-2">Consentimiento RGPD</p>
            <div className="h-8 bg-cream-deep rounded flex items-center justify-center">
              <span className="font-display italic text-sm text-forest">M. García</span>
            </div>
          </div>
          <button className="w-full rounded-lg bg-forest text-cream py-2 text-xs font-medium">
            Firmar y continuar
          </button>
        </div>
      </div>
    </div>
  )
}

function KioskField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-cream-deep px-3 py-2">
      <p className="text-[9px] text-muted">{label}</p>
      <p className="text-xs text-forest font-medium">{value}</p>
    </div>
  )
}

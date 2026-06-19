import { getTranslations, setRequestLocale } from "next-intl/server"
import { ClinicalScaleMark } from "@/components/ClinicalScaleMark"
import { Link } from "@/i18n/navigation"

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("hero")

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-[#F5EDE2] overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-[#C9A876]/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-[#1F3B2D]/8 blur-3xl" />

      <div className="relative flex flex-col items-center text-center max-w-3xl">
        <ClinicalScaleMark className="h-28 w-28 mb-10" />

        <span className="font-sans text-[11px] tracking-display text-[#A88656] mb-6">
          {t("eyebrow")}
        </span>

        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium text-[#1F3B2D] leading-[1.05]">
          {t("title1")}
          <br />
          <span className="italic text-[#C9A876]">{t("title2")}</span>
        </h1>

        <p className="mt-7 text-lg sm:text-xl text-[#4A5A4F] max-w-2xl leading-relaxed">
          {t("subtitle")}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:hola@clinicalscale.com?subject=Quiero%20una%20demo%20de%20Clinical%20Scale"
            className="inline-flex items-center justify-center rounded-full bg-[#1F3B2D] text-[#F5EDE2] px-8 py-4 text-base font-medium hover:bg-[#152920] transition-colors shadow-[0_4px_20px_-4px_rgba(31,59,45,0.3)]"
          >
            {t("primaryCta")}
          </a>
          <a
            href="https://app.clinicalscale.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[#1F3B2D]/20 bg-transparent text-[#1F3B2D] px-8 py-4 text-base font-medium hover:bg-[#1F3B2D]/5 transition-colors"
          >
            {t("secondaryCta")}
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium text-[#7A8A7F]">
          <span>{t("trust1")}</span>
          <span className="text-[#D9CBB3]">·</span>
          <span>{t("trust2")}</span>
          <span className="text-[#D9CBB3]">·</span>
          <span>{t("trust3")}</span>
        </div>

        <p className="mt-16 text-[11px] tracking-display text-[#7A8A7F]">
          {locale === "ca" ? (
            <Link href="/" locale="es" className="hover:text-[#1F3B2D] transition-colors">
              Castellano
            </Link>
          ) : (
            <Link href="/" locale="ca" className="hover:text-[#1F3B2D] transition-colors">
              Català
            </Link>
          )}
          {" · "}
          <span>Powered by AutomixLabs (Grupo ASM)</span>
        </p>
      </div>
    </main>
  )
}

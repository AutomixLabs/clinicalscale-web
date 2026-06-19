import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ClinicalScaleMark } from "@/components/ClinicalScaleMark"

export function Footer() {
  const t = useTranslations("footer")
  const locale = useLocale()
  const year = 2026

  return (
    <footer className="bg-cream-deep border-t border-line-soft py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <ClinicalScaleMark className="h-10 w-10" />
              <span className="font-display text-xl font-medium text-forest">
                Clinical <span className="text-gold">Scale</span>
              </span>
            </div>
            <p className="text-sm text-ink-soft leading-relaxed max-w-sm mb-6">{t("tagline")}</p>
            <p className="text-[11px] tracking-display font-medium text-muted">{t("powered")}</p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] tracking-display font-medium text-gold-deep mb-4">
              {t("productHeading")}
            </p>
            <ul className="space-y-2.5 text-sm text-ink-soft">
              <li><a href="#features" className="hover:text-forest transition-colors">{t("productFeatures")}</a></li>
              <li><a href="#why" className="hover:text-forest transition-colors">{t("productWhy")}</a></li>
              <li><a href="#case" className="hover:text-forest transition-colors">{t("productCase")}</a></li>
              <li><a href="#faq" className="hover:text-forest transition-colors">{t("productFaq")}</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-[11px] tracking-display font-medium text-gold-deep mb-4">
              {t("loginHeading")}
            </p>
            <ul className="space-y-2.5 text-sm text-ink-soft">
              <li>
                <a
                  href="https://app.clinicalscale.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-forest transition-colors"
                >
                  {t("loginCta")} →
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-[11px] tracking-display font-medium text-gold-deep mb-4">
              {t("language")}
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              <Link
                href="/"
                locale="es"
                className={locale === "es" ? "text-forest font-medium" : "text-ink-soft hover:text-forest transition-colors"}
              >
                Castellano
              </Link>
              <Link
                href="/"
                locale="ca"
                className={locale === "ca" ? "text-forest font-medium" : "text-ink-soft hover:text-forest transition-colors"}
              >
                Català
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-line-soft flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-muted">
          <p>© {year} Clinical Scale. {t("rights")}</p>
          <p>hola@clinicalscale.com</p>
        </div>
      </div>
    </footer>
  )
}

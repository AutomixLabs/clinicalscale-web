"use client"

import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
import { Menu, X } from "lucide-react"
import { ClinicalScaleMark } from "@/components/ClinicalScaleMark"
import { cn } from "@/lib/utils"

export function Navbar() {
  const t = useTranslations("nav")
  const locale = useLocale()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { label: t("features"), href: "#features" },
    { label: t("case"), href: "#case" },
    { label: t("why"), href: "#why" },
    { label: t("faq"), href: "#faq" },
  ]

  return (
    <header className="fixed left-1/2 top-5 z-50 w-[min(96%,1100px)] -translate-x-1/2 lg:top-7">
      <div className="rounded-full border border-forest/12 bg-cream/85 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(31,59,45,0.18)]">
        <div className="flex items-center justify-between px-5 py-2.5">
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            }}
          >
            <ClinicalScaleMark className="h-8 w-8" />
            <span className="font-display text-lg font-medium text-forest tracking-tight hidden sm:inline">
              Clinical <span className="text-gold">Scale</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm text-ink-soft">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-forest transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="hidden md:flex items-center gap-0.5 rounded-full border border-forest/15 bg-cream-soft p-0.5 shadow-inner relative">
              <Link
                href={pathname}
                locale="es"
                className={cn(
                  "relative z-10 px-3 py-1 text-[11px] tracking-display font-semibold rounded-full transition-colors",
                  locale === "es" ? "text-cream" : "text-muted hover:text-forest"
                )}
              >
                ES
              </Link>
              <Link
                href={pathname}
                locale="ca"
                className={cn(
                  "relative z-10 px-3 py-1 text-[11px] tracking-display font-semibold rounded-full transition-colors",
                  locale === "ca" ? "text-cream" : "text-muted hover:text-forest"
                )}
              >
                CA
              </Link>
              <span
                className={cn(
                  "absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-forest shadow-md transition-transform duration-300 ease-out",
                  locale === "ca" ? "translate-x-[calc(100%-0px)]" : "translate-x-0",
                  "left-0.5"
                )}
              />
            </div>

            <a
              href="https://app.clinicalscale.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium text-forest hover:bg-forest/5 transition-colors"
            >
              {t("login")}
            </a>

            <a
              href="#cta"
              className="inline-flex items-center justify-center rounded-full bg-forest px-5 py-2 text-sm font-medium text-cream hover:bg-forest-deep transition-colors shadow-[0_4px_14px_-4px_rgba(31,59,45,0.4)]"
            >
              {t("demoCta")}
            </a>

            <button
              className="lg:hidden p-1.5 text-forest"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-forest/8 px-5 py-4 space-y-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm text-ink-soft hover:text-forest transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://app.clinicalscale.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-sm text-forest font-medium"
            >
              {t("login")} →
            </a>
          </div>
        )}
      </div>
    </header>
  )
}

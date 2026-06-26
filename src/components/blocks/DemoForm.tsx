"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useLocale, useTranslations } from "next-intl"
import { ArrowRight, Check, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const SIZE_OPTIONS = [
  { v: "1-3", k: "size1" },
  { v: "4-10", k: "size2" },
  { v: "11-25", k: "size3" },
  { v: "26+", k: "size4" },
] as const

export function DemoForm() {
  const t = useTranslations("form")
  const locale = useLocale()
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const schema = z.object({
    name: z.string().min(2, t("required")),
    email: z
      .string()
      .min(1, t("required"))
      .regex(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, t("invalidEmail")),
    company: z.string().optional(),
    employees: z.string().optional(),
    message: z.string().optional(),
    agree: z.literal(true, { message: t("required") }),
    website: z.string().optional(), // honeypot
  })
  type FormValues = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", employees: "", message: "", website: "" },
  })

  async function onSubmit(values: FormValues) {
    setStatus("sending")
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white p-8 sm:p-10 text-center shadow-[0_24px_48px_-12px_rgba(10,20,15,0.25)]">
        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-forest">
          <Check className="size-7 text-cream" />
        </div>
        <h3 className="font-display text-2xl font-medium text-forest">{t("successTitle")}</h3>
        <p className="mt-3 text-ink-soft">{t("successBody")}</p>
      </div>
    )
  }

  const fieldCls =
    "h-11 rounded-lg border-line bg-cream-soft text-ink placeholder:text-muted focus-visible:border-gold focus-visible:ring-gold/30"
  const labelCls = "mb-1.5 block text-sm font-medium text-ink"
  const errCls = "mt-1 text-xs text-red-600"

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl bg-white p-6 sm:p-8 text-left shadow-[0_24px_48px_-12px_rgba(10,20,15,0.25)]"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="df-name" className={labelCls}>
            {t("name")} *
          </label>
          <Input id="df-name" className={fieldCls} placeholder={t("namePh")} aria-invalid={!!errors.name} {...register("name")} />
          {errors.name && <p className={errCls}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="df-email" className={labelCls}>
            {t("email")} *
          </label>
          <Input id="df-email" type="email" className={fieldCls} placeholder={t("emailPh")} aria-invalid={!!errors.email} {...register("email")} />
          {errors.email && <p className={errCls}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="df-company" className={labelCls}>
            {t("company")}
          </label>
          <Input id="df-company" className={fieldCls} placeholder={t("companyPh")} {...register("company")} />
        </div>
        <div>
          <label htmlFor="df-employees" className={labelCls}>
            {t("employees")}
          </label>
          <select
            id="df-employees"
            className="h-11 w-full rounded-lg border border-line bg-cream-soft px-3 text-sm text-ink outline-none focus-visible:border-gold focus-visible:ring-[3px] focus-visible:ring-gold/30"
            defaultValue=""
            {...register("employees")}
          >
            <option value="" disabled>
              {t("employeesPh")}
            </option>
            {SIZE_OPTIONS.map((o) => (
              <option key={o.v} value={o.v}>
                {t(o.k)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="df-message" className={labelCls}>
          {t("message")}
        </label>
        <Textarea
          id="df-message"
          rows={3}
          className="rounded-lg border-line bg-cream-soft text-ink placeholder:text-muted focus-visible:border-gold focus-visible:ring-gold/30"
          placeholder={t("messagePh")}
          {...register("message")}
        />
      </div>

      {/* honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="df-website">No rellenar</label>
        <input id="df-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <label className="mt-5 flex items-start gap-2.5 text-sm text-ink-soft">
        <input
          type="checkbox"
          className="mt-0.5 size-4 shrink-0 accent-[#1F3B2D]"
          aria-invalid={!!errors.agree}
          {...register("agree")}
        />
        <span>{t("agree")}</span>
      </label>
      {errors.agree && <p className={errCls}>{errors.agree.message}</p>}

      {status === "error" && <p className="mt-4 text-sm text-red-600">{t("error")}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-7 py-3.5 text-base font-medium text-cream transition-colors hover:bg-forest-deep disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" /> {t("sending")}
          </>
        ) : (
          <>
            {t("submit")} <ArrowRight className="size-4" />
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs text-muted">{t("microcopy")}</p>
    </form>
  )
}

import { NextResponse } from "next/server"
import { forwardToGhl } from "@/lib/ghl"
import { checkRateLimit, getClientIp } from "@/lib/rate-limit"

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req)
    const rl = checkRateLimit(ip)
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Demasiadas solicitudes. Espera unos minutos." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds ?? 600) } },
      )
    }

    const body = await req.json()

    // Honeypot — bots fill hidden field. Pretend success, drop silently.
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ ok: true, forwarded: false })
    }

    // Required fields
    for (const f of ["name", "email"]) {
      if (!body[f] || typeof body[f] !== "string" || body[f].trim() === "") {
        return NextResponse.json({ ok: false, error: `Campo requerido: ${f}` }, { status: 400 })
      }
    }
    if (body.agree !== true) {
      return NextResponse.json({ ok: false, error: "Falta el consentimiento" }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { website: _hp, ...payload } = body

    const result = await forwardToGhl(payload)
    if (!result.ok) {
      console.error("[demo] forward failed but accepting submission", result)
    }

    return NextResponse.json({ ok: true, forwarded: result.forwarded })
  } catch {
    return NextResponse.json({ ok: false, error: "Error procesando la solicitud" }, { status: 500 })
  }
}

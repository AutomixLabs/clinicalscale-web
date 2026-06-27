/**
 * GHL (GoHighLevel) integration — Clinical Scale demo requests.
 *
 * Creates the lead contact DIRECTLY via the GHL API (Private Integration
 * Token), like memoriasdechina. No premium inbound-webhook, no per-execution
 * cost, no workflow dependency. The message + clinic size are saved as a note
 * on the contact so nothing is lost.
 *
 * Configuration (Vercel → Project Settings → Environment Variables):
 *   - GHL_PIT_TOKEN     # Private Integration Token (subcuenta Clinical Scale)
 *   - GHL_LOCATION_ID   # subcuenta id (KvOObTHzoOxuzKnTFhzF)
 *
 * If either is missing, the submission is logged on the server but still
 * returns success, so local dev keeps working.
 */

const GHL_API = "https://services.leadconnectorhq.com"
const GHL_VERSION = "2021-07-28"

export interface GhlForwardResult {
  ok: boolean
  forwarded: boolean
  status?: number
  error?: string
  contactId?: string
}

function splitName(full: string): { firstName: string; lastName: string } {
  const parts = (full || "").trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return { firstName: "", lastName: "" }
  if (parts.length === 1) return { firstName: parts[0], lastName: "" }
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") }
}

export async function forwardToGhl(payload: Record<string, unknown>): Promise<GhlForwardResult> {
  const token = process.env.GHL_PIT_TOKEN
  const locationId = process.env.GHL_LOCATION_ID

  // Safety net: always log the lead so it's recoverable from Vercel logs.
  console.log("[ghl] demo lead", JSON.stringify({ ...payload, submitted_at: new Date().toISOString() }))

  if (!token || !locationId) {
    console.warn("[ghl] GHL_PIT_TOKEN / GHL_LOCATION_ID not set — logged only, not sent to GHL.")
    return { ok: true, forwarded: false }
  }

  const name = String(payload.name ?? "").trim()
  const { firstName, lastName } = splitName(name)
  const email = String(payload.email ?? "").trim()
  const phone = String(payload.phone ?? "").trim()
  const company = String(payload.company ?? "").trim()
  const employees = String(payload.employees ?? "").trim()
  const message = String(payload.message ?? "").trim()
  const locale = String(payload.locale ?? "").trim()

  const headers = {
    Authorization: `Bearer ${token}`,
    Version: GHL_VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  const contactBody: Record<string, unknown> = {
    locationId,
    firstName,
    lastName,
    name: name || undefined,
    email: email || undefined,
    phone: phone || undefined,
    companyName: company || undefined,
    source: "clinicalscale.com",
    tags: ["lead-demo-clinicalscale"],
  }

  try {
    const res = await fetch(`${GHL_API}/contacts/upsert`, {
      method: "POST",
      headers,
      body: JSON.stringify(contactBody),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      console.error(`[ghl] upsert failed ${res.status}: ${text.slice(0, 300)}`)
      return { ok: false, forwarded: false, status: res.status }
    }

    const data = await res.json().catch(() => ({}))
    const contactId: string | undefined = data?.contact?.id

    // Save message + clinic size as a note (no standard contact field for these).
    if (contactId && (message || employees)) {
      const noteBody =
        `Solicitud de demo (formulario web clinicalscale.com)\n` +
        `Tamaño de la clínica: ${employees || "-"}\n` +
        `Mensaje: ${message || "-"}\n` +
        `Idioma: ${locale || "-"}`
      try {
        const noteRes = await fetch(`${GHL_API}/contacts/${contactId}/notes`, {
          method: "POST",
          headers,
          body: JSON.stringify({ body: noteBody }),
        })
        if (!noteRes.ok) {
          console.error(`[ghl] note failed ${noteRes.status} for contact ${contactId}`)
        }
      } catch (err) {
        console.error("[ghl] note error:", err instanceof Error ? err.message : err)
      }
    }

    return { ok: true, forwarded: true, status: res.status, contactId }
  } catch (err) {
    const messageErr = err instanceof Error ? err.message : "unknown error"
    console.error("[ghl] error creating contact:", messageErr)
    return { ok: false, forwarded: false, error: messageErr }
  }
}

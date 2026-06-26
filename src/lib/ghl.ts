/**
 * GHL (GoHighLevel) webhook integration — Clinical Scale demo requests.
 *
 * Forwards the "Pedir demo" form to a GHL inbound webhook. From GHL, a
 * workflow creates the contact + opportunity (pipeline "Demos Clinical
 * Scale") and notifies the team. Same pattern as licitalabs.com.
 *
 * Configuration (Vercel → Project Settings → Environment Variables):
 *   - GHL_WEBHOOK_URL        # GHL inbound webhook URL (required in prod)
 *   - GHL_DEMO_WEBHOOK_URL   # optional override for demo form
 *
 * If no webhook is configured, the submission is logged on the server but
 * still returns success to the user, so local dev keeps working.
 */

export interface GhlForwardResult {
  ok: boolean
  forwarded: boolean
  status?: number
  error?: string
}

function getWebhookUrl(): string | null {
  return process.env.GHL_DEMO_WEBHOOK_URL || process.env.GHL_WEBHOOK_URL || null
}

export async function forwardToGhl(payload: Record<string, unknown>): Promise<GhlForwardResult> {
  const url = getWebhookUrl()

  if (!url) {
    console.warn(
      "[ghl] No webhook URL configured. Set GHL_DEMO_WEBHOOK_URL or GHL_WEBHOOK_URL in env. Submission logged below.",
    )
    console.log("[ghl] demo payload", payload)
    return { ok: true, forwarded: false }
  }

  const body = {
    form_type: "demo",
    source: "clinicalscale.com",
    submitted_at: new Date().toISOString(),
    ...payload,
  }

  // Safety net: always log the lead so it's recoverable from Vercel function
  // logs even if the GHL webhook/workflow silently fails to create the contact.
  console.log("[ghl] demo lead (forwarding)", JSON.stringify(body))

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      console.error(`[ghl] webhook returned ${res.status}`)
      return { ok: false, forwarded: true, status: res.status }
    }

    return { ok: true, forwarded: true, status: res.status }
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error"
    console.error("[ghl] error forwarding demo:", message)
    return { ok: false, forwarded: false, error: message }
  }
}

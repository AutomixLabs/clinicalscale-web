/**
 * Simple in-memory rate limiter, best-effort.
 *
 * Lives in the Function process memory — works between invocations on the
 * same warm instance, resets on cold start. Enough to deter casual bots
 * spamming the public form. For a sophisticated attacker (rotating IPs)
 * you'd need an edge firewall or a KV-backed limiter.
 */

const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_HITS = 5

const hits = new Map<string, number[]>()

export function checkRateLimit(ip: string): { ok: boolean; retryAfterSeconds?: number } {
  const now = Date.now()
  const windowStart = now - WINDOW_MS
  const previous = (hits.get(ip) || []).filter((t) => t > windowStart)

  if (previous.length >= MAX_HITS) {
    const oldest = previous[0]
    const retryAfterSeconds = Math.ceil((oldest + WINDOW_MS - now) / 1000)
    return { ok: false, retryAfterSeconds }
  }

  previous.push(now)
  hits.set(ip, previous)

  if (hits.size > 5000) {
    hits.forEach((times: number[], key: string) => {
      const fresh = times.filter((t) => t > windowStart)
      if (fresh.length === 0) hits.delete(key)
      else hits.set(key, fresh)
    })
  }

  return { ok: true }
}

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0].trim()
  return req.headers.get("x-real-ip") || "unknown"
}

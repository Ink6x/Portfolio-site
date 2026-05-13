interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory per-instance store. Acceptable for MVP on Vercel (each function instance
// has its own bucket). Upgrade to Upstash Redis for cross-instance correctness.
const store = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  store.set(ip, { ...entry, count: entry.count + 1 });
  return { allowed: true };
}

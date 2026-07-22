import { env, turnstileEnabled } from "../env";

const VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type SiteVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
  action?: string;
  hostname?: string;
};

/**
 * Verifies a Cloudflare Turnstile token server-side.
 *
 * Returns true when TURNSTILE_SECRET_KEY is not configured, so existing public
 * forms keep working until the keys are set. Once configured, a missing or
 * invalid token is rejected.
 */
export async function verifyTurnstile(
  token: unknown,
  remoteIp?: string,
): Promise<boolean> {
  if (!turnstileEnabled) return true;
  if (typeof token !== "string" || !token) return false;

  const body = new URLSearchParams({
    secret: env.turnstile.secretKey,
    response: token,
  });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.warn(`[turnstile] siteverify → ${res.status}`);
      return false;
    }
    const data = (await res.json()) as SiteVerifyResponse;
    if (!data.success) {
      console.warn(
        `[turnstile] rejected: ${(data["error-codes"] || []).join(", ") || "unknown"}`,
      );
    }
    return Boolean(data.success);
  } catch (err) {
    console.warn(`[turnstile] verify failed (${(err as Error).name})`);
    return false;
  }
}

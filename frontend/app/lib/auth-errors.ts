/** Map Supabase / auth errors to user-friendly copy. */
export function formatAuthError(err: unknown): string {
  const raw =
    err instanceof Error
      ? err.message
      : typeof err === "object" && err !== null && "msg" in err
        ? String((err as { msg: string }).msg)
        : String(err);

  const lower = raw.toLowerCase();

  if (lower.includes("provider is not enabled") || lower.includes("unsupported provider")) {
    return "Google sign-in isn't enabled on this project yet. Use email & password below, or enable Google in Supabase → Authentication → Providers.";
  }
  if (lower.includes("invalid login credentials")) {
    return "Wrong email or password. Try again or create an account.";
  }
  if (lower.includes("user already registered")) {
    return "An account with this email already exists. Try logging in instead.";
  }
  if (lower.includes("email not confirmed")) {
    return "Please confirm your email first (check your inbox), then log in.";
  }
  if (lower.includes("rate limit") || lower.includes("too many requests")) {
    return "Too many emails sent. Wait a minute and try again.";
  }
  if (lower.includes("password should be at least")) {
    return "Password must be at least 6 characters.";
  }

  return raw;
}

export const GOOGLE_SETUP_HINT =
  "To enable Google: Supabase Dashboard → Authentication → Providers → Google (needs Google Cloud OAuth client + redirect URL http://localhost:3000/auth/callback).";

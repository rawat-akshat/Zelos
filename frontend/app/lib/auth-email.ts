import type { User } from "@supabase/supabase-js";

/** Where Supabase sends users after they click the confirmation link. */
export function getAuthCallbackUrl(): string {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/auth/callback`;
}

/** OAuth providers (Google, etc.) verify email; email/password must confirm inbox. */
export function isSupabaseEmailVerified(user: User | null | undefined): boolean {
  if (!user) return false;
  if (user.email_confirmed_at) return true;

  const provider = user.app_metadata?.provider as string | undefined;
  if (provider && provider !== "email") return true;

  const identities = user.identities ?? [];
  if (identities.some((i) => i.provider && i.provider !== "email")) return true;

  return false;
}

export const VERIFY_EMAIL_MESSAGE =
  "We sent a confirmation link to your email. Click it to activate your account, then log in.";

export const RESEND_SUCCESS_MESSAGE =
  "Confirmation email sent. Check your inbox (and spam folder).";

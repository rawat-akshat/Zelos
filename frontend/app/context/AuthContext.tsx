"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { api, setStoredToken, getStoredToken, ApiError, type ApiUser } from "../lib/api";
import { getSupabase, isSupabaseConfigured } from "../lib/supabase";
import {
  getAuthCallbackUrl,
  isSupabaseEmailVerified,
} from "../lib/auth-email";
import { migrateGuestChatIfAny } from "../lib/migrate-guest";

interface AuthContextValue {
  user: ApiUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>;
  /** Re-check Supabase session (e.g. after user confirms email in another tab). */
  syncAuthFromSupabase: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function clearSupabaseSession() {
  if (!isSupabaseConfigured()) return;
  await getSupabase().auth.signOut();
  setStoredToken(null);
}

async function exchangeSupabaseSession(): Promise<ApiUser | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabase();
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return null;

  const { data: userData } = await supabase.auth.getUser();
  if (!isSupabaseEmailVerified(userData.user)) {
    await clearSupabaseSession();
    return null;
  }

  try {
    const res = await api.exchangeToken(token);
    setStoredToken(res.access_token);
    return res.user;
  } catch (err) {
    if (
      err instanceof ApiError &&
      err.message.toLowerCase().includes("email not confirmed")
    ) {
      await clearSupabaseSession();
      return null;
    }
    throw err;
  }
}

async function navigateAfterAuth(router: ReturnType<typeof useRouter>) {
  const migrated = await migrateGuestChatIfAny();
  router.push(migrated ? `/dashboard?goal=${migrated.id}` : "/dashboard");
}

function isEmailNotConfirmedError(err: unknown): boolean {
  const msg =
    err instanceof Error
      ? err.message
      : typeof err === "object" && err !== null && "message" in err
        ? String((err as { message: string }).message)
        : String(err);
  return msg.toLowerCase().includes("email not confirmed");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const me = await api.getMe();
      setUser(me);
    } catch {
      setStoredToken(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (isSupabaseConfigured()) {
          const supabase = getSupabase();
          const exchanged = await exchangeSupabaseSession();
          if (exchanged) {
            setUser(exchanged);
          } else if (getStoredToken()) {
            await refreshUser();
          }

          supabase.auth.onAuthStateChange(async (event) => {
            if (
              event === "SIGNED_IN" ||
              event === "TOKEN_REFRESHED" ||
              event === "USER_UPDATED"
            ) {
              const u = await exchangeSupabaseSession();
              if (u) setUser(u);
            }
            if (event === "SIGNED_OUT") {
              setStoredToken(null);
              setUser(null);
            }
          });
        } else if (getStoredToken()) {
          await refreshUser();
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [refreshUser]);

  const resendVerificationEmail = useCallback(async (email: string) => {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not configured");
    }
    const supabase = getSupabase();
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email.trim(),
      options: { emailRedirectTo: getAuthCallbackUrl() },
    });
    if (error) throw error;
  }, []);

  const syncAuthFromSupabase = useCallback(async () => {
    const u = await exchangeSupabaseSession();
    if (u) {
      setUser(u);
      return true;
    }
    return false;
  }, []);

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      if (!isSupabaseConfigured()) {
        throw new Error("Supabase is not configured");
      }
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (isEmailNotConfirmedError(error)) {
          router.push(`/auth/verify-email?email=${encodeURIComponent(email.trim())}`);
          return;
        }
        throw error;
      }

      const { data: userData } = await supabase.auth.getUser();
      if (!isSupabaseEmailVerified(userData.user)) {
        await clearSupabaseSession();
        router.push(`/auth/verify-email?email=${encodeURIComponent(email.trim())}`);
        return;
      }

      const u = await exchangeSupabaseSession();
      if (u) setUser(u);
      await navigateAfterAuth(router);
    },
    [router]
  );

  const signUpWithEmail = useCallback(
    async (email: string, password: string) => {
      if (!isSupabaseConfigured()) {
        throw new Error("Supabase is not configured");
      }
      const supabase = getSupabase();
      const trimmedEmail = email.trim();
      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: { emailRedirectTo: getAuthCallbackUrl() },
      });
      if (error) throw error;

      const verified =
        data.session && isSupabaseEmailVerified(data.user ?? data.session.user);

      if (!verified) {
        if (data.session) await clearSupabaseSession();
        router.push(`/auth/verify-email?email=${encodeURIComponent(trimmedEmail)}`);
        return;
      }

      const u = await exchangeSupabaseSession();
      if (u) {
        await api.updateMe({ onboarding_completed: true });
        setUser({ ...u, onboarding_completed: true });
      }
      await navigateAfterAuth(router);
    },
    [router]
  );

  const signInWithGoogle = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not configured");
    }
    const supabase = getSupabase();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: getAuthCallbackUrl() },
    });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    await clearSupabaseSession();
    setUser(null);
    router.push("/");
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user && getStoredToken()),
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signOut,
      refreshUser,
      resendVerificationEmail,
      syncAuthFromSupabase,
    }),
    [
      user,
      loading,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signOut,
      refreshUser,
      resendVerificationEmail,
      syncAuthFromSupabase,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

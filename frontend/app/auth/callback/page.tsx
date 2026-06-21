"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabase, isSupabaseConfigured } from "../../lib/supabase";
import { api, setStoredToken } from "../../lib/api";
import { isSupabaseEmailVerified } from "../../lib/auth-email";
import { migrateGuestChatIfAny } from "../../lib/migrate-guest";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!isSupabaseConfigured()) {
        router.replace("/login");
        return;
      }
      const supabase = getSupabase();

      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          router.replace("/login");
          return;
        }
      }

      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        router.replace("/login");
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      if (!isSupabaseEmailVerified(userData.user)) {
        const email = userData.user?.email ?? "";
        router.replace(
          email
            ? `/auth/verify-email?email=${encodeURIComponent(email)}`
            : "/auth/verify-email"
        );
        return;
      }

      try {
        const res = await api.exchangeToken(data.session.access_token);
        setStoredToken(res.access_token);
        const migrated = await migrateGuestChatIfAny();
        router.replace(migrated ? `/dashboard?goal=${migrated.id}` : "/dashboard");
      } catch {
        router.replace("/login");
      }
    })();
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-secondary)",
      }}
    >
      Signing you in…
    </div>
  );
}

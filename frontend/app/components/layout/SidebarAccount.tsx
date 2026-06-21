"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function SidebarAccount() {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return (
      <div
        style={{
          margin: "0 16px 24px",
          padding: "16px",
          borderRadius: "var(--radius-card)",
          border: "1px solid var(--border)",
          background: "var(--bg-card)",
        }}
      >
        <p
          style={{
            fontSize: 13,
            color: "var(--text-secondary)",
            lineHeight: 1.55,
            margin: "0 0 12px",
          }}
        >
          Sign in to save goals, patterns, and chat history.
        </p>
        <Link
          href="/login"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            fontWeight: 600,
            color: "var(--accent-on)",
            background: "var(--accent)",
            border: "1px solid var(--accent)",
            borderRadius: 10,
            padding: "10px 14px",
            textDecoration: "none",
          }}
        >
          <LogIn size={15} />
          Log in
        </Link>
      </div>
    );
  }

  const displayName = user?.name?.trim() || user?.email?.split("@")[0] || "Account";

  return (
    <Link
      href="/profile"
      style={{
        margin: "0 16px 24px",
        padding: "12px 14px",
        borderRadius: 12,
        border: "1px solid var(--border)",
        background: "var(--bg-card)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        textDecoration: "none",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 600,
          color: "var(--text-primary)",
          flexShrink: 0,
        }}
      >
        {user?.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatar_url}
            alt=""
            style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          getInitials(displayName)
        )}
      </div>
      <div style={{ minWidth: 0 }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--text-primary)",
            margin: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {displayName}
        </p>
        <p
          style={{
            fontSize: 11,
            color: "var(--text-muted)",
            margin: "2px 0 0",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {user?.email}
        </p>
      </div>
    </Link>
  );
}

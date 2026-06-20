"use client";

import { usePathname, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { NAV_ITEMS } from "./nav-config";
import NavItem from "./NavItem";
import { useWorkspace } from "../../context/WorkspaceContext";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { openNewGoalModal } = useWorkspace();

  const handleStartGoal = () => {
    openNewGoalModal();
    if (pathname !== "/dashboard") {
      router.push("/dashboard");
    }
  };

  return (
    <aside
      style={{
        width: "var(--sidebar-width, 270px)",
        background: "var(--bg-elevated)",
        borderRight: "1px solid var(--border)",
        position: "fixed",
        left: 0,
        top: 0,
        height: "100%",
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
      className="hidden lg:flex"
    >
      <div
        style={{
          padding: "48px 16px 32px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          className="font-heading"
          style={{
            fontSize: 32,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Zelos
        </span>
      </div>

      <nav
        role="navigation"
        aria-label="Main"
        style={{
          flex: 1,
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.href} {...item} active={pathname === item.href} />
        ))}
      </nav>

      <div style={{ padding: "0 16px 28px", flexShrink: 0 }}>
        <button
          type="button"
          onClick={handleStartGoal}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "11px 16px",
            borderRadius: 10,
            background: "var(--accent-glow)",
            border: "1px solid var(--border-accent)",
            color: "var(--text-primary)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            transition: "all 180ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--accent)";
            e.currentTarget.style.color = "var(--accent-on)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--accent-glow)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
        >
          <Plus size={16} strokeWidth={2} />
          Start Goal
        </button>
      </div>
    </aside>
  );
}

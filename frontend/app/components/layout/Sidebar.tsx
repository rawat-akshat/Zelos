"use client";

import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";
import { NAV_ITEMS } from "./nav-config";
import NavItem from "./NavItem";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "var(--sidebar-width, 270px)",
        background: "var(--bg-elevated, #151515)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
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
      {/* Logo — centred horizontally, icon + name on same row */}
      <div
        style={{
          padding: "44px 16px 36px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "rgba(198,169,105,0.15)",
            border: "1px solid rgba(198,169,105,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Zap size={20} color="#C6A969" strokeWidth={2.5} />
        </div>
        <span
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "0.14em",
          }}
        >
          ZELOS
        </span>
      </div>

      {/* Nav — equal padding left and right so boxes are centered in the panel */}
      <nav
        role="navigation"
        aria-label="Main"
        style={{
          flex: 1,
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.href} {...item} active={pathname === item.href} />
        ))}
      </nav>

      {/* Bottom spacer */}
      <div style={{ height: 24 }} />
    </aside>
  );
}

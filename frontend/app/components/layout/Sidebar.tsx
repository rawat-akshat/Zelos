"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./nav-config";
import NavItem from "./NavItem";

export default function Sidebar() {
  const pathname = usePathname();

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
          padding: "0 16px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.href} {...item} active={pathname === item.href} />
        ))}
      </nav>
    </aside>
  );
}

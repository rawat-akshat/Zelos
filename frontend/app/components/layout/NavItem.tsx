import Link from "next/link";
import type { NavConfig } from "./nav-config";

interface NavItemProps extends NavConfig {
  active: boolean;
}

export default function NavItem({ href, icon: Icon, label, active }: NavItemProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "12px 18px",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: 500,
        transition: "all 180ms var(--ease)",
        background: active ? "var(--nav-active-bg)" : "transparent",
        border: active
          ? "1px solid var(--nav-active-border)"
          : "1px solid transparent",
        color: active ? "var(--accent)" : "var(--nav-inactive)",
        textDecoration: "none",
        width: "100%",
        boxSizing: "border-box",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = "var(--nav-hover-bg)";
          e.currentTarget.style.color = "var(--nav-hover-text)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "var(--nav-inactive)";
        }
      }}
    >
      <Icon
        size={18}
        strokeWidth={active ? 2 : 1.75}
        style={{ flexShrink: 0, color: active ? "var(--accent)" : "inherit" }}
      />
      {label}
    </Link>
  );
}

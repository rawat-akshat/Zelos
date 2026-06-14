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
        padding: "11px 18px",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: 500,
        transition: "all 150ms ease-out",
        // Active: visible box. Inactive: box is invisible (transparent bg + border)
        background: active ? "rgba(198,169,105,0.1)" : "transparent",
        border: active
          ? "1px solid rgba(198,169,105,0.2)"
          : "1px solid transparent",
        color: active ? "#C6A969" : "#6A6A6A",
        textDecoration: "none",
        width: "100%",
        boxSizing: "border-box",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
          (e.currentTarget as HTMLAnchorElement).style.color = "#C0C0C0";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
          (e.currentTarget as HTMLAnchorElement).style.color = "#6A6A6A";
        }
      }}
    >
      <Icon
        size={18}
        strokeWidth={active ? 2 : 1.75}
        style={{ flexShrink: 0, color: active ? "#C6A969" : "inherit" }}
      />
      {label}
    </Link>
  );
}

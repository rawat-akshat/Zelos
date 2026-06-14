"use client";

import Sidebar from "./Sidebar";
import RightPanel from "./RightPanel";
import { Menu, Zap } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const pageTitle = (() => {
    if (pathname === "/") return "Home";
    if (pathname === "/history") return "History";
    if (pathname === "/insights") return "Insights";
    if (pathname === "/streaks") return "Streaks";
    if (pathname === "/achievements") return "Achievements";
    if (pathname === "/settings") return "Settings";
    return "Zelos";
  })();

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />

      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3"
        style={{
          background: "var(--bg-elevated)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: "var(--accent-glow)" }}
          >
            <Zap size={12} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
          </div>
          <span
            className="font-heading text-sm tracking-widest"
            style={{ color: "var(--text-primary)", fontWeight: 700 }}
          >
            ZELOS
          </span>
        </div>
        <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          {pageTitle}
        </span>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg"
          style={{ color: "var(--text-muted)" }}
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
      </header>

      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute inset-0"
            style={{ background: "var(--bg-overlay)", backdropFilter: "blur(4px)" }}
          />
          <nav
            className="relative w-64 h-full py-8 px-4 space-y-1"
            style={{
              background: "var(--bg-elevated)",
              borderRight: "1px solid var(--border)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {[
              { href: "/", label: "Home" },
              { href: "/history", label: "History" },
              { href: "/insights", label: "Insights" },
              { href: "/streaks", label: "Streaks" },
              { href: "/achievements", label: "Achievements" },
              { href: "/settings", label: "Settings" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-[10px] text-sm transition-colors"
                style={{
                  color: pathname === href ? "var(--accent)" : "var(--text-secondary)",
                  background:
                    pathname === href ? "var(--nav-active-bg)" : "transparent",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <main
        className="flex-1 min-h-screen pt-12 lg:pt-0"
        style={{ marginLeft: 0, marginRight: 0 }}
      >
        <style>{`
          @media (min-width: 1024px) {
            main {
              margin-left: 270px !important;
            }
          }
          @media (min-width: 1280px) {
            main {
              margin-right: 340px !important;
            }
          }
        `}</style>
        {children}
      </main>

      <RightPanel />
    </div>
  );
}

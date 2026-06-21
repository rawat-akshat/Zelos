"use client";

import Sidebar from "./Sidebar";
import RightPanel from "./RightPanel";
import NewGoalModalHost from "./NewGoalModalHost";
import { Menu } from "lucide-react";
import { Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, NAV_PAGE_TITLES, getNavItems } from "./nav-config";
import NavItem from "./NavItem";
import LandingBackground from "../landing/LandingBackground";
import { useWorkspace } from "../../context/WorkspaceContext";
import { useAuth } from "../../context/AuthContext";

interface AppShellProps {
  children: React.ReactNode;
}

function AppShellInner({ children }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const navItems = getNavItems(isAuthenticated);
  const {
    activeGoal,
    patterns,
    timelineEvents,
    isNewUser,
    hasWorkspaceHistory,
  } = useWorkspace();

  const pageTitle = NAV_PAGE_TITLES[pathname] ?? "Zelos";
  const isWorkspace = pathname === "/dashboard";

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Suspense fallback={null}>
        <NewGoalModalHost />
      </Suspense>

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
          <span
            className="font-heading"
            style={{ fontSize: 20, color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Zelos
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
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                active={pathname === item.href}
                onNavigate={() => setMobileMenuOpen(false)}
              />
            ))}
          </nav>
        </div>
      )}

      <main
        className="flex-1 min-h-screen pt-12 lg:pt-0 relative"
        style={{ marginLeft: 0, marginRight: 0 }}
      >
        <LandingBackground scoped />
        <style>{`
          @media (min-width: 1024px) {
            main {
              margin-left: 270px !important;
            }
          }
          @media (min-width: 1280px) {
            main {
              margin-right: ${isWorkspace ? "340px" : "0"} !important;
            }
          }
        `}</style>
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </main>

      {isWorkspace && (
        <RightPanel
          activeGoal={activeGoal}
          patterns={patterns}
          timelineEvents={timelineEvents}
          isNewUser={isNewUser}
          hasWorkspaceHistory={hasWorkspaceHistory}
        />
      )}
    </div>
  );
}

export default function AppShell({ children }: AppShellProps) {
  return <AppShellInner>{children}</AppShellInner>;
}

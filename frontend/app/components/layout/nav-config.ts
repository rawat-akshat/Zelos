import {
  Home,
  History,
  BarChart2,
  Flame,
  Trophy,
  Settings,
  HelpCircle,
  LucideIcon,
} from "lucide-react";

export interface NavConfig {
  href: string;
  icon: LucideIcon;
  label: string;
}

// ─────────────────────────────────────────────────────────────────
// Add or remove nav items here — nothing else needs to change.
// ─────────────────────────────────────────────────────────────────
export const NAV_ITEMS: NavConfig[] = [
  { href: "/",             icon: Home,        label: "Home" },
  { href: "/history",      icon: History,     label: "History" },
  { href: "/insights",     icon: BarChart2,   label: "Insights" },
  { href: "/streaks",      icon: Flame,       label: "Streaks" },
  { href: "/achievements", icon: Trophy,      label: "Achievements" },
  { href: "/settings",     icon: Settings,    label: "Settings" },
  { href: "#help",         icon: HelpCircle,  label: "Help" },
];

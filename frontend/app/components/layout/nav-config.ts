import {
  LayoutGrid,
  Target,
  Lightbulb,
  User,
  Settings,
  LucideIcon,
} from "lucide-react";

export interface NavConfig {
  href: string;
  icon: LucideIcon;
  label: string;
}

export const NAV_ITEMS: NavConfig[] = [
  { href: "/dashboard", icon: LayoutGrid, label: "Workspace" },
  { href: "/goals", icon: Target, label: "Goals" },
  { href: "/insights", icon: Lightbulb, label: "Insights" },
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function getNavItems(isAuthenticated: boolean): NavConfig[] {
  if (isAuthenticated) return NAV_ITEMS;
  return NAV_ITEMS.filter((item) => item.href === "/dashboard");
}

export const NAV_PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Workspace",
  "/goals": "Goals",
  "/insights": "Insights",
  "/profile": "Profile",
  "/settings": "Settings",
};

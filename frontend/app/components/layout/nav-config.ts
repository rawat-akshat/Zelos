import {
  LayoutGrid,
  Clock,
  User,
  Settings,
  HelpCircle,
  LucideIcon,
} from "lucide-react";

export interface NavConfig {
  href: string;
  icon: LucideIcon;
  label: string;
}

export const NAV_ITEMS: NavConfig[] = [
  { href: "/dashboard", icon: LayoutGrid, label: "Workspace" },
  { href: "/sessions", icon: Clock, label: "My Sessions" },
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/support", icon: HelpCircle, label: "Help" },
];

export const NAV_PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Workspace",
  "/sessions": "My Sessions",
  "/profile": "Profile",
  "/settings": "Settings",
  "/support": "Help",
};

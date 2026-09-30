import {
  BadgeDollarSign,
  BookOpenCheck,
  Boxes,
  CalendarClock,
  ChartColumnBig,
  ClipboardList,
  FileText,
  Globe2,
  Headset,
  LayoutDashboard,
  MapPinned,
  MessageSquareWarning,
  MessagesSquare,
  Settings,
  Star,
  Store,
  UserCog,
  UserRound,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "@/lib/auth/roles";

export type NavItem = {
  /** i18n key under `Nav.items` and the URL segment (empty string = overview). */
  key: string;
  slug: string;
  icon: LucideIcon;
  /** Roadmap phase that ships the module (shown on placeholder pages). */
  phase: 1 | 2 | 3;
};

export type NavGroup = { key: string; items: NavItem[] };

/**
 * Sidebar navigation per role, derived from the plan's feature lists
 * (Feature List — Super Admin / Dealer / Technician) and the phased roadmap.
 */
export const navigation: Record<Role, NavGroup[]> = {
  super_admin: [
    {
      key: "operations",
      items: [
        { key: "overview", slug: "", icon: LayoutDashboard, phase: 1 },
        { key: "jobs", slug: "jobs", icon: ClipboardList, phase: 1 },
        { key: "liveMap", slug: "live-map", icon: MapPinned, phase: 1 },
        { key: "complaints", slug: "complaints", icon: MessageSquareWarning, phase: 2 },
        { key: "supportInbox", slug: "support", icon: Headset, phase: 3 },
      ],
    },
    {
      key: "network",
      items: [
        { key: "dealers", slug: "dealers", icon: Store, phase: 1 },
        { key: "technicians", slug: "technicians", icon: UserCog, phase: 1 },
        { key: "customers", slug: "customers", icon: Users, phase: 1 },
      ],
    },
    {
      key: "catalog",
      items: [
        { key: "catalog", slug: "catalog", icon: Wrench, phase: 1 },
        { key: "pricebook", slug: "pricebook", icon: BookOpenCheck, phase: 1 },
        { key: "amc", slug: "amc", icon: CalendarClock, phase: 2 },
        { key: "inventory", slug: "inventory", icon: Boxes, phase: 2 },
      ],
    },
    {
      key: "finance",
      items: [
        { key: "payments", slug: "payments", icon: Wallet, phase: 1 },
        { key: "payouts", slug: "payouts", icon: BadgeDollarSign, phase: 2 },
        { key: "reports", slug: "reports", icon: ChartColumnBig, phase: 1 },
      ],
    },
    {
      key: "settings",
      items: [
        { key: "markets", slug: "markets", icon: Globe2, phase: 1 },
        { key: "settings", slug: "settings", icon: Settings, phase: 1 },
      ],
    },
  ],
  dealer: [
    {
      key: "operations",
      items: [
        { key: "overview", slug: "", icon: LayoutDashboard, phase: 1 },
        { key: "jobs", slug: "jobs", icon: ClipboardList, phase: 1 },
        { key: "liveMap", slug: "live-map", icon: MapPinned, phase: 1 },
        { key: "quotes", slug: "quotes", icon: FileText, phase: 1 },
        { key: "messages", slug: "messages", icon: MessagesSquare, phase: 1 },
      ],
    },
    {
      key: "team",
      items: [
        { key: "team", slug: "team", icon: UserCog, phase: 1 },
        { key: "performance", slug: "performance", icon: Star, phase: 1 },
        { key: "portfolio", slug: "portfolio", icon: Users, phase: 1 },
      ],
    },
    {
      key: "finance",
      items: [
        { key: "inventory", slug: "inventory", icon: Boxes, phase: 2 },
        { key: "earnings", slug: "earnings", icon: Wallet, phase: 1 },
      ],
    },
  ],
  technician: [
    {
      key: "work",
      items: [
        { key: "today", slug: "", icon: LayoutDashboard, phase: 1 },
        { key: "jobs", slug: "jobs", icon: ClipboardList, phase: 1 },
        { key: "estimates", slug: "estimates", icon: FileText, phase: 1 },
        { key: "issues", slug: "issues", icon: MessageSquareWarning, phase: 1 },
      ],
    },
    {
      key: "account",
      items: [
        { key: "earnings", slug: "earnings", icon: Wallet, phase: 1 },
        { key: "profile", slug: "profile", icon: UserRound, phase: 1 },
      ],
    },
  ],
};

export function findNavItem(role: Role, slug: string): NavItem | undefined {
  return navigation[role].flatMap((group) => group.items).find((item) => item.slug === slug);
}

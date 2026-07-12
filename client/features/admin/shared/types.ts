export interface NavItem {
  name: string;
  href: string;
  icon: string;
}

export const ROLE_LABEL = "Admin";
export const ROLE_SLUG = "admin";
export const ROLE_TAGLINE = "System Administration";
export const ROLE_ACCENT = "brand-orange";

export const NAV_ITEMS: NavItem[] = [
  {
    name: "Dashboard",
    href: "",
    icon: "LayoutDashboard"
  },
  {
    name: "Invite Users",
    href: "invite",
    icon: "UserPlus"
  },
  {
    name: "Users",
    href: "users",
    icon: "Users"
  },
  {
    name: "Fleet Manager",
    href: "/fleet-manager",
    icon: "Truck"
  },
  {
    name: "Driver",
    href: "/driver",
    icon: "Wrench"
  },
  {
    name: "Safety Officer",
    href: "/safety-officer",
    icon: "ShieldCheck"
  },
  {
    name: "Financial Analyst",
    href: "/financial-analyst",
    icon: "LineChart"
  }
];

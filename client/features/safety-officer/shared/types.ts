export interface NavItem {
  name: string;
  href: string;
  icon: string;
}

export const ROLE_LABEL = "Safety Officer";
export const ROLE_SLUG = "safety-officer";
export const ROLE_TAGLINE = "Compliance & Safety";
export const ROLE_ACCENT = "brand-lime";

export const NAV_ITEMS: NavItem[] = [
  {
    "name": "Dashboard",
    "href": "",
    "icon": "LayoutDashboard"
  },
  {
    "name": "Drivers",
    "href": "drivers",
    "icon": "Users"
  },
  {
    "name": "Compliance",
    "href": "compliance",
    "icon": "ShieldCheck"
  }
];

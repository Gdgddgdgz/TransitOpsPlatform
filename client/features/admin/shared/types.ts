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
    "name": "Dashboard",
    "href": "",
    "icon": "LayoutDashboard"
  }
];

export interface NavItem {
  name: string;
  href: string;
  icon: string;
}

export const ROLE_LABEL = "Driver";
export const ROLE_SLUG = "driver";
export const ROLE_TAGLINE = "Trips & Dispatch";
export const ROLE_ACCENT = "brand-cyan";

export const NAV_ITEMS: NavItem[] = [
  {
    "name": "Dashboard",
    "href": "",
    "icon": "LayoutDashboard"
  },
  {
    "name": "Trips",
    "href": "trips",
    "icon": "Route"
  },
  {
    "name": "Fuel Logs",
    "href": "fuel-logs",
    "icon": "Fuel"
  }
];

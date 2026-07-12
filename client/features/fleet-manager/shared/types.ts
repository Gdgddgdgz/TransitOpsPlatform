export interface NavItem {
  name: string;
  href: string;
  icon: string;
}

export const ROLE_LABEL = "Fleet Manager";
export const ROLE_SLUG = "fleet-manager";
export const ROLE_TAGLINE = "Fleet & Maintenance";
export const ROLE_ACCENT = "brand-orange";

export const NAV_ITEMS: NavItem[] = [
  {
    "name": "Dashboard",
    "href": "",
    "icon": "LayoutDashboard"
  },
  {
    "name": "Vehicles",
    "href": "vehicles",
    "icon": "Truck"
  },
  {
    "name": "Maintenance",
    "href": "maintenance",
    "icon": "Wrench"
  },
  {
    "name": "Reports",
    "href": "reports",
    "icon": "BarChart3"
  }
];

export interface NavItem {
  name: string;
  href: string;
  icon: string;
}

export const ROLE_LABEL = "Financial Analyst";
export const ROLE_SLUG = "financial-analyst";
export const ROLE_TAGLINE = "Cost & Profitability";
export const ROLE_ACCENT = "brand-violet";

export const NAV_ITEMS: NavItem[] = [
  {
    "name": "Dashboard",
    "href": "",
    "icon": "LayoutDashboard"
  },
  {
    "name": "Expenses",
    "href": "expenses",
    "icon": "Receipt"
  },
  {
    "name": "Fuel Logs",
    "href": "fuel-logs",
    "icon": "Fuel"
  },
  {
    "name": "Reports",
    "href": "reports",
    "icon": "BarChart3"
  }
];

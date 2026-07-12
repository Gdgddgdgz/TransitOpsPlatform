"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ShieldCheck, LogOut, Truck } from "lucide-react";
import { NAV_ITEMS, ROLE_LABEL, ROLE_TAGLINE, ROLE_SLUG } from "../types";

const ICONS: Record<string, typeof LayoutDashboard> = {
  LayoutDashboard,
  Users,
  ShieldCheck,
};

export default function Sidebar() {
  const pathname = usePathname();
  const base = `/${ROLE_SLUG}`;

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground min-h-screen sticky top-0">
      <div className="flex items-center gap-2.5 px-6 h-16 border-b border-sidebar-border">
        <div className="h-8 w-8 rounded-lg gradient-brand flex items-center justify-center shrink-0">
          <Truck className="h-4.5 w-4.5 text-white" />
        </div>
        <div className="leading-tight">
          <p className="font-display font-semibold text-sm text-foreground">TransitOps</p>
          <p className="text-[11px] text-muted-foreground">Compliance & Safety</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const href = item.href ? `${base}/${item.href}` : base;
          const active = pathname === href;
          const Icon = ICONS[item.icon];
          return (
            <Link
              key={item.name}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <Icon className="h-4.5 w-4.5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-sidebar-border">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
        >
          <LogOut className="h-4.5 w-4.5" />
          Switch role
        </Link>
      </div>
    </aside>
  );
}

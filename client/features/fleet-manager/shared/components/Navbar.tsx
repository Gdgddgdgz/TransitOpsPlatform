"use client";

import { Search, Bell, Menu } from "lucide-react";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { NAV_ITEMS } from "../types";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-border bg-background/90 backdrop-blur flex items-center gap-4 px-4 lg:px-8">
      <button
        className="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg hover:bg-secondary"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden md:flex items-center gap-2 flex-1 max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-xl border border-input bg-secondary/60 pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex-1 md:hidden">
        <p className="font-display font-semibold text-sm">Fleet Manager</p>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button className="relative h-9 w-9 flex items-center justify-center rounded-lg hover:bg-secondary" aria-label="Notifications">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>
        <div className="flex items-center gap-2.5 pl-3 border-l border-border">
          <UserButton />
        </div>
      </div>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-sidebar border-b border-sidebar-border lg:hidden flex flex-col p-3 gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href ? `/fleet-manager/${item.href}` : `/fleet-manager`}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

# TransitOps — Smart Transport Operations Platform

Next.js (App Router) implementation of the TransitOps hackathon brief, built with role-based
workspaces and a fully modular feature-first architecture, using sample/mock data derived from
the provided ER diagram.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000 and pick a role. No auth is wired up (per the "demo/mock data" scope) —
each role is a self-contained workspace at `/fleet-manager`, `/driver`, `/safety-officer`, `/financial-analyst`.

## Roles & pages

- **Fleet Manager** — Dashboard (KPIs, region/utilization), Vehicle Registry (filters, register vehicle),
  Maintenance (open/closed records, auto vehicle status logic described in UI), Reports (fuel efficiency,
  op cost, ROI, CSV export).
- **Driver** — Dashboard (active trip, stats), Trips (create trip with cargo-vs-capacity + availability
  validation), Fuel Logs (log fuel, totals).
- **Safety Officer** — Dashboard (compliance KPIs, expiring licenses, lowest safety scores), Driver
  Profiles (filterable table), Compliance (expiry timeline sorted by urgency).
- **Financial Analyst** — Dashboard (revenue, cost breakdown, ROI ranking), Expenses (category totals +
  table), Fuel Logs (cost by vehicle), Reports (ROI table, CSV export).

## Structure

```
app/<role>/page.tsx                     route -> role dashboard
app/<role>/<page-name>/page.tsx         route -> role sub-page
features/<role>/shared/                 Sidebar, Navbar, <Role>Layout, StatCard, types, badge map, current user
features/<role>/<page-name>/data        mock data + interfaces for that page
features/<role>/<page-name>/components  one file per visual block
features/<role>/<page-name>/views       composes components, owns page state
lib/types.ts, lib/mock-db.ts            shared entity types + single source of sample data (ER model)
```

## Design system

Dark charcoal canvas with vibrant orange/cyan/lime/violet accents, driven entirely by the CSS custom
properties in `app/globals.css` (Tailwind v4 `@theme inline`), matching the provided design tokens.

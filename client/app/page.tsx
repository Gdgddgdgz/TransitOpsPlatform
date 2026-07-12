import Link from "next/link";
import { Truck, Wrench, ShieldCheck, LineChart, ArrowUpRight } from "lucide-react";

const roles = [
  {
    slug: "fleet-manager",
    label: "Fleet Manager",
    desc: "Oversee fleet assets, maintenance, and operational efficiency.",
    icon: Truck,
    accent: "var(--color-brand-orange)",
  },
  {
    slug: "driver",
    label: "Driver",
    desc: "Create trips, dispatch vehicles, and track active deliveries.",
    icon: Wrench,
    accent: "var(--color-brand-cyan)",
  },
  {
    slug: "safety-officer",
    label: "Safety Officer",
    desc: "Monitor license validity, compliance, and driver safety scores.",
    icon: ShieldCheck,
    accent: "var(--color-brand-lime)",
  },
  {
    slug: "financial-analyst",
    label: "Financial Analyst",
    desc: "Review operational expenses, fuel costs, and vehicle ROI.",
    icon: LineChart,
    accent: "var(--color-brand-violet)",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center gap-2.5 px-6 lg:px-10 h-20">
        <div className="h-9 w-9 rounded-lg gradient-brand flex items-center justify-center">
          <Truck className="h-5 w-5 text-white" />
        </div>
        <span className="font-display font-semibold text-lg">TransitOps</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center max-w-xl mb-12">
          <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
            Smart transport operations
          </p>
          <h1 className="text-4xl lg:text-5xl font-display font-semibold tracking-tight mb-4">
            One platform. Every mile, managed.
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Vehicle lifecycle, dispatch, maintenance and cost tracking — replacing spreadsheets
            and logbooks with a single source of truth. Choose a workspace to continue.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 w-full max-w-3xl">
          {roles.map((r) => (
            <Link
              key={r.slug}
              href={`/${r.slug}`}
              className="group relative rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 hover:border-[color:var(--color-primary)]/50 hover:glow transition-all"
            >
              <div className="flex items-center justify-between">
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `color-mix(in oklab, ${r.accent} 18%, transparent)` }}
                >
                  <r.icon className="h-5 w-5" style={{ color: r.accent }} />
                </div>
                <ArrowUpRight className="h-4.5 w-4.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-base mb-1">{r.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="px-6 lg:px-10 py-6 text-center text-xs text-muted-foreground">
        Demo build — sample data only, no authentication required.
      </footer>
    </div>
  );
}

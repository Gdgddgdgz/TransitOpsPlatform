import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  accent?: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendDirection = "neutral",
  accent = "var(--color-brand-cyan)",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-4 hover:border-[color:var(--color-border)] transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div
          className="h-9 w-9 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `color-mix(in oklab, ${accent} 18%, transparent)` }}
        >
          <Icon className="h-4.5 w-4.5" style={{ color: accent }} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-display font-semibold tracking-tight">{value}</span>
        {trend && (
          <span
            className={`text-xs font-medium ${
              trendDirection === "up"
                ? "text-brand-lime"
                : trendDirection === "down"
                ? "text-destructive"
                : "text-muted-foreground"
            }`}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

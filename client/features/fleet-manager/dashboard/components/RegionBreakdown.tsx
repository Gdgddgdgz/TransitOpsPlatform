import type { RegionSlice } from "../data/data";

const COLORS = ["var(--color-brand-orange)", "var(--color-brand-cyan)", "var(--color-brand-lime)", "var(--color-brand-violet)"];

export default function RegionBreakdown({ data }: { data: RegionSlice[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display font-semibold text-sm mb-5">Fleet by Region</h3>
      <div className="space-y-4">
        {data.map((d, i) => (
          <div key={d.region}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">{d.region}</span>
              <span className="font-medium">{d.count} vehicles</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${(d.count / max) * 100}%`, backgroundColor: COLORS[i % COLORS.length] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

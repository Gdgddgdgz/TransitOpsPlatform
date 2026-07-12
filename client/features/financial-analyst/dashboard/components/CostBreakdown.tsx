export default function CostBreakdown({ data }: { data: Array<{ label: string; value: number; color: string }> }) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display font-semibold text-sm mb-5">Operational Cost Breakdown</h3>

      <div className="h-3 w-full rounded-full overflow-hidden flex mb-6">
        {data.map((d) => (
          <div key={d.label} style={{ width: `${(d.value / total) * 100}%`, backgroundColor: d.color }} />
        ))}
      </div>

      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
              {d.label}
            </span>
            <span className="text-muted-foreground">
              ₹{d.value.toLocaleString()} · {((d.value / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

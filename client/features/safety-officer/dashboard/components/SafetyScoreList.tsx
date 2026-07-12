import type { Driver } from "@/lib/types";

function scoreColor(score: number) {
  if (score >= 85) return "var(--color-brand-lime)";
  if (score >= 70) return "var(--color-brand-amber)";
  return "var(--color-destructive)";
}

export default function SafetyScoreList({ drivers }: { drivers: Driver[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display font-semibold text-sm mb-5">Lowest Safety Scores</h3>
      <div className="space-y-4">
        {drivers.map((d) => (
          <div key={d.id}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-medium text-foreground">{d.name}</span>
              <span className="text-muted-foreground">{d.safetyScore}/100</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${d.safetyScore}%`, backgroundColor: scoreColor(d.safetyScore) }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

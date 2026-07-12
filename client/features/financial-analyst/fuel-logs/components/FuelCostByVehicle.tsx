export default function FuelCostByVehicle({ data }: { data: Array<{ reg: string; cost: number }> }) {
  const max = Math.max(...data.map((d) => d.cost), 1);
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display font-semibold text-sm mb-5">Fuel Cost by Vehicle</h3>
      <div className="space-y-4">
        {data.map((d) => (
          <div key={d.reg}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">{d.reg}</span>
              <span className="font-medium">₹{d.cost.toLocaleString()}</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full bg-brand-cyan" style={{ width: `${(d.cost / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

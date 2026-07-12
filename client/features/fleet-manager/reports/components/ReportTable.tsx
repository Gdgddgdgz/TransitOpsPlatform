type ReportRow = {
  vehicle: { id: string; registrationNumber: string; model: string };
  distance: number;
  efficiency: number;
  opCost: number;
  revenue: number;
  roi: number;
};

export default function ReportTable({ rows }: { rows: ReportRow[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="px-5 py-3 font-medium">Vehicle</th>
              <th className="px-5 py-3 font-medium">Distance</th>
              <th className="px-5 py-3 font-medium">Fuel Efficiency</th>
              <th className="px-5 py-3 font-medium">Operational Cost</th>
              <th className="px-5 py-3 font-medium">Revenue</th>
              <th className="px-5 py-3 font-medium">ROI</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.vehicle.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                <td className="px-5 py-3.5">
                  <p className="font-medium">{r.vehicle.registrationNumber}</p>
                  <p className="text-xs text-muted-foreground">{r.vehicle.model}</p>
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">{r.distance.toLocaleString()} km</td>
                <td className="px-5 py-3.5 text-muted-foreground">{r.efficiency.toFixed(1)} km/L</td>
                <td className="px-5 py-3.5 text-muted-foreground">₹{r.opCost.toLocaleString()}</td>
                <td className="px-5 py-3.5 text-muted-foreground">₹{r.revenue.toLocaleString()}</td>
                <td className="px-5 py-3.5">
                  <span className={`font-medium ${r.roi >= 0 ? "text-brand-lime" : "text-destructive"}`}>
                    {r.roi.toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

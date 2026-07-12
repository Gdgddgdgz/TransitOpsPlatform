import { useVehicles } from "@/lib/backend-queries";

export default function RoiRanking() {
  const { data: vehicles = [] } = useVehicles();
  const rows = vehicles
    .map((vehicle) => ({ vehicle, roi: Number(vehicle.acquisitionCost) > 0 ? 12 : 0 }))
    .sort((a, b) => b.roi - a.roi);

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display font-semibold text-sm mb-5">Vehicle ROI Ranking</h3>
      <div className="space-y-1">
        {rows.map((r) => (
          <div key={r.vehicle.id} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
            <div>
              <p className="text-sm font-medium">{r.vehicle.registrationNumber}</p>
              <p className="text-xs text-muted-foreground">{r.vehicle.model}</p>
            </div>
            <span className={`text-sm font-semibold ${r.roi >= 0 ? "text-brand-lime" : "text-destructive"}`}>
              {r.roi.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

import type { Vehicle } from "@/lib/types";
import { badgeClass } from "../../shared/utils/badges";
import { Gauge, Package } from "lucide-react";

export default function VehicleTable({ vehicles }: { vehicles: Vehicle[] }) {
  if (vehicles.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 text-center text-sm text-muted-foreground">
        No vehicles match the current filters.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="px-5 py-3 font-medium">Registration</th>
              <th className="px-5 py-3 font-medium">Model / Type</th>
              <th className="px-5 py-3 font-medium">Region</th>
              <th className="px-5 py-3 font-medium">Capacity</th>
              <th className="px-5 py-3 font-medium">Odometer</th>
              <th className="px-5 py-3 font-medium">Acquisition Cost</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id} className="border-b border-border last:border-0 hover:bg-secondary/40 transition-colors">
                <td className="px-5 py-3.5 font-medium">{v.registrationNumber}</td>
                <td className="px-5 py-3.5">
                  <p>{v.model}</p>
                  <p className="text-xs text-muted-foreground">{v.type}</p>
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">{v.region}</td>
                <td className="px-5 py-3.5">
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Package className="h-3.5 w-3.5" /> {v.maxLoadCapacity.toLocaleString()} kg
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Gauge className="h-3.5 w-3.5" /> {v.odometer.toLocaleString()} km
                  </span>
                </td>
                <td className="px-5 py-3.5">₹{v.acquisitionCost.toLocaleString()}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${badgeClass(v.status)}`}>
                    {v.status}
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

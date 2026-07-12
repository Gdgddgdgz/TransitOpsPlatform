import { Fuel } from "lucide-react";
import type { FuelLog, Vehicle } from "@/lib/types";

type Row = FuelLog & { vehicle?: Vehicle };

export default function FuelLogTable({ rows }: { rows: Row[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="px-5 py-3 font-medium">Vehicle</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Liters</th>
              <th className="px-5 py-3 font-medium">Cost</th>
              <th className="px-5 py-3 font-medium">₹/L</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((f) => (
              <tr key={f.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                <td className="px-5 py-3.5">
                  <span className="flex items-center gap-2 font-medium">
                    <Fuel className="h-3.5 w-3.5 text-brand-cyan" /> {f.vehicle?.registrationNumber}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">{f.fuelDate}</td>
                <td className="px-5 py-3.5 text-muted-foreground">{f.liters} L</td>
                <td className="px-5 py-3.5 text-muted-foreground">₹{f.cost.toLocaleString()}</td>
                <td className="px-5 py-3.5 text-muted-foreground">₹{(f.cost / f.liters).toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

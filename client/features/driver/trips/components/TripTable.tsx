import { ArrowRight } from "lucide-react";
import { badgeClass } from "../../shared/utils/badges";
import type { Trip } from "@/lib/types";

type Row = Trip & { vehicle?: { id?: string; registrationNumber?: string; model?: string; type?: string }; driver?: { id?: string; name?: string } };

export default function TripTable({ trips }: { trips: Row[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="px-5 py-3 font-medium">Trip</th>
              <th className="px-5 py-3 font-medium">Route</th>
              <th className="px-5 py-3 font-medium">Vehicle / Driver</th>
              <th className="px-5 py-3 font-medium">Cargo</th>
              <th className="px-5 py-3 font-medium">Revenue</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((t) => (
              <tr key={t.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                <td className="px-5 py-3.5 font-medium">{t.tripNumber}</td>
                <td className="px-5 py-3.5">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    {t.source} <ArrowRight className="h-3.5 w-3.5" /> {t.destination}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">
                  <p>{t.vehicle?.registrationNumber}</p>
                  <p className="text-xs">{t.driver?.name}</p>
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">{t.cargoWeight} kg</td>
                <td className="px-5 py-3.5 text-muted-foreground">₹{t.revenue.toLocaleString()}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${badgeClass(t.status)}`}>
                    {t.status}
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

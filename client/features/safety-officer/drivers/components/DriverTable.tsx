import { badgeClass } from "../../shared/utils/badges";
import type { Driver } from "@/lib/types";

export default function DriverTable({ drivers }: { drivers: Array<Driver & { daysLeft: number }> }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="px-5 py-3 font-medium">Driver</th>
              <th className="px-5 py-3 font-medium">License</th>
              <th className="px-5 py-3 font-medium">Expiry</th>
              <th className="px-5 py-3 font-medium">Contact</th>
              <th className="px-5 py-3 font-medium">Safety Score</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((d) => (
              <tr key={d.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                <td className="px-5 py-3.5 font-medium">{d.name}</td>
                <td className="px-5 py-3.5 text-muted-foreground">
                  <p>{d.licenseNumber}</p>
                  <p className="text-xs">{d.licenseCategory}</p>
                </td>
                <td className="px-5 py-3.5">
                  <span className={d.daysLeft < 0 ? "text-destructive font-medium" : d.daysLeft <= 30 ? "text-brand-amber font-medium" : "text-muted-foreground"}>
                    {d.licenseExpiry}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">{d.contactNumber}</td>
                <td className="px-5 py-3.5">
                  <span className="font-medium">{d.safetyScore}</span>
                  <span className="text-muted-foreground">/100</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${badgeClass(d.status)}`}>
                    {d.status}
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

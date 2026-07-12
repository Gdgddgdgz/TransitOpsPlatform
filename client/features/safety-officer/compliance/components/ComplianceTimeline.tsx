import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";
import type { Driver } from "@/lib/types";

function tier(daysLeft: number) {
  if (daysLeft < 0) return { label: "Expired", color: "text-destructive", bg: "bg-destructive/15", icon: ShieldX };
  if (daysLeft <= 30) return { label: "Critical", color: "text-brand-amber", bg: "bg-brand-amber/15", icon: ShieldAlert };
  return { label: "Compliant", color: "text-brand-lime", bg: "bg-brand-lime/15", icon: ShieldCheck };
}

export default function ComplianceTimeline({ rows }: { rows: Array<Driver & { daysLeft: number }> }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="px-5 py-3 font-medium">Driver</th>
              <th className="px-5 py-3 font-medium">License Expiry</th>
              <th className="px-5 py-3 font-medium">Days Remaining</th>
              <th className="px-5 py-3 font-medium">Compliance</th>
              <th className="px-5 py-3 font-medium">Driver Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d) => {
              const t = tier(d.daysLeft);
              return (
                <tr key={d.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                  <td className="px-5 py-3.5 font-medium">{d.name}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{d.licenseExpiry}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {d.daysLeft < 0 ? `${Math.abs(d.daysLeft)} days ago` : `${d.daysLeft} days`}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${t.bg} ${t.color}`}>
                      <t.icon className="h-3.5 w-3.5" /> {t.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{d.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

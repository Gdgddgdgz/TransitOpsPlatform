import { AlertTriangle, ShieldAlert } from "lucide-react";
import type { Driver } from "@/lib/types";

export default function LicenseAlerts({ drivers }: { drivers: Array<Driver & { daysLeft: number }> }) {
  if (drivers.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
        No licenses expiring within 45 days.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display font-semibold text-sm mb-5">License Expiry Alerts</h3>
      <div className="space-y-1">
        {drivers.map((d) => {
          const expired = d.daysLeft < 0;
          return (
            <div key={d.id} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
              <div
                className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                  expired ? "bg-destructive/15" : "bg-brand-amber/15"
                }`}
              >
                {expired ? (
                  <ShieldAlert className="h-4.5 w-4.5 text-destructive" />
                ) : (
                  <AlertTriangle className="h-4.5 w-4.5 text-brand-amber" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.licenseNumber} · {d.licenseCategory}</p>
              </div>
              <span className={`text-xs font-medium ${expired ? "text-destructive" : "text-brand-amber"}`}>
                {expired ? `Expired ${Math.abs(d.daysLeft)}d ago` : `${d.daysLeft}d left`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

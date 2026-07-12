"use client";

import { useRecentTrips } from "@/lib/backend-queries";
import { badgeClass } from "../../shared/utils/badges";
import { ArrowRight } from "lucide-react";

export default function RecentTrips() {
  const { data: trips = [] } = useRecentTrips(5);
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-sm">Recent Trips</h3>
      </div>
      <div className="space-y-1">
        {trips.map((t) => {
          return (
            <div key={t.id} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{t.tripNumber}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  {t.source} <ArrowRight className="h-3 w-3" /> {t.destination}
                </p>
              </div>
              <div className="text-xs text-muted-foreground hidden sm:block text-right">
                <p>{t.vehicle?.registrationNumber ?? "—"}</p>
                <p>{t.driver?.name ?? "—"}</p>
              </div>
              <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${badgeClass(t.status)}`}>
                {t.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

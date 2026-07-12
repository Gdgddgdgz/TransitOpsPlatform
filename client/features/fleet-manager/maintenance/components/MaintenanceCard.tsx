"use client";

import { useState } from "react";
import { Wrench, Calendar, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { badgeClass } from "../../shared/utils/badges";
import { useCloseMaintenanceLog } from "@/lib/backend-queries";
import type { MaintenanceLog, Vehicle } from "@/lib/types";

type MaintenanceRecord = MaintenanceLog & { vehicle?: Partial<Vehicle> };

export default function MaintenanceCard({ record }: { record: MaintenanceRecord }) {
  const closeMaintenanceLog = useCloseMaintenanceLog();
  const [error, setError] = useState<string | null>(null);
  const isOpen = record.status === "Open";

  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-amber/15 flex items-center justify-center shrink-0">
            <Wrench className="h-4.5 w-4.5 text-brand-amber" />
          </div>
          <div>
            <p className="font-medium text-sm">{record.title}</p>
            <p className="text-xs text-muted-foreground">{record.vehicle?.registrationNumber ?? "—"}</p>
          </div>
        </div>
        <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${badgeClass(record.status)}`}>
          {record.status}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{record.description}</p>

      {error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {error}
        </div>
      ) : null}

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" /> Opened {record.openedAt}
        </span>
        <div className="flex items-center gap-3">
          <span className="font-medium text-foreground">₹{record.cost.toLocaleString()}</span>
          {isOpen ? (
            <button
              onClick={() => {
                setError(null);
                closeMaintenanceLog.mutate(record.id, {
                  onError: (err) => {
                    const message = axios.isAxiosError(err)
                      ? err.response?.data?.message || "Could not close the record. Please try again."
                      : "Could not close the record. Please try again.";
                    setError(message);
                  },
                });
              }}
              disabled={closeMaintenanceLog.isPending}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-brand-lime/15 text-brand-lime border border-brand-lime/30 hover:bg-brand-lime/25 disabled:opacity-60"
            >
              {closeMaintenanceLog.isPending ? (
                "Closing..."
              ) : (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5" /> Close
                </>
              )}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

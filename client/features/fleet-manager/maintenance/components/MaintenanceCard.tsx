import { Wrench, Calendar } from "lucide-react";
import { badgeClass } from "../../shared/utils/badges";
import type { MaintenanceLog, Vehicle } from "@/lib/types";

type MaintenanceRecord = MaintenanceLog & { vehicle?: Partial<Vehicle> };

export default function MaintenanceCard({ record }: { record: MaintenanceRecord }) {
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
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" /> Opened {record.openedAt}
        </span>
        <span className="font-medium text-foreground">₹{record.cost.toLocaleString()}</span>
      </div>
    </div>
  );
}

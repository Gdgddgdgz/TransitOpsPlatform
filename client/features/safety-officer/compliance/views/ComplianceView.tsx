import { ShieldX, ShieldAlert, Clock, UserX } from "lucide-react";
import StatCard from "../../shared/components/StatCard";
import { getComplianceRows, getComplianceSummary } from "../data/data";
import ComplianceTimeline from "../components/ComplianceTimeline";

export default function ComplianceView() {
  const rows = getComplianceRows();
  const summary = getComplianceSummary();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Compliance</h1>
        <p className="text-sm text-muted-foreground mt-1">
          License validity across the driver pool, sorted by urgency.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Expired" value={summary.expired} icon={ShieldX} accent="var(--color-destructive)" />
        <StatCard label="Critical (≤30d)" value={summary.critical} icon={ShieldAlert} accent="var(--color-brand-amber)" />
        <StatCard label="Upcoming (31-90d)" value={summary.upcoming} icon={Clock} accent="var(--color-brand-cyan)" />
        <StatCard label="Suspended Drivers" value={summary.suspended} icon={UserX} accent="var(--color-brand-pink)" />
      </div>

      <ComplianceTimeline rows={rows} />
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { ShieldX, ShieldAlert, Clock, UserX } from "lucide-react";
import StatCard from "../../shared/components/StatCard";
import { useDrivers } from "@/lib/backend-queries";
import ComplianceTimeline from "../components/ComplianceTimeline";

function daysUntil(dateStr: string) {
  const target = new Date(dateStr);
  const targetUtc = Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate());
  const today = new Date();
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.ceil((targetUtc - todayUtc) / (1000 * 60 * 60 * 24));
}

export default function ComplianceView() {
  const { data: drivers = [], error } = useDrivers();
  const rows = useMemo(() => 
    drivers
      .map((driver) => ({ ...driver, daysLeft: daysUntil(driver.licenseExpiry) }))
      .sort((a, b) => a.daysLeft - b.daysLeft), [drivers]);
  const summary = useMemo(() => ({
    expired: rows.filter((row) => row.daysLeft < 0).length,
    critical: rows.filter((row) => row.daysLeft >= 0 && row.daysLeft <= 30).length,
    upcoming: rows.filter((row) => row.daysLeft > 30 && row.daysLeft <= 90).length,
    suspended: rows.filter((row) => row.status === "Suspended").length,
  }), [rows]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Compliance</h1>
        <p className="text-sm text-muted-foreground mt-1">
          License validity across the driver pool, sorted by urgency.
        </p>
      </div>

      {error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Unable to load compliance data from the backend right now.
        </div>
      ) : null}

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

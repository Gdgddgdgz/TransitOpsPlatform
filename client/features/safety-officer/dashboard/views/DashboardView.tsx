"use client";

import { Users, ShieldAlert, Clock, Gauge } from "lucide-react";
import StatCard from "../../shared/components/StatCard";
import { getSafetyStats, getExpiringLicenses, getLowestSafetyScores } from "../data/data";
import LicenseAlerts from "../components/LicenseAlerts";
import SafetyScoreList from "../components/SafetyScoreList";

export default function DashboardView() {
  const stats = getSafetyStats();
  const expiring = getExpiringLicenses();
  const lowest = getLowestSafetyScores();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Safety & Compliance</h1>
        <p className="text-sm text-muted-foreground mt-1">Driver compliance, license validity and safety scores.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Drivers" value={stats.total} icon={Users} accent="var(--color-brand-lime)" />
        <StatCard label="On Duty" value={stats.onDuty} icon={Clock} accent="var(--color-brand-cyan)" />
        <StatCard label="Suspended" value={stats.suspended} icon={ShieldAlert} accent="var(--color-destructive)" />
        <StatCard label="Expiring ≤30d" value={stats.expiringSoon} icon={ShieldAlert} accent="var(--color-brand-amber)" />
        <StatCard label="Avg Safety Score" value={stats.avgSafetyScore} icon={Gauge} accent="var(--color-brand-violet)" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <LicenseAlerts drivers={expiring} />
        <SafetyScoreList drivers={lowest} />
      </div>
    </div>
  );
}

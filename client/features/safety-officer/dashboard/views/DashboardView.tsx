"use client";

import { useMemo } from "react";
import { Users, ShieldAlert, Clock, Gauge } from "lucide-react";
import StatCard from "../../shared/components/StatCard";
import { useDrivers } from "@/lib/backend-queries";
import LicenseAlerts from "../components/LicenseAlerts";
import SafetyScoreList from "../components/SafetyScoreList";

function daysUntil(dateStr: string) {
  const target = new Date(dateStr);
  const targetUtc = Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate());
  const today = new Date();
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.ceil((targetUtc - todayUtc) / (1000 * 60 * 60 * 24));
}

export default function DashboardView() {
  const { data: drivers = [] } = useDrivers();

  const stats = useMemo(() => {
    const total = drivers.length;
    const onDuty = drivers.filter((driver) => driver.status === "On Trip").length;
    const suspended = drivers.filter((driver) => driver.status === "Suspended").length;
    const expiringSoon = drivers.filter((driver) => {
      const daysLeft = daysUntil(driver.licenseExpiry);
      return daysLeft >= 0 && daysLeft <= 30;
    }).length;
    const avgSafetyScore = total > 0 ? Math.round(drivers.reduce((sum, driver) => sum + driver.safetyScore, 0) / total) : 0;
    return { total, onDuty, suspended, expiringSoon, avgSafetyScore };
  }, [drivers]);

  const expiring = useMemo(() => drivers.filter((driver) => {
    const daysLeft = daysUntil(driver.licenseExpiry);
    return daysLeft <= 45;
  }).map((driver) => ({ ...driver, daysLeft: daysUntil(driver.licenseExpiry) })), [drivers]);

  const lowest = useMemo(() => [...drivers].sort((a, b) => a.safetyScore - b.safetyScore).slice(0, 5), [drivers]);

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

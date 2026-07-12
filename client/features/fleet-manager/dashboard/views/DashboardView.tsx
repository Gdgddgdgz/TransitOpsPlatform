"use client";

import { Truck, CheckCircle2, Wrench, Route, Clock, Users, Gauge } from "lucide-react";
import StatCard from "../../shared/components/StatCard";
import { getDashboardStats, getFleetByRegion } from "../data/data";
import RegionBreakdown from "../components/RegionBreakdown";
import RecentTrips from "../components/RecentTrips";

export default function DashboardView() {
  const stats = getDashboardStats();
  const region = getFleetByRegion();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Fleet Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Live overview of your fleet, drivers and dispatch status.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Vehicles" value={stats.activeVehicles} icon={Truck} accent="var(--color-brand-orange)" />
        <StatCard label="Available Vehicles" value={stats.availableVehicles} icon={CheckCircle2} accent="var(--color-brand-lime)" />
        <StatCard label="In Maintenance" value={stats.inMaintenance} icon={Wrench} accent="var(--color-brand-amber)" />
        <StatCard label="Active Trips" value={stats.activeTrips} icon={Route} accent="var(--color-brand-cyan)" />
        <StatCard label="Pending Trips" value={stats.pendingTrips} icon={Clock} accent="var(--color-brand-pink)" />
        <StatCard label="Drivers On Duty" value={stats.driversOnDuty} icon={Users} accent="var(--color-brand-violet)" />
        <StatCard
          label="Fleet Utilization"
          value={`${stats.utilization}%`}
          icon={Gauge}
          accent="var(--color-brand-orange)"
          trend={stats.utilization > 50 ? "Healthy" : "Low"}
          trendDirection={stats.utilization > 50 ? "up" : "down"}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <RegionBreakdown data={region} />
        <RecentTrips />
      </div>
    </div>
  );
}

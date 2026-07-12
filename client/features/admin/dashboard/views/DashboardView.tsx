"use client";

import { useMemo } from "react";
import { Truck, Wrench, Route, Users, Gauge, ShieldAlert, IndianRupee, Fuel, TrendingUp, Loader2 } from "lucide-react";
import StatCard from "../../shared/components/StatCard";
import { useVehicles, useDrivers, useTrips, useFuelLogs, useMaintenanceLogs, useReportMetrics } from "@/lib/backend-queries";

function daysUntil(dateStr: string) {
  if (!dateStr) return 999;
  const target = new Date(dateStr);
  const targetUtc = Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate());
  const today = new Date();
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.ceil((targetUtc - todayUtc) / (1000 * 60 * 60 * 24));
}

export default function DashboardView() {
  const { data: vehicles = [], isLoading: vLoading } = useVehicles();
  const { data: drivers = [], isLoading: dLoading } = useDrivers();
  const { data: trips = [], isLoading: tLoading } = useTrips();
  const { data: fuelLogs = [] } = useFuelLogs();
  const { data: maintenanceLogs = [] } = useMaintenanceLogs();
  const { data: reportMetrics } = useReportMetrics();

  const isLoading = vLoading || dLoading || tLoading;

  // ── Fleet stats ────────────────────────────────────────────────────────────
  const fleet = useMemo(() => {
    const activeVehicles = vehicles.filter((v) => v.status !== "Retired").length;
    const inMaintenance = vehicles.filter((v) => v.status === "In Shop").length;
    const activeTrips = trips.filter((t) => t.status === "Dispatched").length;
    const onTrip = vehicles.filter((v) => v.status === "On Trip").length;
    const active = vehicles.filter((v) => v.status !== "Retired").length;
    const utilization = active > 0 ? Math.round((onTrip / active) * 100) : 0;
    return { activeVehicles, inMaintenance, activeTrips, utilization };
  }, [vehicles, trips]);

  // ── Safety stats ───────────────────────────────────────────────────────────
  const safety = useMemo(() => {
    const total = drivers.length;
    const suspended = drivers.filter((d) => d.status === "Suspended").length;
    const avgSafetyScore =
      total === 0 ? 0 : Math.round(drivers.reduce((s, d) => s + d.safetyScore, 0) / total);
    return { total, suspended, avgSafetyScore };
  }, [drivers]);

  // ── Financial stats ────────────────────────────────────────────────────────
  const financial = useMemo(() => {
    const fuelCost = fuelLogs.reduce((s, f) => s + f.cost, 0);
    const maintenanceCost = maintenanceLogs.reduce((s, m) => s + m.cost, 0);
    const totalRevenue = trips
      .filter((t) => t.status === "Completed")
      .reduce((s, t) => s + t.revenue, 0);

    // Use server-computed avgROI from reports if available, else calculate from vehicles
    const avgROI = reportMetrics?.vehicleMetrics?.length
      ? reportMetrics.vehicleMetrics.reduce((s: number, v: any) => s + (v.roi ?? 0), 0) /
        reportMetrics.vehicleMetrics.length
      : 0;

    return { fuelCost, maintenanceCost, totalRevenue, avgROI };
  }, [fuelLogs, maintenanceLogs, trips, reportMetrics]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground gap-3">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Admin Overview Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Aggregated key performance indicators across all organizational roles.
        </p>
      </div>

      {/* Fleet Manager section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-display font-semibold border-b border-border pb-2 text-foreground">
          Fleet Operations
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Active Vehicles" value={fleet.activeVehicles} icon={Truck} accent="var(--color-brand-orange)" />
          <StatCard label="In Maintenance" value={fleet.inMaintenance} icon={Wrench} accent="var(--color-brand-amber)" />
          <StatCard label="Active Trips" value={fleet.activeTrips} icon={Route} accent="var(--color-brand-cyan)" />
          <StatCard
            label="Fleet Utilization"
            value={`${fleet.utilization}%`}
            icon={Gauge}
            accent="var(--color-brand-orange)"
            trend={fleet.utilization > 50 ? "Healthy" : "Low"}
            trendDirection={fleet.utilization > 50 ? "up" : "down"}
          />
        </div>
      </div>

      {/* Safety & Compliance section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-display font-semibold border-b border-border pb-2 text-foreground">
          Safety & Compliance
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="Total Drivers" value={safety.total} icon={Users} accent="var(--color-brand-lime)" />
          <StatCard label="Suspended Drivers" value={safety.suspended} icon={ShieldAlert} accent="var(--color-destructive)" />
          <StatCard label="Avg Safety Score" value={safety.avgSafetyScore} icon={Gauge} accent="var(--color-brand-violet)" />
        </div>
      </div>

      {/* Financial Performance section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-display font-semibold border-b border-border pb-2 text-foreground">
          Financial Performance
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Revenue" value={`₹${financial.totalRevenue.toLocaleString()}`} icon={IndianRupee} accent="var(--color-brand-lime)" />
          <StatCard label="Fuel Cost" value={`₹${financial.fuelCost.toLocaleString()}`} icon={Fuel} accent="var(--color-brand-cyan)" />
          <StatCard label="Maintenance Cost" value={`₹${financial.maintenanceCost.toLocaleString()}`} icon={Wrench} accent="var(--color-brand-amber)" />
          <StatCard
            label="Avg Vehicle ROI"
            value={`${financial.avgROI.toFixed(1)}%`}
            icon={TrendingUp}
            accent="var(--color-brand-violet)"
            trend={financial.avgROI > 0 ? "Profitable" : "Loss"}
            trendDirection={financial.avgROI > 0 ? "up" : "down"}
          />
        </div>
      </div>
    </div>
  );
}

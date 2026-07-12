"use client";

import { Truck, Wrench, Route, Users, Gauge, ShieldAlert, IndianRupee, Fuel, TrendingUp } from "lucide-react";
import StatCard from "../../shared/components/StatCard";
import { getDashboardStats as getFleetStats } from "../../../fleet-manager/dashboard/data/data";
import { getSafetyStats } from "../../../safety-officer/dashboard/data/data";
import { getFinancialStats } from "../../../financial-analyst/dashboard/data/data";

export default function DashboardView() {
  const fleet = getFleetStats();
  const safety = getSafetyStats();
  const financial = getFinancialStats();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Admin Overview Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Aggregated key performance indicators across all organizational roles.</p>
      </div>

      {/* Fleet Manager section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-display font-semibold border-b border-border pb-2 text-foreground">Fleet Operations</h2>
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
        <h2 className="text-lg font-display font-semibold border-b border-border pb-2 text-foreground">Safety & Compliance</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="Total Drivers" value={safety.total} icon={Users} accent="var(--color-brand-lime)" />
          <StatCard label="Suspended Drivers" value={safety.suspended} icon={ShieldAlert} accent="var(--color-destructive)" />
          <StatCard label="Avg Safety Score" value={safety.avgSafetyScore} icon={Gauge} accent="var(--color-brand-violet)" />
        </div>
      </div>

      {/* Financial Performance section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-display font-semibold border-b border-border pb-2 text-foreground">Financial Performance</h2>
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

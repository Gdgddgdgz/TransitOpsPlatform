"use client";

import { Route, CheckCircle2, Truck, Gauge } from "lucide-react";
import StatCard from "../../shared/components/StatCard";
import { getDriverStats, getMyTrips } from "../data/data";
import ActiveTripCard from "../components/ActiveTripCard";

export default function DashboardView() {
  const stats = getDriverStats();
  const myTrips = getMyTrips();
  const active = myTrips.find((t) => t.status === "Dispatched");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">My Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Your trips, vehicle availability and delivery status.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Trips" value={stats.active} icon={Route} accent="var(--color-brand-cyan)" />
        <StatCard label="Completed Trips" value={stats.completed} icon={CheckCircle2} accent="var(--color-brand-lime)" />
        <StatCard label="Vehicles Available" value={stats.availableVehicles} icon={Truck} accent="var(--color-brand-orange)" />
        <StatCard label="Distance Driven" value={`${stats.totalDistance} km`} icon={Gauge} accent="var(--color-brand-violet)" />
      </div>

      <ActiveTripCard trip={active} />
    </div>
  );
}

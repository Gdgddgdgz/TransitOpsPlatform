"use client";

import { useMemo, useState } from "react";
import { Truck, CheckCircle2, Wrench, Route, Clock, Users, Gauge } from "lucide-react";
import StatCard from "../../shared/components/StatCard";
import { useTrips, useVehicles } from "@/lib/backend-queries";
import RegionBreakdown from "../components/RegionBreakdown";
import RecentTrips from "../components/RecentTrips";

export default function DashboardView() {
  const { data: vehicles = [] } = useVehicles();
  const { data: trips = [] } = useTrips();

  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const vehicleTypes = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.type).filter(Boolean))),
    [vehicles]
  );

  const vehicleRegions = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.region).filter(Boolean))),
    [vehicles]
  );

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (selectedType && v.type !== selectedType) return false;
      if (selectedStatus && v.status !== selectedStatus) return false;
      if (selectedRegion && v.region !== selectedRegion) return false;
      return true;
    });
  }, [vehicles, selectedType, selectedStatus, selectedRegion]);

  const filteredTrips = useMemo(() => {
    return trips.filter((t) => {
      const vehicle = vehicles.find((v) => v.id === t.vehicleId);
      if (!vehicle) return false;
      if (selectedType && vehicle.type !== selectedType) return false;
      if (selectedStatus && vehicle.status !== selectedStatus) return false;
      if (selectedRegion && vehicle.region !== selectedRegion) return false;
      return true;
    });
  }, [trips, vehicles, selectedType, selectedStatus, selectedRegion]);

  const stats = useMemo(() => {
    const activeVehicles = filteredVehicles.filter((vehicle) => vehicle.status !== "Retired").length;
    const availableVehicles = filteredVehicles.filter((vehicle) => vehicle.status === "Available").length;
    const inMaintenance = filteredVehicles.filter((vehicle) => vehicle.status === "In Shop").length;
    const activeTrips = filteredTrips.filter((trip) => trip.status === "Dispatched").length;
    const pendingTrips = filteredTrips.filter((trip) => trip.status === "Draft").length;
    const driversOnDuty = filteredTrips.filter((trip) => trip.status === "Dispatched").length;
    const utilization = activeVehicles > 0 ? Math.round((activeTrips / activeVehicles) * 100) : 0;

    return { activeVehicles, availableVehicles, inMaintenance, activeTrips, pendingTrips, driversOnDuty, utilization };
  }, [filteredVehicles, filteredTrips]);

  const regionData = useMemo(() => {
    const totals = new Map<string, number>();
    filteredVehicles.forEach((vehicle) => {
      const region = vehicle.region || "Unknown";
      totals.set(region, (totals.get(region) ?? 0) + 1);
    });
    return Array.from(totals.entries()).map(([region, count]) => ({ region, count }));
  }, [filteredVehicles]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold tracking-tight">Fleet Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Live overview of your fleet, drivers and dispatch status.</p>
        </div>

        {/* Dashboard Filters */}
        <div className="flex flex-wrap gap-3">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Types</option>
            {vehicleTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Statuses</option>
            {["Available", "On Trip", "In Shop", "Retired"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Regions</option>
            {vehicleRegions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
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
        <RegionBreakdown data={regionData} />
        <RecentTrips />
      </div>
    </div>
  );
}

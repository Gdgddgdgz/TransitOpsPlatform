"use client";

import { useMemo } from "react";
import { Wrench, IndianRupee, Truck } from "lucide-react";
import StatCard from "../../shared/components/StatCard";
import { useMaintenanceLogs } from "@/lib/backend-queries";
import MaintenanceCard from "../components/MaintenanceCard";

export default function MaintenanceView() {
  const { data: records = [], error } = useMaintenanceLogs();
  const kpis = useMemo(() => ({
    open: records.filter((record) => record.status === "Open").length,
    vehiclesInShop: records.filter((record) => record.status === "Open").length,
    totalCost: records.reduce((sum, record) => sum + record.cost, 0),
  }), [records]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Maintenance</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Opening a record moves the vehicle to In Shop and hides it from dispatch. Closing restores it to Available.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Open Records" value={kpis.open} icon={Wrench} accent="var(--color-brand-amber)" />
        <StatCard label="Vehicles In Shop" value={kpis.vehiclesInShop} icon={Truck} accent="var(--color-brand-orange)" />
        <StatCard label="Total Maintenance Cost" value={`₹${kpis.totalCost.toLocaleString()}`} icon={IndianRupee} accent="var(--color-brand-pink)" />
      </div>

      {error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Unable to load maintenance records from the backend right now.
        </div>
      ) : null}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {records.map((r) => (
          <MaintenanceCard key={r.id} record={r} />
        ))}
      </div>
    </div>
  );
}

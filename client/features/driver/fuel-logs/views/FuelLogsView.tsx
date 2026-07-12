"use client";

import { useState } from "react";
import { Plus, Fuel, IndianRupee, Gauge } from "lucide-react";
import StatCard from "../../shared/components/StatCard";
import { getFuelLogRows, getFuelKpis } from "../data/data";
import FuelLogTable from "../components/FuelLogTable";
import LogFuelForm from "../components/LogFuelForm";

export default function FuelLogsView() {
  const rows = getFuelLogRows();
  const kpis = getFuelKpis();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-semibold tracking-tight">Fuel Logs</h1>
          <p className="text-sm text-muted-foreground mt-1">Record fuel fills to keep operational cost accurate.</p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium gradient-cool text-accent-foreground glow"
        >
          <Plus className="h-4 w-4" /> {showForm ? "Hide Form" : "Log Fuel"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Liters" value={`${kpis.totalLiters} L`} icon={Fuel} accent="var(--color-brand-cyan)" />
        <StatCard label="Total Fuel Cost" value={`₹${kpis.totalCost.toLocaleString()}`} icon={IndianRupee} accent="var(--color-brand-orange)" />
        <StatCard label="Avg Cost / Liter" value={`₹${kpis.avgCostPerLiter.toFixed(1)}`} icon={Gauge} accent="var(--color-brand-violet)" />
      </div>

      {showForm && <LogFuelForm onClose={() => setShowForm(false)} />}

      <FuelLogTable rows={rows} />
    </div>
  );
}

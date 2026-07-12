"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { vehicles } from "../data/data";
import VehicleFilters from "../components/VehicleFilters";
import VehicleTable from "../components/VehicleTable";
import AddVehicleModal from "../components/AddVehicleModal";
import { useMockState } from "@/lib/use-mock-state";

export default function VehiclesView() {
  useMockState();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [region, setRegion] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      if (query && !`${v.registrationNumber} ${v.model}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (type && v.type !== type) return false;
      if (status && v.status !== status) return false;
      if (region && v.region !== region) return false;
      return true;
    });
  }, [query, type, status, region]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-semibold tracking-tight">Vehicle Registry</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {vehicles.length} vehicles · Registration numbers must be unique · Retired/In Shop excluded from dispatch
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium gradient-brand text-primary-foreground glow"
        >
          <Plus className="h-4 w-4" /> Register Vehicle
        </button>
      </div>

      <VehicleFilters
        query={query}
        type={type}
        status={status}
        region={region}
        onQueryChange={setQuery}
        onTypeChange={setType}
        onStatusChange={setStatus}
        onRegionChange={setRegion}
      />

      <VehicleTable vehicles={filtered} />

      <AddVehicleModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

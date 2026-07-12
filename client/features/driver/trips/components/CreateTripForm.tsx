"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { getDispatchableVehicles, getDispatchableDrivers } from "../data/data";

export default function CreateTripForm({ onClose }: { onClose: () => void }) {
  const vehicles = getDispatchableVehicles();
  const drivers = getDispatchableDrivers();

  const [vehicleId, setVehicleId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [cargoWeight, setCargoWeight] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const selectedVehicle = vehicles.find((v) => v.id === vehicleId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!vehicleId || !driverId || !source || !destination || !cargoWeight) {
      setError("Please fill in every field.");
      return;
    }
    const weight = Number(cargoWeight);
    if (selectedVehicle && weight > selectedVehicle.maxLoadCapacity) {
      setError(
        `Cargo weight (${weight} kg) exceeds ${selectedVehicle.registrationNumber}'s max load capacity of ${selectedVehicle.maxLoadCapacity} kg.`
      );
      return;
    }
    setSuccess(true);
    setTimeout(onClose, 1200);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display font-semibold text-base mb-1">Create Trip</h3>
      <p className="text-xs text-muted-foreground mb-5">
        Only Available vehicles and drivers with a valid license appear below.
      </p>

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Source</label>
          <input
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="e.g. Pune"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Destination</label>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="e.g. Mumbai"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Vehicle</label>
          <select
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select available vehicle</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.registrationNumber} — max {v.maxLoadCapacity} kg
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Driver</label>
          <select
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select available driver</option>
            {drivers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} — {d.licenseCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs text-muted-foreground mb-1.5 block">Cargo Weight (kg)</label>
          <input
            value={cargoWeight}
            onChange={(e) => setCargoWeight(e.target.value)}
            type="number"
            className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="450"
          />
        </div>

        {error && (
          <div className="sm:col-span-2 flex items-start gap-2 text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" /> {error}
          </div>
        )}
        {success && (
          <div className="sm:col-span-2 flex items-start gap-2 text-sm text-brand-lime bg-brand-lime/10 rounded-lg px-3 py-2.5">
            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" /> Trip created as Draft. Vehicle and driver will switch to
            On Trip once dispatched.
          </div>
        )}

        <div className="sm:col-span-2 flex justify-end gap-3 pt-1">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-secondary">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 rounded-lg text-sm font-medium gradient-cool text-accent-foreground">
            Create Trip
          </button>
        </div>
      </form>
    </div>
  );
}

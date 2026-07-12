"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useCreateVehicle } from "@/lib/backend-queries";

export default function AddVehicleModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const createVehicle = useCreateVehicle();
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-2xl border border-border bg-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-semibold text-lg">Register Vehicle</h3>
          <button onClick={onClose} className="h-8 w-8 rounded-lg hover:bg-secondary flex items-center justify-center">
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setError(null);
            const target = e.currentTarget;
            const reg = target.elements.namedItem("registrationNumber") as HTMLInputElement;
            const model = target.elements.namedItem("model") as HTMLInputElement;
            const type = target.elements.namedItem("type") as HTMLInputElement;
            const maxLoad = target.elements.namedItem("maxLoad") as HTMLInputElement;
            const cost = target.elements.namedItem("cost") as HTMLInputElement;
            const status = target.elements.namedItem("status") as HTMLSelectElement;

            createVehicle.mutate(
              {
                registrationNumber: reg.value,
                model: model.value,
                type: type.value,
                maxLoadCapacity: Number(maxLoad.value),
                acquisitionCost: Number(cost.value),
                status: status.value,
                odometer: 0,
                region: "West",
              },
              {
                onSuccess: () => onClose(),
                onError: () => setError("The vehicle could not be created. Please try again."),
              },
            );
          }}
        >
          <div className="col-span-2">
            <label className="text-xs text-muted-foreground mb-1.5 block">Registration Number</label>
            <input name="registrationNumber" required className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. MH-12-XX-0000" />
          </div>
          <div className="col-span-2">
            <label className="text-xs text-muted-foreground mb-1.5 block">Model</label>
            <input name="model" required className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. Tata Van-05" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Type</label>
            <input name="type" required className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Van" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Max Load (kg)</label>
            <input name="maxLoad" required type="number" className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="500" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Acquisition Cost (₹)</label>
            <input name="cost" required type="number" className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="1250000" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Status</label>
            <select name="status" className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Available</option>
              <option>In Shop</option>
            </select>
          </div>
          {error ? <div className="col-span-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div> : null}
          <div className="col-span-2 flex justify-end gap-3 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-secondary">
              Cancel
            </button>
            <button type="submit" disabled={createVehicle.isPending} className="px-4 py-2 rounded-lg text-sm font-medium gradient-brand text-primary-foreground disabled:opacity-60">
              {createVehicle.isPending ? "Saving..." : "Register Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

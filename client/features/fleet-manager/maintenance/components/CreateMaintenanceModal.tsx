"use client";

import { useState } from "react";
import { X, Wrench } from "lucide-react";
import axios from "axios";
import { useCreateMaintenanceLog, useVehicles } from "@/lib/backend-queries";

export default function CreateMaintenanceModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const createMaintenanceLog = useCreateMaintenanceLog();
  const { data: vehicles = [], isLoading: vehiclesLoading } = useVehicles();
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-2xl border border-border bg-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand-amber/15 flex items-center justify-center">
              <Wrench className="h-4 w-4 text-brand-amber" />
            </div>
            <h3 className="font-display font-semibold text-lg">Open Maintenance Record</h3>
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-lg hover:bg-secondary flex items-center justify-center">
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
        <form
          className="grid grid-cols-1 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setError(null);
            const target = e.currentTarget;
            const vehicleId = (target.elements.namedItem("vehicleId") as HTMLSelectElement)?.value;
            const title = (target.elements.namedItem("title") as HTMLInputElement)?.value;
            const description = (target.elements.namedItem("description") as HTMLTextAreaElement)?.value;
            const cost = (target.elements.namedItem("cost") as HTMLInputElement)?.value;

            if (!vehicleId) {
              setError("Please select a vehicle.");
              return;
            }

            createMaintenanceLog.mutate(
              {
                vehicleId,
                title,
                description,
                cost: cost ? Number(cost) : undefined,
              },
              {
                onSuccess: () => onClose(),
                onError: (err) => {
                  const message = axios.isAxiosError(err)
                    ? err.response?.data?.message || "The maintenance record could not be created. Please try again."
                    : "The maintenance record could not be created. Please try again.";
                  setError(message);
                },
              },
            );
          }}
        >
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Vehicle</label>
            <select
              name="vehicleId"
              required
              disabled={vehiclesLoading}
              className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">{vehiclesLoading ? "Loading vehicles..." : "Select a vehicle"}</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.registrationNumber} — {v.model}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Title</label>
            <input
              name="title"
              required
              className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="e.g. Brake pad replacement"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Description</label>
            <textarea
              name="description"
              rows={3}
              className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Describe the maintenance work required..."
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Estimated Cost (₹)</label>
            <input
              name="cost"
              type="number"
              min={0}
              step={0.01}
              className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="6500"
            />
          </div>

          {error ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMaintenanceLog.isPending || vehiclesLoading}
              className="px-4 py-2 rounded-lg text-sm font-medium gradient-brand text-primary-foreground disabled:opacity-60"
            >
              {createMaintenanceLog.isPending ? "Opening..." : "Open Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

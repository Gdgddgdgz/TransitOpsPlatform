"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import axios from "axios";
import { useCreateFuelLog, useVehicles } from "@/lib/backend-queries";

export default function LogFuelForm({ onClose }: { onClose: () => void }) {
  const { data: vehicles = [], isLoading } = useVehicles();
  const createFuelLog = useCreateFuelLog();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display font-semibold text-base mb-5">Log Fuel</h3>
      <form
        className="grid sm:grid-cols-2 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setError(null);
          const target = e.currentTarget;
          const vehicleId = (target.elements.namedItem("vehicleId") as HTMLSelectElement)?.value;
          const fuelDate = (target.elements.namedItem("fuelDate") as HTMLInputElement)?.value;
          const liters = (target.elements.namedItem("liters") as HTMLInputElement)?.value;
          const cost = (target.elements.namedItem("cost") as HTMLInputElement)?.value;

          createFuelLog.mutate(
            {
              vehicleId,
              fuelDate,
              liters: Number(liters),
              cost: Number(cost),
            },
            {
              onSuccess: () => {
                setDone(true);
                setTimeout(onClose, 1000);
              },
              onError: (err) => {
                const message = axios.isAxiosError(err)
                  ? err.response?.data?.message || "The fuel log could not be saved. Please try again."
                  : "The fuel log could not be saved. Please try again.";
                setError(message);
              },
            },
          );
        }}
      >
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Vehicle</label>
          <select name="vehicleId" className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" disabled={isLoading}>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>{v.registrationNumber}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Date</label>
          <input name="fuelDate" type="date" required className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Liters</label>
          <input name="liters" type="number" required className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="32" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Cost (₹)</label>
          <input name="cost" type="number" required className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="3520" />
        </div>

        {error ? <div className="sm:col-span-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div> : null}

        {done ? (
          <div className="sm:col-span-2 flex items-center gap-2 text-sm text-brand-lime bg-brand-lime/10 rounded-lg px-3 py-2.5">
            <CheckCircle2 className="h-4 w-4" /> Fuel log recorded.
          </div>
        ) : null}

        <div className="sm:col-span-2 flex justify-end gap-3 pt-1">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-secondary">
            Cancel
          </button>
          <button type="submit" disabled={createFuelLog.isPending} className="px-4 py-2 rounded-lg text-sm font-medium gradient-cool text-accent-foreground disabled:opacity-60">
            {createFuelLog.isPending ? "Saving..." : "Save Log"}
          </button>
        </div>
      </form>
    </div>
  );
}

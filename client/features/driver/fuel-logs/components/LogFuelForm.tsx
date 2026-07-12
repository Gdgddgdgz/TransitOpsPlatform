"use client";

import { useState } from "react";
import { vehicles } from "@/lib/mock-db";
import { CheckCircle2 } from "lucide-react";

export default function LogFuelForm({ onClose }: { onClose: () => void }) {
  const [done, setDone] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display font-semibold text-base mb-5">Log Fuel</h3>
      <form
        className="grid sm:grid-cols-2 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
          setTimeout(onClose, 1000);
        }}
      >
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Vehicle</label>
          <select className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            {vehicles.map((v) => (
              <option key={v.id}>{v.registrationNumber}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Date</label>
          <input type="date" className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Liters</label>
          <input type="number" required className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="32" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">Cost (₹)</label>
          <input type="number" required className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="3520" />
        </div>

        {done && (
          <div className="sm:col-span-2 flex items-center gap-2 text-sm text-brand-lime bg-brand-lime/10 rounded-lg px-3 py-2.5">
            <CheckCircle2 className="h-4 w-4" /> Fuel log recorded.
          </div>
        )}

        <div className="sm:col-span-2 flex justify-end gap-3 pt-1">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-secondary">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 rounded-lg text-sm font-medium gradient-cool text-accent-foreground">
            Save Log
          </button>
        </div>
      </form>
    </div>
  );
}

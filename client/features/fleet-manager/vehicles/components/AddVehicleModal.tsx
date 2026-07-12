"use client";

import { X } from "lucide-react";

export default function AddVehicleModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
            onClose();
          }}
        >
          <div className="col-span-2">
            <label className="text-xs text-muted-foreground mb-1.5 block">Registration Number</label>
            <input required className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. MH-12-XX-0000" />
          </div>
          <div className="col-span-2">
            <label className="text-xs text-muted-foreground mb-1.5 block">Model</label>
            <input required className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. Tata Van-05" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Type</label>
            <input required className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Van" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Max Load (kg)</label>
            <input required type="number" className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="500" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Acquisition Cost (₹)</label>
            <input required type="number" className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="1250000" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Status</label>
            <select className="w-full rounded-lg border border-input bg-secondary/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Available</option>
              <option>In Shop</option>
            </select>
          </div>
          <div className="col-span-2 flex justify-end gap-3 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-secondary">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded-lg text-sm font-medium gradient-brand text-primary-foreground">
              Register Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

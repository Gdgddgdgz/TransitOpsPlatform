"use client";

import { useState } from "react";
import type { Vehicle, VehicleStatus } from "@/lib/types";
import { badgeClass } from "../../shared/utils/badges";
import { Gauge, Package, Pencil, X, Check, Loader2 } from "lucide-react";
import { useUpdateVehicle } from "@/lib/backend-queries";

const EDITABLE_STATUSES: VehicleStatus[] = ["Available", "In Shop", "Retired"];

function EditStatusModal({
  vehicle,
  onClose,
}: {
  vehicle: Vehicle;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<VehicleStatus>(vehicle.status);
  const updateVehicle = useUpdateVehicle();

  function handleSave() {
    if (selected === vehicle.status) {
      onClose();
      return;
    }
    // Map display status back to schema enum
    const statusMap: Record<VehicleStatus, string> = {
      Available: "AVAILABLE",
      "On Trip": "ON_TRIP",
      "In Shop": "IN_SHOP",
      Retired: "RETIRED",
    };
    updateVehicle.mutate(
      { id: vehicle.id, status: statusMap[selected] },
      { onSuccess: onClose }
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display font-semibold text-base">Edit Status</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {vehicle.registrationNumber} · {vehicle.model}
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Status options */}
        <div className="flex flex-col gap-2 mb-6">
          {EDITABLE_STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => setSelected(status)}
              className={`flex items-center justify-between w-full rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                selected === status
                  ? "border-brand-orange bg-brand-orange/10 text-foreground"
                  : "border-border bg-secondary/40 text-muted-foreground hover:bg-secondary"
              }`}
            >
              <span>{status}</span>
              {selected === status && (
                <Check className="h-4 w-4 text-brand-orange" />
              )}
            </button>
          ))}
        </div>

        {/* Note about On Trip */}
        <p className="text-[11px] text-muted-foreground mb-5 -mt-3">
          ⚠ "On Trip" is set automatically when a trip is dispatched and cannot be set manually.
        </p>

        {updateVehicle.isError && (
          <p className="text-xs text-destructive mb-4">
            Failed to update status. Please try again.
          </p>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={updateVehicle.isPending}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium gradient-brand text-primary-foreground disabled:opacity-60"
          >
            {updateVehicle.isPending ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving...
              </>
            ) : (
              "Save Status"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VehicleTable({ vehicles }: { vehicles: Vehicle[] }) {
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  if (vehicles.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-12 text-center text-sm text-muted-foreground">
        No vehicles match the current filters.
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border">
                <th className="px-5 py-3 font-medium">Registration</th>
                <th className="px-5 py-3 font-medium">Model / Type</th>
                <th className="px-5 py-3 font-medium">Capacity</th>
                <th className="px-5 py-3 font-medium">Odometer</th>
                <th className="px-5 py-3 font-medium">Acquisition Cost</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr
                  key={v.id}
                  className="border-b border-border last:border-0 hover:bg-secondary/40 transition-colors"
                >
                  <td className="px-5 py-3.5 font-medium">{v.registrationNumber}</td>
                  <td className="px-5 py-3.5">
                    <p>{v.model}</p>
                    <p className="text-xs text-muted-foreground">{v.type}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <Package className="h-3.5 w-3.5" /> {v.maxLoadCapacity.toLocaleString()} kg
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <Gauge className="h-3.5 w-3.5" /> {v.odometer.toLocaleString()} km
                    </span>
                  </td>
                  <td className="px-5 py-3.5">₹{v.acquisitionCost.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${badgeClass(v.status)}`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => setEditingVehicle(v)}
                      title="Edit status"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Pencil className="h-3 w-3" /> Edit Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingVehicle && (
        <EditStatusModal
          vehicle={editingVehicle}
          onClose={() => setEditingVehicle(null)}
        />
      )}
    </>
  );
}

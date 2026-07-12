import { ArrowRight, MapPin, Package } from "lucide-react";
import { badgeClass } from "../../shared/utils/badges";
import type { Trip, Vehicle } from "@/lib/types";

export default function ActiveTripCard({ trip }: { trip: (Trip & { vehicle?: Vehicle }) | undefined }) {
  if (!trip) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
        No active trip right now. Check the Trips tab to start one.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 relative overflow-hidden">
      <div className="absolute inset-0 gradient-cool opacity-[0.06]" />
      <div className="relative flex items-start justify-between mb-5">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Current trip</p>
          <p className="font-display font-semibold text-lg">{trip.tripNumber}</p>
        </div>
        <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${badgeClass(trip.status)}`}>
          {trip.status}
        </span>
      </div>

      <div className="relative flex items-center gap-3 mb-5">
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <MapPin className="h-4 w-4 text-brand-cyan" /> {trip.source}
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <MapPin className="h-4 w-4 text-brand-orange" /> {trip.destination}
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Vehicle</p>
          <p className="font-medium">{trip.vehicle?.registrationNumber}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            <Package className="h-3.5 w-3.5" /> Cargo
          </p>
          <p className="font-medium">{trip.cargoWeight} kg</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Planned Distance</p>
          <p className="font-medium">{trip.plannedDistance} km</p>
        </div>
      </div>
    </div>
  );
}

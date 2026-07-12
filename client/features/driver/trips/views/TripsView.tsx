"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useTrips } from "@/lib/backend-queries";
import TripTable from "../components/TripTable";
import CreateTripForm from "../components/CreateTripForm";

export default function TripsView() {
  const { data: trips = [], isLoading, error } = useTrips();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-semibold tracking-tight">Trips</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Trip lifecycle: Draft → Dispatched → Completed → Cancelled
          </p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium gradient-cool text-accent-foreground glow"
        >
          <Plus className="h-4 w-4" /> {showForm ? "Hide Form" : "Create Trip"}
        </button>
      </div>

      {error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Unable to load trips from the backend right now.
        </div>
      ) : null}

      {showForm && <CreateTripForm onClose={() => setShowForm(false)} />}

      {isLoading ? <div className="text-sm text-muted-foreground">Loading trips...</div> : <TripTable trips={trips} />}
    </div>
  );
}

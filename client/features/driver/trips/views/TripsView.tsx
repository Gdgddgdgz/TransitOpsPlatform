"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { getAllTrips } from "../data/data";
import TripTable from "../components/TripTable";
import CreateTripForm from "../components/CreateTripForm";

export default function TripsView() {
  const trips = getAllTrips();
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

      {showForm && <CreateTripForm onClose={() => setShowForm(false)} />}

      <TripTable trips={trips} />
    </div>
  );
}

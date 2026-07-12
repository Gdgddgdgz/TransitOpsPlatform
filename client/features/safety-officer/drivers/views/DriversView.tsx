"use client";

import { useMemo, useState } from "react";
import { useDrivers } from "@/lib/backend-queries";
import DriverFilters from "../components/DriverFilters";
import DriverTable from "../components/DriverTable";

function daysUntil(dateStr: string) {
  const target = new Date(dateStr);
  const targetUtc = Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate());
  const today = new Date();
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.ceil((targetUtc - todayUtc) / (1000 * 60 * 60 * 24));
}

export default function DriversView() {
  const { data: all = [], error } = useDrivers();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const enriched = useMemo(() => all.map((driver) => ({ ...driver, daysLeft: daysUntil(driver.licenseExpiry) })), [all]);

  const filtered = useMemo(() => {
    return enriched.filter((d) => {
      if (query && !`${d.name} ${d.licenseNumber}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (status && d.status !== status) return false;
      if (category && d.licenseCategory !== category) return false;
      return true;
    });
  }, [enriched, query, status, category]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Driver Profiles</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {all.length} drivers · Expired licenses or Suspended status block trip assignment
        </p>
      </div>

      {error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Unable to load driver profiles from the backend right now.
        </div>
      ) : null}

      <DriverFilters
        query={query}
        status={status}
        category={category}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
        onCategoryChange={setCategory}
      />

      <DriverTable drivers={filtered} />
    </div>
  );
}

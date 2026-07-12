"use client";

import { useMemo, useState } from "react";
import { withExpiry } from "../data/data";
import DriverFilters from "../components/DriverFilters";
import DriverTable from "../components/DriverTable";

export default function DriversView() {
  const all = withExpiry();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const filtered = useMemo(() => {
    return all.filter((d) => {
      if (query && !`${d.name} ${d.licenseNumber}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (status && d.status !== status) return false;
      if (category && d.licenseCategory !== category) return false;
      return true;
    });
  }, [all, query, status, category]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Driver Profiles</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {all.length} drivers · Expired licenses or Suspended status block trip assignment
        </p>
      </div>

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

import { useMemo } from "react";
import { useFuelLogs } from "@/lib/backend-queries";
import FuelCostByVehicle from "../components/FuelCostByVehicle";
import FuelLogTable from "../components/FuelLogTable";

export default function FuelLogsView() {
  const { data: rows = [] } = useFuelLogs();
  const byVehicle = useMemo(() => {
    const map = new Map<string, number>();
    rows.forEach((row) => {
      const vehicleLabel = row.vehicle?.registrationNumber ?? "Unassigned";
      map.set(vehicleLabel, (map.get(vehicleLabel) ?? 0) + row.cost);
    });
    return Array.from(map.entries()).map(([reg, cost]) => ({ reg, cost }));
  }, [rows]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Fuel Logs</h1>
        <p className="text-sm text-muted-foreground mt-1">Fuel spend across the fleet.</p>
      </div>

      <FuelCostByVehicle data={byVehicle} />
      <FuelLogTable rows={rows} />
    </div>
  );
}

import { getFuelRows, getFuelCostByVehicle } from "../data/data";
import FuelCostByVehicle from "../components/FuelCostByVehicle";
import FuelLogTable from "../components/FuelLogTable";

export default function FuelLogsView() {
  const rows = getFuelRows();
  const byVehicle = getFuelCostByVehicle();

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

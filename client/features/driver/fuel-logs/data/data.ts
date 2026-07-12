import { fuelLogs, getVehicle } from "@/lib/mock-db";

export function getFuelLogRows() {
  return fuelLogs.map((f) => ({ ...f, vehicle: getVehicle(f.vehicleId) }));
}

export function getFuelKpis() {
  const totalLiters = fuelLogs.reduce((s, f) => s + f.liters, 0);
  const totalCost = fuelLogs.reduce((s, f) => s + f.cost, 0);
  const avgCostPerLiter = totalLiters > 0 ? totalCost / totalLiters : 0;
  return { totalLiters, totalCost, avgCostPerLiter, entries: fuelLogs.length };
}

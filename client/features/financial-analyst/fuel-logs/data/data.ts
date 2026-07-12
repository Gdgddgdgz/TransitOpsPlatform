import { fuelLogs, getVehicle } from "@/lib/mock-db";

export function getFuelRows() {
  return fuelLogs.map((f) => ({ ...f, vehicle: getVehicle(f.vehicleId) }));
}

export function getFuelCostByVehicle() {
  const map = new Map<string, number>();
  fuelLogs.forEach((f) => {
    const v = getVehicle(f.vehicleId);
    if (!v) return;
    map.set(v.registrationNumber, (map.get(v.registrationNumber) ?? 0) + f.cost);
  });
  return Array.from(map.entries()).map(([reg, cost]) => ({ reg, cost }));
}

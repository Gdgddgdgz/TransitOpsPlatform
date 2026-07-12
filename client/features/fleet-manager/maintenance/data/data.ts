import { maintenanceLogs, getVehicle } from "@/lib/mock-db";

export function getMaintenanceRecords() {
  return maintenanceLogs.map((m) => ({
    ...m,
    vehicle: getVehicle(m.vehicleId),
  }));
}

export function getMaintenanceKpis() {
  const open = maintenanceLogs.filter((m) => m.status !== "Closed").length;
  const totalCost = maintenanceLogs.reduce((s, m) => s + m.cost, 0);
  const vehiclesInShop = new Set(maintenanceLogs.filter((m) => m.status !== "Closed").map((m) => m.vehicleId)).size;
  return { open, totalCost, vehiclesInShop };
}

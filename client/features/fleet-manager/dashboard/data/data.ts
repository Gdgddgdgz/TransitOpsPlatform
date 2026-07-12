import { vehicles, drivers, trips, fleetUtilization } from "@/lib/mock-db";

export function getDashboardStats() {
  const activeVehicles = vehicles.filter((v) => v.status !== "Retired").length;
  const availableVehicles = vehicles.filter((v) => v.status === "Available").length;
  const inMaintenance = vehicles.filter((v) => v.status === "In Shop").length;
  const activeTrips = trips.filter((t) => t.status === "Dispatched").length;
  const pendingTrips = trips.filter((t) => t.status === "Draft").length;
  const driversOnDuty = drivers.filter((d) => d.status === "On Trip").length;

  return {
    activeVehicles,
    availableVehicles,
    inMaintenance,
    activeTrips,
    pendingTrips,
    driversOnDuty,
    utilization: fleetUtilization(),
  };
}

export interface RegionSlice {
  region: string;
  count: number;
}

export function getFleetByRegion(): RegionSlice[] {
  const map = new Map<string, number>();
  vehicles.forEach((v) => map.set(v.region, (map.get(v.region) ?? 0) + 1));
  return Array.from(map.entries()).map(([region, count]) => ({ region, count }));
}

export function getVehicleTypeBreakdown() {
  const map = new Map<string, number>();
  vehicles.forEach((v) => map.set(v.type, (map.get(v.type) ?? 0) + 1));
  return Array.from(map.entries()).map(([type, count]) => ({ type, count }));
}

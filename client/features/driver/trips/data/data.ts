import { trips, vehicles, drivers, getVehicle, getDriver, daysUntil } from "@/lib/mock-db";

export function getAllTrips() {
  return trips.map((t) => ({ ...t, vehicle: getVehicle(t.vehicleId), driver: getDriver(t.driverId) }));
}

export function getDispatchableVehicles() {
  return vehicles.filter((v) => v.status === "Available");
}

export function getDispatchableDrivers() {
  return drivers.filter((d) => d.status === "Available" && daysUntil(d.licenseExpiry) > 0);
}

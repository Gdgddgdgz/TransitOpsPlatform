import { trips, vehicles, drivers, getVehicle } from "@/lib/mock-db";
import { CURRENT_USER } from "../../shared/data/current-user";

// For the demo we treat the current driver as Alex Fernandes (d1)
export const CURRENT_DRIVER_ID = "d1";

export function getDriverStats() {
  const myTrips = trips.filter((t) => t.driverId === CURRENT_DRIVER_ID);
  const active = myTrips.filter((t) => t.status === "Dispatched").length;
  const completed = myTrips.filter((t) => t.status === "Completed").length;
  const availableVehicles = vehicles.filter((v) => v.status === "Available").length;
  const totalDistance = myTrips.reduce((s, t) => s + (t.actualDistance ?? 0), 0);
  return { active, completed, availableVehicles, totalDistance, totalTrips: myTrips.length };
}

export function getMyTrips() {
  return trips
    .filter((t) => t.driverId === CURRENT_DRIVER_ID)
    .map((t) => ({ ...t, vehicle: getVehicle(t.vehicleId) }));
}

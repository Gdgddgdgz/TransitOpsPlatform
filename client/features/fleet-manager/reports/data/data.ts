import { vehicles, trips, fuelLogs, fuelCostForVehicle, maintenanceCostForVehicle, revenueForVehicle, vehicleROI } from "@/lib/mock-db";

export function getVehicleReportRows() {
  return vehicles.map((v) => {
    const distance = trips
      .filter((t) => t.vehicleId === v.id && t.status === "Completed")
      .reduce((s, t) => s + (t.actualDistance ?? 0), 0);
    const liters = fuelLogs.filter((f) => f.vehicleId === v.id).reduce((s, f) => s + f.liters, 0);
    const efficiency = liters > 0 ? distance / liters : 0;
    const opCost = fuelCostForVehicle(v.id) + maintenanceCostForVehicle(v.id);
    return {
      vehicle: v,
      distance,
      liters,
      efficiency,
      opCost,
      revenue: revenueForVehicle(v.id),
      roi: vehicleROI(v.id),
    };
  });
}

export function toCsv(rows: ReturnType<typeof getVehicleReportRows>) {
  const header = ["Registration", "Distance (km)", "Fuel (L)", "Efficiency (km/L)", "Op Cost (₹)", "Revenue (₹)", "ROI (%)"];
  const lines = rows.map((r) =>
    [
      r.vehicle.registrationNumber,
      r.distance,
      r.liters,
      r.efficiency.toFixed(2),
      r.opCost,
      r.revenue,
      r.roi.toFixed(1),
    ].join(",")
  );
  return [header.join(","), ...lines].join("\n");
}

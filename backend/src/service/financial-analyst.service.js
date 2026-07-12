import { prisma } from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

export const getFuelLogs = async (organizationId) => {
  return await prisma.fuelLog.findMany({
    where: { organizationId },
    include: { vehicle: true },
  });
};

export const createFuelLog = async (organizationId, createdById, data) => {
  const vehicle = await prisma.vehicle.findFirst({
    where: { id: data.vehicleId, organizationId },
  });
  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found.");
  }

  return await prisma.fuelLog.create({
    data: {
      ...data,
      organizationId,
      createdById,
    },
  });
};

export const getExpenses = async (organizationId) => {
  return await prisma.expense.findMany({
    where: { organizationId },
    include: { vehicle: true },
  });
};

export const createExpense = async (organizationId, createdById, data) => {
  if (data.vehicleId) {
    const vehicle = await prisma.vehicle.findFirst({
      where: { id: data.vehicleId, organizationId },
    });
    if (!vehicle) {
      throw new ApiError(404, "Vehicle not found.");
    }
  }

  return await prisma.expense.create({
    data: {
      ...data,
      organizationId,
      createdById,
    },
  });
};

export const getReportMetrics = async (organizationId) => {
  const vehicles = await prisma.vehicle.findMany({ where: { organizationId } });
  const trips = await prisma.trip.findMany({ where: { organizationId, status: "COMPLETED" } });
  const fuelLogs = await prisma.fuelLog.findMany({ where: { organizationId } });
  const maintenanceLogs = await prisma.maintenanceLog.findMany({ where: { organizationId } });
  const expenses = await prisma.expense.findMany({ where: { organizationId } });

  // Map metrics per vehicle
  const vehicleMetrics = vehicles.map((v) => {
    const vehicleFuel = fuelLogs.filter((f) => f.vehicleId === v.id);
    const vehicleMaintenance = maintenanceLogs.filter((m) => m.vehicleId === v.id);
    const vehicleTrips = trips.filter((t) => t.vehicleId === v.id);

    const totalFuelLiters = vehicleFuel.reduce((acc, f) => acc + Number(f.liters), 0);
    const totalFuelCost = vehicleFuel.reduce((acc, f) => acc + Number(f.cost), 0);
    const totalMaintenanceCost = vehicleMaintenance.reduce((acc, m) => acc + Number(m.cost), 0);
    const totalRevenue = vehicleTrips.reduce((acc, t) => acc + Number(t.revenue || 0), 0);
    const totalDistance = vehicleTrips.reduce((acc, t) => acc + Number(t.actualDistance || 0), 0);

    const totalOpCost = totalFuelCost + totalMaintenanceCost;

    // Fuel Efficiency (Distance / Fuel)
    const fuelEfficiency = totalFuelLiters > 0 ? totalDistance / totalFuelLiters : 0;

    // Vehicle ROI = (Revenue - (Maintenance + Fuel)) / AcquisitionCost * 100
    const acquisitionCost = Number(v.acquisitionCost || 0);
    const roi = acquisitionCost > 0 ? ((totalRevenue - totalOpCost) / acquisitionCost) * 100 : 0;

    return {
      vehicleId: v.id,
      registrationNumber: v.registrationNumber,
      model: v.model,
      fuelEfficiency,
      totalOpCost,
      roi,
    };
  });

  // Fleet Utilization
  const active = vehicles.filter((v) => v.status !== "RETIRED").length;
  const onTrip = vehicles.filter((v) => v.status === "ON_TRIP").length;
  const fleetUtilization = active > 0 ? (onTrip / active) * 100 : 0;

  return {
    vehicleMetrics,
    fleetUtilization,
  };
};

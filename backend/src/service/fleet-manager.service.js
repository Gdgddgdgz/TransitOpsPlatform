import { prisma } from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

export const getVehicles = async (organizationId) => {
  return await prisma.vehicle.findMany({
    where: { organizationId },
  });
};

export const getMaintenanceLogs = async (organizationId) => {
  return await prisma.maintenanceLog.findMany({
    where: { organizationId },
    include: { vehicle: true },
  });
};

export const getRecentTrips = async (organizationId, limit = 5) => {
  return await prisma.trip.findMany({
    where: { organizationId },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      vehicle: true,
      driver: { include: { user: true } },
    },
  });
};

export const createVehicle = async (organizationId, data) => {
  // Check uniqueness of registrationNumber
  const existing = await prisma.vehicle.findUnique({
    where: { registrationNumber: data.registrationNumber },
  });
  if (existing) {
    throw new ApiError(400, "Vehicle with this registration number already exists.");
  }

  return await prisma.vehicle.create({
    data: {
      ...data,
      organizationId,
    },
  });
};

export const updateVehicle = async (organizationId, id, data) => {
  const vehicle = await prisma.vehicle.findFirst({
    where: { id, organizationId },
  });
  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found.");
  }

  return await prisma.vehicle.update({
    where: { id },
    data,
  });
};

export const deleteVehicle = async (organizationId, id) => {
  const vehicle = await prisma.vehicle.findFirst({
    where: { id, organizationId },
  });
  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found.");
  }

  return await prisma.vehicle.delete({
    where: { id },
  });
};

export const createMaintenanceLog = async (organizationId, createdById, data) => {
  if (!data.vehicleId) {
    throw new ApiError(400, "Vehicle is required.");
  }

  const vehicle = await prisma.vehicle.findFirst({
    where: { id: data.vehicleId, organizationId },
  });
  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found.");
  }

  if (vehicle.status === "RETIRED") {
    throw new ApiError(400, "Cannot open a maintenance record for a retired vehicle.");
  }

  const cost = data.cost !== undefined && data.cost !== null ? Number(data.cost) : null;
  if (cost !== null && (!Number.isFinite(cost) || cost < 0)) {
    throw new ApiError(400, "Cost must be a non-negative number.");
  }

  // Transaction to create log and change vehicle status to IN_SHOP
  return await prisma.$transaction(async (tx) => {
    const log = await tx.maintenanceLog.create({
      data: {
        vehicleId: data.vehicleId,
        title: data.title,
        description: data.description,
        cost: cost ?? undefined,
        organizationId,
        createdById,
        status: "OPEN",
        openedAt: new Date(),
      },
      include: { vehicle: true },
    });

    await tx.vehicle.update({
      where: { id: data.vehicleId },
      data: { status: "IN_SHOP" },
    });

    return log;
  });
};

export const closeMaintenanceLog = async (organizationId, closedById, id) => {
  const log = await prisma.maintenanceLog.findFirst({
    where: { id, organizationId },
  });
  if (!log) {
    throw new ApiError(404, "Maintenance log not found.");
  }
  if (log.status === "CLOSED") {
    throw new ApiError(400, "Maintenance log is already closed.");
  }

  return await prisma.$transaction(async (tx) => {
    const updatedLog = await tx.maintenanceLog.update({
      where: { id },
      data: {
        status: "CLOSED",
        closedAt: new Date(),
        closedById,
      },
    });

    // Restore vehicle status to AVAILABLE (unless it was retired)
    const vehicle = await tx.vehicle.findUnique({ where: { id: log.vehicleId } });
    if (vehicle && vehicle.status !== "RETIRED") {
      await tx.vehicle.update({
        where: { id: log.vehicleId },
        data: { status: "AVAILABLE" },
      });
    }

    return updatedLog;
  });
};

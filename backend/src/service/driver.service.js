import { prisma } from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

export const getTrips = async (organizationId) => {
  return await prisma.trip.findMany({
    where: { organizationId },
    include: {
      vehicle: true,
      driver: { include: { user: true } },
    },
  });
};

export const createTrip = async (organizationId, createdById, data) => {
  const vehicle = await prisma.vehicle.findFirst({
    where: { id: data.vehicleId, organizationId },
  });
  const driver = await prisma.driver.findFirst({
    where: { id: data.driverId, organizationId },
    include: { user: true },
  });

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found.");
  }
  if (!driver) {
    throw new ApiError(404, "Driver not found.");
  }

  // Business Rule: Cargo Weight must not exceed the vehicle's maximum load capacity
  if (data.cargoWeight > vehicle.maxLoadCapacity) {
    throw new ApiError(400, "Cargo weight exceeds vehicle max load capacity.");
  }

  // Business Rule: Retired or In Shop vehicles must never appear in the dispatch selection.
  if (vehicle.status === "RETIRED" || vehicle.status === "IN_SHOP") {
    throw new ApiError(400, "Vehicle is retired or in shop and cannot be assigned.");
  }

  // Business Rule: Drivers with expired licenses or Suspended status cannot be assigned to trips.
  if (driver.status === "SUSPENDED") {
    throw new ApiError(400, "Driver is suspended and cannot be assigned.");
  }
  if (driver.licenseExpiry && new Date(driver.licenseExpiry) < new Date()) {
    throw new ApiError(400, "Driver's license is expired.");
  }

  // Business Rule: A driver or vehicle already marked On Trip cannot be assigned to another trip.
  if (vehicle.status === "ON_TRIP") {
    throw new ApiError(400, "Vehicle is currently on another trip.");
  }
  if (driver.status === "ON_TRIP") {
    throw new ApiError(400, "Driver is currently on another trip.");
  }

  // Generate a unique trip number
  const tripNumber = "TRP-" + Date.now();

  return await prisma.trip.create({
    data: {
      ...data,
      tripNumber,
      organizationId,
      createdById,
      status: "DRAFT",
    },
  });
};

export const dispatchTrip = async (organizationId, id) => {
  const trip = await prisma.trip.findFirst({
    where: { id, organizationId },
  });

  if (!trip) {
    throw new ApiError(404, "Trip not found.");
  }
  if (trip.status !== "DRAFT") {
    throw new ApiError(400, "Only draft trips can be dispatched.");
  }

  return await prisma.$transaction(async (tx) => {
    // Update trip status
    const updatedTrip = await tx.trip.update({
      where: { id },
      data: {
        status: "DISPATCHED",
        dispatchedAt: new Date(),
      },
    });

    // Business Rule: Dispatching a trip automatically changes both the vehicle and driver status to On Trip
    await tx.vehicle.update({
      where: { id: trip.vehicleId },
      data: { status: "ON_TRIP" },
    });

    await tx.driver.update({
      where: { id: trip.driverId },
      data: { status: "ON_TRIP" },
    });

    return updatedTrip;
  });
};

export const completeTrip = async (organizationId, id, actualDistance, endOdometer) => {
  const trip = await prisma.trip.findFirst({
    where: { id, organizationId },
  });

  if (!trip) {
    throw new ApiError(404, "Trip not found.");
  }
  if (trip.status !== "DISPATCHED") {
    throw new ApiError(400, "Only dispatched trips can be completed.");
  }

  return await prisma.$transaction(async (tx) => {
    // Update trip details
    const updatedTrip = await tx.trip.update({
      where: { id },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
        actualDistance,
        endOdometer,
      },
    });

    // Business Rule: Completing a trip automatically changes both the vehicle and driver status back to Available
    await tx.vehicle.update({
      where: { id: trip.vehicleId },
      data: {
        status: "AVAILABLE",
        odometer: endOdometer,
      },
    });

    await tx.driver.update({
      where: { id: trip.driverId },
      data: { status: "AVAILABLE" },
    });

    return updatedTrip;
  });
};

export const cancelTrip = async (organizationId, id) => {
  const trip = await prisma.trip.findFirst({
    where: { id, organizationId },
  });

  if (!trip) {
    throw new ApiError(404, "Trip not found.");
  }
  if (trip.status === "COMPLETED" || trip.status === "CANCELLED") {
    throw new ApiError(400, `Cannot cancel a ${trip.status.toLowerCase()} trip.`);
  }

  const oldStatus = trip.status;

  return await prisma.$transaction(async (tx) => {
    const updatedTrip = await tx.trip.update({
      where: { id },
      data: { status: "CANCELLED" },
    });

    // Business Rule: Cancelling a dispatched trip restores the vehicle and driver to Available.
    if (oldStatus === "DISPATCHED") {
      await tx.vehicle.update({
        where: { id: trip.vehicleId },
        data: { status: "AVAILABLE" },
      });

      await tx.driver.update({
        where: { id: trip.driverId },
        data: { status: "AVAILABLE" },
      });
    }

    return updatedTrip;
  });
};

import { prisma } from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

export const getDrivers = async (organizationId) => {
  return await prisma.driver.findMany({
    where: { organizationId },
    include: { user: true },
  });
};

export const createDriver = async (organizationId, data) => {
  // Ensure the user exists and belongs to the organization
  const user = await prisma.user.findFirst({
    where: { id: data.userId, organizationId },
  });
  if (!user) {
    throw new ApiError(404, "Associated user not found in this organization.");
  }

  // Ensure the user doesn't already have a driver profile
  const existing = await prisma.driver.findUnique({
    where: { userId: data.userId },
  });
  if (existing) {
    throw new ApiError(400, "User already has a driver profile.");
  }

  // Ensure unique licenseNumber
  if (data.licenseNumber) {
    const existingLicense = await prisma.driver.findUnique({
      where: { licenseNumber: data.licenseNumber },
    });
    if (existingLicense) {
      throw new ApiError(400, "Driver with this license number already exists.");
    }
  }

  return await prisma.driver.create({
    data: {
      ...data,
      organizationId,
    },
  });
};

export const updateDriver = async (organizationId, id, data) => {
  const driver = await prisma.driver.findFirst({
    where: { id, organizationId },
  });
  if (!driver) {
    throw new ApiError(404, "Driver profile not found.");
  }

  // Ensure unique licenseNumber if updated
  if (data.licenseNumber && data.licenseNumber !== driver.licenseNumber) {
    const existingLicense = await prisma.driver.findUnique({
      where: { licenseNumber: data.licenseNumber },
    });
    if (existingLicense) {
      throw new ApiError(400, "Driver with this license number already exists.");
    }
  }

  return await prisma.driver.update({
    where: { id },
    data,
  });
};

export const deleteDriver = async (organizationId, id) => {
  const driver = await prisma.driver.findFirst({
    where: { id, organizationId },
  });
  if (!driver) {
    throw new ApiError(404, "Driver profile not found.");
  }

  return await prisma.driver.delete({
    where: { id },
  });
};

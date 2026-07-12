import * as safetyService from "../service/safety-officer.service.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getDrivers = AsyncHandler(async (req, res) => {
  const drivers = await safetyService.getDrivers(req.user.organizationId);
  return res.status(200).json(new ApiResponse(200, "Drivers retrieved.", drivers));
});

export const createDriver = AsyncHandler(async (req, res) => {
  const driver = await safetyService.createDriver(req.user.organizationId, req.body);
  return res.status(201).json(new ApiResponse(201, "Driver profile created.", driver));
});

export const updateDriver = AsyncHandler(async (req, res) => {
  const driver = await safetyService.updateDriver(req.user.organizationId, req.params.id, req.body);
  return res.status(200).json(new ApiResponse(200, "Driver profile updated.", driver));
});

export const deleteDriver = AsyncHandler(async (req, res) => {
  await safetyService.deleteDriver(req.user.organizationId, req.params.id);
  return res.status(200).json(new ApiResponse(200, "Driver profile deleted."));
});

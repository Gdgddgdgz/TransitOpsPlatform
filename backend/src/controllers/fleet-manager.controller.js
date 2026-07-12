import * as fleetService from "../service/fleet-manager.service.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getVehicles = AsyncHandler(async (req, res) => {
  const vehicles = await fleetService.getVehicles(req.user.organizationId);
  return res.status(200).json(new ApiResponse(200, "Vehicles retrieved.", vehicles));
});

export const createVehicle = AsyncHandler(async (req, res) => {
  const vehicle = await fleetService.createVehicle(req.user.organizationId, req.body);
  return res.status(201).json(new ApiResponse(201, "Vehicle registered.", vehicle));
});

export const updateVehicle = AsyncHandler(async (req, res) => {
  const vehicle = await fleetService.updateVehicle(req.user.organizationId, req.params.id, req.body);
  return res.status(200).json(new ApiResponse(200, "Vehicle updated.", vehicle));
});

export const deleteVehicle = AsyncHandler(async (req, res) => {
  await fleetService.deleteVehicle(req.user.organizationId, req.params.id);
  return res.status(200).json(new ApiResponse(200, "Vehicle deleted."));
});

export const createMaintenanceLog = AsyncHandler(async (req, res) => {
  const log = await fleetService.createMaintenanceLog(req.user.organizationId, req.user.id, req.body);
  return res.status(201).json(new ApiResponse(201, "Maintenance log created.", log));
});

export const closeMaintenanceLog = AsyncHandler(async (req, res) => {
  const log = await fleetService.closeMaintenanceLog(req.user.organizationId, req.user.id, req.params.id);
  return res.status(200).json(new ApiResponse(200, "Maintenance log closed.", log));
});

import * as driverService from "./driver.service.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getTrips = AsyncHandler(async (req, res) => {
  const trips = await driverService.getTrips(req.user.organizationId);
  return res.status(200).json(new ApiResponse(200, "Trips retrieved.", trips));
});

export const createTrip = AsyncHandler(async (req, res) => {
  const trip = await driverService.createTrip(req.user.organizationId, req.user.id, req.body);
  return res.status(201).json(new ApiResponse(201, "Trip created.", trip));
});

export const dispatchTrip = AsyncHandler(async (req, res) => {
  const trip = await driverService.dispatchTrip(req.user.organizationId, req.params.id);
  return res.status(200).json(new ApiResponse(200, "Trip dispatched.", trip));
});

export const completeTrip = AsyncHandler(async (req, res) => {
  const { actualDistance, endOdometer } = req.body;
  const trip = await driverService.completeTrip(
    req.user.organizationId,
    req.params.id,
    actualDistance,
    endOdometer
  );
  return res.status(200).json(new ApiResponse(200, "Trip completed.", trip));
});

export const cancelTrip = AsyncHandler(async (req, res) => {
  const trip = await driverService.cancelTrip(req.user.organizationId, req.params.id);
  return res.status(200).json(new ApiResponse(200, "Trip cancelled.", trip));
});

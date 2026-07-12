import express from "express";
import { authUser } from "../../middleware/authUser.js";
import { checkRolesAllowed } from "../../middleware/checkRolesAllowed.js";
import * as fleetController from "../service/fleet-manager.controller.js";

const router = express.Router();

// Apply auth and role-based validation to all routes
router.use(authUser);
router.use(checkRolesAllowed("FLEET_MANAGER", "ADMIN"));

router.route("/vehicles")
  .get(fleetController.getVehicles)
  .post(fleetController.createVehicle);

router.route("/vehicles/:id")
  .put(fleetController.updateVehicle)
  .delete(fleetController.deleteVehicle);

router.route("/maintenance")
  .post(fleetController.createMaintenanceLog);

router.route("/maintenance/:id/close")
  .post(fleetController.closeMaintenanceLog);

export default router;

import express from "express";
import { authUser } from "../middleware/authUser.js";
import { checkRolesAllowed } from "../middleware/checkRolesAllowed.js";
import * as fleetController from "../controllers/fleet-manager.controller.js";

const router = express.Router();

router.use(authUser);

// Vehicle list is also needed by drivers (e.g., logging fuel)
router.route("/vehicles")
  .get(checkRolesAllowed("FLEET_MANAGER", "ADMIN", "DRIVER"), fleetController.getVehicles)
  .post(checkRolesAllowed("FLEET_MANAGER", "ADMIN"), fleetController.createVehicle);

// Remaining fleet routes are restricted to fleet managers and admins
router.use(checkRolesAllowed("FLEET_MANAGER", "ADMIN"));

router.route("/vehicles/:id")
  .put(fleetController.updateVehicle)
  .delete(fleetController.deleteVehicle);

router.route("/maintenance")
  .get(fleetController.getMaintenanceLogs)
  .post(fleetController.createMaintenanceLog);

router.route("/maintenance/:id/close")
  .post(fleetController.closeMaintenanceLog);

router.route("/recent-trips")
  .get(fleetController.getRecentTrips);

export default router;

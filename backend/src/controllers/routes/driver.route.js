import express from "express";
import { authUser } from "../../middleware/authUser.js";
import { checkRolesAllowed } from "../../middleware/checkRolesAllowed.js";
import * as driverController from "../service/driver.controller.js";

const router = express.Router();

router.use(authUser);
router.use(checkRolesAllowed("DRIVER", "ADMIN"));

router.route("/trips")
  .get(driverController.getTrips)
  .post(driverController.createTrip);

router.route("/trips/:id/dispatch")
  .post(driverController.dispatchTrip);

router.route("/trips/:id/complete")
  .post(driverController.completeTrip);

router.route("/trips/:id/cancel")
  .post(driverController.cancelTrip);

export default router;

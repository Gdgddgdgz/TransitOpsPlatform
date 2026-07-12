import express from "express";
import { authUser } from "../../middleware/authUser.js";
import { checkRolesAllowed } from "../../middleware/checkRolesAllowed.js";
import * as safetyController from "../service/safety-officer.controller.js";

const router = express.Router();

router.use(authUser);
router.use(checkRolesAllowed("SAFETY_OFFICER", "ADMIN"));

router.route("/drivers")
  .get(safetyController.getDrivers)
  .post(safetyController.createDriver);

router.route("/drivers/:id")
  .put(safetyController.updateDriver)
  .delete(safetyController.deleteDriver);

export default router;

import express from "express";
import { authUser } from "../middleware/authUser.js";
import { checkRolesAllowed } from "../middleware/checkRolesAllowed.js";
import * as financialController from "./financial-analyst.controller.js";

const router = express.Router();

router.use(authUser);
router.use(checkRolesAllowed("FINANCIAL_ANALYST", "ADMIN"));

router.route("/fuel")
  .get(financialController.getFuelLogs)
  .post(financialController.createFuelLog);

router.route("/expenses")
  .get(financialController.getExpenses)
  .post(financialController.createExpense);

router.route("/reports")
  .get(financialController.getReportMetrics);

export default router;

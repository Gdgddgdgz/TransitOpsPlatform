import express from "express";
import { authUser } from "../middleware/authUser.js";
import { checkRolesAllowed } from "../middleware/checkRolesAllowed.js";
import * as financialController from "../controllers/financial-analyst.controller.js";

const router = express.Router();

router.use(authUser);

// Fuel logs can also be created/viewed by drivers
router.route("/fuel")
  .get(checkRolesAllowed("FINANCIAL_ANALYST", "ADMIN", "DRIVER"), financialController.getFuelLogs)
  .post(checkRolesAllowed("FINANCIAL_ANALYST", "ADMIN", "DRIVER"), financialController.createFuelLog);

// Dashboard metrics for financial analyst overview
router.route("/dashboard")
  .get(checkRolesAllowed("FINANCIAL_ANALYST", "ADMIN"), financialController.getDashboardMetrics);

// Reports are also relevant to fleet managers
router.route("/reports")
  .get(checkRolesAllowed("FINANCIAL_ANALYST", "ADMIN", "FLEET_MANAGER"), financialController.getReportMetrics);

// Remaining financial routes are restricted to financial analysts and admins
router.use(checkRolesAllowed("FINANCIAL_ANALYST", "ADMIN"));

router.route("/expenses")
  .get(financialController.getExpenses)
  .post(financialController.createExpense);

export default router;

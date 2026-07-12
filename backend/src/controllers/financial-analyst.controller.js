import * as financialService from "../service/financial-analyst.service.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getFuelLogs = AsyncHandler(async (req, res) => {
  const logs = await financialService.getFuelLogs(req.user.organizationId);
  return res.status(200).json(new ApiResponse(200, "Fuel logs retrieved.", logs));
});

export const createFuelLog = AsyncHandler(async (req, res) => {
  const log = await financialService.createFuelLog(req.user.organizationId, req.user.id, req.body);
  return res.status(201).json(new ApiResponse(201, "Fuel log created.", log));
});

export const getExpenses = AsyncHandler(async (req, res) => {
  const expenses = await financialService.getExpenses(req.user.organizationId);
  return res.status(200).json(new ApiResponse(200, "Expenses retrieved.", expenses));
});

export const createExpense = AsyncHandler(async (req, res) => {
  const expense = await financialService.createExpense(req.user.organizationId, req.user.id, req.body);
  return res.status(201).json(new ApiResponse(201, "Expense created.", expense));
});

export const getReportMetrics = AsyncHandler(async (req, res) => {
  const metrics = await financialService.getReportMetrics(req.user.organizationId);
  return res.status(200).json(new ApiResponse(200, "Report metrics retrieved.", metrics));
});

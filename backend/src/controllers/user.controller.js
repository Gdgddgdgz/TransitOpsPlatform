import { getAuth, clerkClient } from "@clerk/express";
import { prisma } from "../config/prisma.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const getCurrentUser = AsyncHandler(async (req, res) => {
  // req.user is already populated by authUser middleware
  return res.status(200).json({
    success: true,
    data: req.user,
  });
});
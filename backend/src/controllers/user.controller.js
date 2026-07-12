import { getAuth, clerkClient } from "@clerk/express";
import { prisma } from "../config/prisma.js";
import AsyncHandler from "../utils/AsyncHandler.js";

export const getCurrentUser = AsyncHandler(async (req, res) => {
  const { userId, orgId, isAuthenticated } = getAuth(req);

  if (!isAuthenticated) {
    throw new ApiError(401, "Unauthorized");
  }

  const user = await prisma.user.findFirst({
    where: {
      clerkUserId: userId,
      organization: {
        clerkOrgId: orgId,
      },
    },
    include: {
      organization: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
});
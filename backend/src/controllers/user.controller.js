import { getAuth, clerkClient } from "@clerk/express";
import { prisma } from "../config/prisma.js";
import AsyncHandler from "../utils/AsyncHandler.js";

export const getCurrentUser = AsyncHandler(async (req, res) => {
  const { userId, orgId, isAuthenticated } = getAuth(req);

  if (!isAuthenticated) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const clerkUser = await clerkClient.users.getUser(userId);

  const email = clerkUser.emailAddresses[0].emailAddress;

  const user = await prisma.user.findFirst({
    where: {
      email,
      organization: {
        clerkOrgId: orgId,
      },
    },
    include: {
      organization: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});
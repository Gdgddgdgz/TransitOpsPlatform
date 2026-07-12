import { clerkClient, getAuth } from "@clerk/express";
import { prisma } from "../config/prisma.js";

export const authUser = async (req, res, next) => {
  try {
    const { userId, orgId, isAuthenticated } = getAuth(req);

    if (!isAuthenticated || !userId || !orgId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const clerkUser = await clerkClient.users.getUser(userId);

    const email = clerkUser.emailAddresses[0].emailAddress;

    let user = await prisma.user.findFirst({
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
      return res.status(403).json({
        success: false,
        message: "You are not a member of this organization.",
      });
    }

    // First login after accepting invitation
    if (!user.clerkUserId) {
      user = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          clerkUserId: userId,
          name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
          isActive: true,
        },
        include: {
          organization: true,
        },
      });
    }

    // Block inactive users
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive.",
      });
    }

    req.user = user;

    req.auth = {
      clerkUserId: userId,
      clerkOrgId: orgId,
    };

    next();
  } catch (error) {
    next(error);
  }
};
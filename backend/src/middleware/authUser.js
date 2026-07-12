import { clerkClient, getAuth } from "@clerk/express";
import { prisma } from "../config/prisma.js";

export const authUser = async (req, res, next) => {
  try {
    const { userId, orgId, isAuthenticated } = getAuth(req);

    if (!isAuthenticated || !userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const clerkUser = await clerkClient.users.getUser(userId);

    const email = clerkUser.emailAddresses?.[0]?.emailAddress;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "User has no email address associated with Clerk",
      });
    }

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
        message: "User is not part of this organization",
      });
    }

    if (!user.clerkUserId) {
      user = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          clerkUserId: userId,
        },
        include: {
          organization: true,
        },
      });
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
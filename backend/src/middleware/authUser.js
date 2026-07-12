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

    const email = clerkUser.emailAddresses?.[0]?.emailAddress;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "User has no email address associated with Clerk",
      });
    }

    // Debug: log what we're looking up so mismatches are visible in the terminal
    console.log(`[authUser] Looking up user: email="${email}", orgId="${orgId}"`);

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
      console.warn(`[authUser] 403 — no DB user found for email="${email}" in org clerkOrgId="${orgId}". Run POST /api/v1/admin/setup to seed the DB.`);
      return res.status(403).json({
        success: false,
        message: "You are not a member of this organization. Visit /admin/setup to initialize your account.",
      });
    }

    // First login after accepting invitation (placeholder IDs were created by admin invite)
    const isPendingInvite = user.clerkUserId?.startsWith("pending_");
    if (!user.clerkUserId || isPendingInvite) {
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
import { clerkClient, getAuth } from "@clerk/express";
import { prisma } from "../config/prisma.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const setupOrganization = AsyncHandler(async (req, res) => {
  const { userId, orgId, isAuthenticated } = getAuth(req);

  if (!isAuthenticated || !userId || !orgId) {
    return res.status(401).json({
      success: false,
      message: "No active organization found.",
    });
  }

  // Fetch organization from Clerk
  const clerkOrg = await clerkClient.organizations.getOrganization({
    organizationId: orgId,
  });

  // Fetch current user from Clerk
  const clerkUser = await clerkClient.users.getUser(userId);

  const email = clerkUser.emailAddresses[0].emailAddress;

  // Prevent duplicate setup
  const existingOrg = await prisma.organization.findUnique({
    where: {
      clerkOrgId: orgId,
    },
  });

  if (existingOrg) {
    return res.status(400).json({
      success: false,
      message: "Organization already initialized.",
    });
  }

  // Save organization
  const organization = await prisma.organization.create({
    data: {
      clerkOrgId: orgId,
      name: clerkOrg.name,
    },
  });

  // Save creator as ADMIN
  const user = await prisma.user.create({
    data: {
      clerkUserId: userId,
      organizationId: organization.id,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      email,
      role: "ADMIN",
      isActive: true,
    },
  });

  res.status(201).json({
    success: true,
    message: "Organization initialized successfully.",
    data: {
      organization,
      user,
    },
  });
});

export const inviteUser = AsyncHandler(async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
    throw new ApiError(400, "Email and role are required.");
  }

  // req.user is set by authUser middleware
  const organization = req.user.organization;

  // Prevent duplicate users
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists.");
  }

  // Send Clerk invitation
  await clerkClient.organizations.createOrganizationInvitation(
    organization.clerkOrgId,
    {
      inviterUserId: req.user.clerkUserId,
      emailAddress: email,
      role: "org:member", // Clerk role

      // optional
      publicMetadata: {
        appRole: role,
      },

      redirectUrl:
        "http://localhost:3000/accept-invitation",
    }
  );

  // Save your application's role
  const user = await prisma.user.create({
    data: {
      clerkUserId: null,
      organizationId: organization.id,
      name: "",
      email,
      role, // ADMIN / FLEET_MANAGER / DRIVER ...
      isActive: false,
    },
  });

  return res.status(201).json({
    success: true,
    message: "Invitation sent successfully.",
    data: user,
  });
});

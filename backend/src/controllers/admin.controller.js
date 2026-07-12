import { clerkClient, getAuth } from "@clerk/express";
import { prisma } from "../config/prisma.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const setupOrganization = AsyncHandler(async (req, res) => {
  const { userId, orgId, isAuthenticated } = getAuth(req);

  if (!isAuthenticated || !userId || !orgId) {
    throw new ApiError(401, "No active organization found.");
  }

  const clerkOrg = await clerkClient.organizations.getOrganization({
    organizationId: orgId,
  });

  const clerkUser = await clerkClient.users.getUser(userId);

  const email = clerkUser.emailAddresses?.[0]?.emailAddress;

  if (!email) {
    throw new ApiError(400, "Email not found.");
  }

  // Upsert Organization
  const organization = await prisma.organization.upsert({
    where: {
      clerkOrgId: orgId,
    },
    update: {
      name: clerkOrg.name,
    },
    create: {
      clerkOrgId: orgId,
      name: clerkOrg.name,
    },
  });

  // Upsert User (Owner or Invited User)
  const user = await prisma.user.upsert({
    where: {
      email,
    },
    update: {
      clerkUserId: userId,
      organizationId: organization.id,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      isActive: true,
    },
    create: {
      clerkUserId: userId,
      organizationId: organization.id,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      email,
      role: "ADMIN",
      isActive: true,
    },
  });

  return res.status(200).json({
    success: true,
    message: "Organization synced successfully.",
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

  const organization = req.user.organization;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists.");
  }

  await clerkClient.organizations.createOrganizationInvitation(
    organization.clerkOrgId,
    {
      inviterUserId: req.user.clerkUserId,
      emailAddress: email,
      role: "org:member",
      publicMetadata: {
        appRole: role,
      },
      redirectUrl: "http://localhost:3000/auth/sign-up",
    }
  );

  const user = await prisma.user.create({
    data: {
      clerkUserId: `pending_${crypto.randomUUID()}`,
      organizationId: organization.id,
      name: "",
      email,
      role,
      isActive: false,
    },
  });

  return res.status(201).json({
    success: true,
    message: "Invitation sent successfully.",
    data: user,
  });
});

export const getUsers = AsyncHandler(async (req, res) => {
  const organization = req.user.organization;

  const users = await prisma.user.findMany({
    where: {
      organizationId: organization.id,
    },
    orderBy: { createdAt: "asc" },
  });

  return res.status(200).json({
    success: true,
    data: users,
  });
});
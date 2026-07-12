import express from "express";
import { authUser } from "../middleware/authUser.js";
import { checkRolesAllowed } from "../middleware/checkRolesAllowed.js";
import { setupOrganization, inviteUser } from "../controllers/admin.controller.js";

const router = express.Router();

// Setup organization does not require authUser because it creates the first user
router.post("/setup", setupOrganization);

// Invite user requires active auth and must be ADMIN
router.post("/invite", authUser, checkRolesAllowed("ADMIN"), inviteUser);

export default router;

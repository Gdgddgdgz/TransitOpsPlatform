import express from "express";
import { authUser } from "../middleware/authUser.js";
import { checkRolesAllowed } from "../middleware/checkRolesAllowed.js";
import { setupOrganization, inviteUser, getUsers } from "../controllers/admin.controller.js";

const router = express.Router();

// Setup organization does not require authUser because it creates the first user
router.post("/setup", setupOrganization);

// Routes below require active auth and must be ADMIN
router.get("/users", authUser, checkRolesAllowed("ADMIN"), getUsers);
router.post("/invite", authUser, checkRolesAllowed("ADMIN"), inviteUser);

export default router;

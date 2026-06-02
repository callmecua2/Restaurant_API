import express from "express";
import { createOrganization, loginOrganization, createUser } from "./Organization";
import { organizationMiddleware } from "./OrganizationMiddleware";
import { getUser } from "./getUser";

const router = express.Router();

router.post("/loginOrganization", loginOrganization);

router.post("/createOrganization", createOrganization);

router.use(organizationMiddleware);

router.post("/createUser", createUser);
router.get("/getUSer",getUser);

export default router;

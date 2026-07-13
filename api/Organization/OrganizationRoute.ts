import express from "express";
import {createOrganization} from "./createOrganization";
import { loginOrganization } from "./loginOrganization";
import { createUser } from "./createUserOrganization";
import { organizationMiddleware } from "./OrganizationMiddleware";
import { getUser } from "./getUser";
import { verifyEmail } from "./emailVerification";

const router = express.Router();

router.post("/createOrganization", createOrganization);
router.post("/loginOrganization", loginOrganization);
router.post("/verify", verifyEmail)

router.use(organizationMiddleware);

router.post("/createUser", createUser);
router.get("/getUSer", getUser);

export default router;

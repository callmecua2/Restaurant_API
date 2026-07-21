import express from "express";
import { createOrganization } from "./createOrganization";
import { loginOrganization } from "./loginOrganization";
// import { createUser } from "./createUserOrganization";
import { organizationMiddleware } from "./OrganizationMiddleware";
import { verifyEmail } from "./emailVerification";
import { getOrganization } from "./getOrganization";
import { logoutOrg } from "./logoutOrganization";
import { changePassword } from "./changePassword";
import { resendOTP } from "./resendOTP";

const router = express.Router();

router.post("/createOrganization", createOrganization);
router.post("/loginOrganization", loginOrganization);
router.post("/verify", verifyEmail);
router.post("/logout", logoutOrg);
router.post("/resendOTP", resendOTP)

router.use(organizationMiddleware);
// router.post("/createUser", createUser);
router.get("/getOrganization", getOrganization);
router.post("/changePassword", changePassword);

export default router;

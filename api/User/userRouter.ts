import express from "express";
import { userLogin } from "./login";
import { getAllUSer } from "./getUser";
import { userMiddlerware } from "./userMiddleware";
import { createUser } from "./create";
import { logout } from "./logout";
import { getProfiles } from "./profiles";
import { changePassword } from "./changepassword";
import { getUserDetail } from "./getUserDetail";

const router = express.Router();

router.post("/loginUser",userLogin)
router.use(userMiddlerware)

router.post("/create", createUser)
router.post("/logout", logout)
router.get("/getAllUser", getAllUSer)
router.get("/profiles", getProfiles)
router.get("/user/:id", getUserDetail)


router.post("/changepassword", changePassword)


export default router;

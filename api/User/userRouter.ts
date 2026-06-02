import express from "express";
import { userLogin } from "./userLogin";
import { getAllUSer } from "./getUser";
import { userMiddlerware } from "./userMiddleware";


const router = express.Router();

router.post("/loginUser",userLogin)

router.use(userMiddlerware)
router.get("/getAllUser", getAllUSer)


export default router;

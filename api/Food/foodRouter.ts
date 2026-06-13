import express from "express";
import { userMiddlerware } from "../User/userMiddleware";
import { inputFood } from "./inputFood";

const router = express.Router();

router.use(userMiddlerware)
router.post("/inputFood", inputFood)


export default router

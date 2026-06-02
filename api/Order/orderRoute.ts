import express from "express";
import { userMiddlerware } from "../User/userMiddleware";
import { createOrder } from "./create";
import { getOrder } from "./getOrder";

const router = express.Router();

router.use(userMiddlerware)
router.post("/create", createOrder)
router.get("/getOrder", getOrder)

export default router
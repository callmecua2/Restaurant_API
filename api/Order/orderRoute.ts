import express from "express";
import { userMiddlerware } from "../User/userMiddleware";
import { createOrder } from "./create";
import { getOrder } from "./getOrder";
import { updateOrder } from "./status/updateOrder";

const router = express.Router();

router.use(userMiddlerware)
router.post("/create", createOrder)
router.get("/getOrder", getOrder)
router.patch("/:id/status", updateOrder)

export default router
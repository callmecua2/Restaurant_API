import express from "express";
import { kitchenGetOrder } from "./order";
import { kitchenUpdateOrder } from "./update";
import { userMiddlerware } from "../User/userMiddleware";

const router = express.Router();

router.use(userMiddlerware)
router.get("/order", kitchenGetOrder)
router.patch("/:id/status", kitchenUpdateOrder)

export default router
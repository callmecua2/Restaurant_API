import express from "express";
import { userMiddlerware } from "../User/userMiddleware";
import { inputFood } from "./input-food";
import { getFoodById } from "./get-food-by-id";
import { updatefood } from "./update-food";

const router = express.Router();

router.use(userMiddlerware)
router.post("/v1/foods", inputFood)
router.get("/v1/foods/:id", getFoodById)
router.patch("v1/foods/:id", updatefood)

export default router

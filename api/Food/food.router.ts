import express from "express";
import { userMiddlerware } from "../User/userMiddleware";
import { inputFood } from "./input-food";
import { getFoodById } from "./get-food-by-id";
import { updatefood } from "./update-food";
import { getFood } from "./get-food-by-category";


const router = express.Router();

router.use(userMiddlerware)
router.get("/v1/foods", getFood)
router.get("/v1/foods/:id", getFoodById)
router.post("/v1/foods", inputFood)
router.patch("v1/foods/:id", updatefood)
    

export default router

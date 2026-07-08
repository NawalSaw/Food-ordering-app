import express from "express";
import { param } from "express-validator";
import restaurantController from "../controller/restaurantController";

const router = express.Router();

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("restaurantId is required and must be a valid string"),
  restaurantController.getRestaurant
);
router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City is required and must be a valid string"),
  restaurantController.searchRestaurants
);

export default router;

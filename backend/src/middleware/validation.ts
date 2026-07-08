import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name")
    .isString()
    .notEmpty()
    .withMessage("Name is required and must be a string"),
  body("city")
    .isString()
    .notEmpty()
    .withMessage("City is required and must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Address Line l is required and must be a string"),
  body("country")
    .isString()
    .notEmpty()
    .withMessage("Country is required and must be a string"),
  handleValidationError,
];

export const validateMyRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant Name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery Price must be a positive number"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated Delivery Time must be a positive number"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines array cannot be empty")
    .not()
    .isEmpty(),
  body("menuItems").isArray().withMessage("Menu Items must be an array"),
  body("menuItems.*.name").notEmpty().withMessage("Menu Item Name is required"),
  body("menuItems.*.price")
    .isFloat()
    .withMessage("Menu Item Price is required and must be a number"),
  handleValidationError,
];

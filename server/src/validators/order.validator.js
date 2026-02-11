import { body } from "express-validator";
// Order validations
export const orderValidations = [
  body("items")
    .isEmpty()
    .withMessage("No items found")
    .isLength({ min: 0 })
    .withMessage("No items found"),
  body("quantity").isEmpty().withMessage("Item quantity is required"),
  body("amount")
    .isEmpty()
    .withMessage("Amount is required")
    .isFloat({ min: 0.01 })
    .withMessage("Amount cannot be zero"),
  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isMongoId()
    .withMessage("Address Id is invalid"),
  body("status").notEmpty().withMessage("Status is required"),
];

import { body } from "express-validator";
// Product validations
export const productValidations = [
    body('name')
    .notEmpty().withMessage("Product name is required")
    .isLength({min: 3}).withMessage("Product name should be atleast 3 characters long"),
    body('catagory')
    .notEmpty().withMessage("Product catagory is required"),
    body('price')
    .notEmpty().withMessage("Product price is required")
    .isFloat({gt: 0}).withMessage("Price must be greater than 0"),
];


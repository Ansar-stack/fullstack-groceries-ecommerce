import { body } from "express-validator";
// Product validations
export const productValidations = [
    body('name')
    .notEmpty().withMessage("Product name is required")
    .isLength({min: 3}).withMessage("Product name should be atleast 3 characters long")
    .isLength({max: 100}).withMessage("Product name should be less then 100 characters long"),
    body('category')
    .notEmpty().withMessage("Product category is required"),
    // .isMongoId().withMessage("Invalid catagory"),
    body("description")
    .notEmpty().withMessage("Product description is required")
    .isLength({min: 20}).withMessage("Product description should be minimum 20 character long")
    .isLength({max: 200}).withMessage("Product description should be less then 200 characters"),
    body('price')
    .notEmpty().withMessage("Product price is required")
    .isFloat({gt: 0}).withMessage("Price must be greater than 0")
    .isFloat({lt: 10000000}).withMessage("Price should be less then 10000000"),
    body('offerPrice')
    .notEmpty().withMessage("Offer price is required")
    .isFloat({gt: 0}).withMessage("Price must be greater than 0")
    .isFloat({lt: 10000000}).withMessage("Price should be less then 10000000"),
];


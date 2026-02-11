import { body } from "express-validator";

export const addressValidations = [
    body('firstName')
    .trim().toLowerCase()
    .notEmpty().withMessage("First name is required")
    .isLength({min: 1}).withMessage("First name is required"),
    body('email')
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email address"),
    body('street')
    .isEmpty().withMessage("Street is required")
    .isLength({min:1}).withMessage("Street is required"),
    body('city')
    .isEmpty().withMessage("City is required")
    .isLength({min:1}).withMessage("City is required"),
    body('zipCode')
    .notEmpty().withMessage("Zip code is required")
    .isNumeric().withMessage("Invalid zip code"),
    body('phone')
    .isEmpty().withMessage("Phone number is required")
    .isMobilePhone().withMessage("Invalid phone number")
]
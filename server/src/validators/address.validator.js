import { body } from "express-validator";

export const addressValidations = [
    body('firstName')
    .trim()
    .notEmpty().withMessage("First name is required")
    .isLength({min: 3}).withMessage("First name should be atleast 3 characters"),
    body('email')
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email address"),
    body("street")
    .trim()
    .notEmpty().withMessage("Street is required"),
    body("city")
    .trim()
    .notEmpty().withMessage("City is required"),
    body("zipCode")
    .notEmpty().withMessage('Zip code is required')
    .matches(/[0-9-]/).withMessage("Invalid zip code"),
    body("country")
    .notEmpty().withMessage("Country is required"),
    body("phone")
    .notEmpty().withMessage("Phone number is required")
    .matches(/[0-9+]/).withMessage("Invalid phone number")
]
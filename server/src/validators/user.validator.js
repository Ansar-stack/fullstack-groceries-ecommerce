import {body} from 'express-validator'
export const UserValidations = [
    body('name')
    .trim()
    .toLowerCase()
    .notEmpty().withMessage("Name is required.")
    .isLength({min: 3}).withMessage("Name should be atleast 3 character long.")
    .isLength({max: 30}).withMessage("Name should be less then 30 characters"),
    body('email')
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Invalid email address."),
    body('password')
    .notEmpty().withMessage("Password is required.")
    .isLength({min: 8}).withMessage("Password should be atleast 8 characters.")
    .isLength({max: 100}).withMessage("Password should not be more then 100 characters."),
];

export const UserLoginValidations = [
     body('email')
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Invalid email address."),
    body('password')
    .notEmpty().withMessage("Password is required.")
    .isLength({min: 8}).withMessage("Incorrect password")
    .isLength({max: 100}).withMessage("Incorrect password"),
]
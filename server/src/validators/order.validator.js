import { body } from "express-validator";
// Order validations
export const orderValidations = [
    body('items')
    .isEmpty().withMessage('No items found')
    .isLength({min: 0}).withMessage("No items found"),
    body('quantity')
    .isEmpty().withMessage("Item quantity is required"),
];

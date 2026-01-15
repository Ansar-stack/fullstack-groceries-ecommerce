import { validationResult } from "express-validator"
import ErrorHandler from '../utils/errorHanlder.util.js'
// Handling the validation errors
export const HandleValidationError = (req, res, next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty())return next();
    const firstError = errors.array()[0];
    return next(new ErrorHandler(400, firstError.msg));
}
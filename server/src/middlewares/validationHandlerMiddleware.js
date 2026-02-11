import {validationResult} from 'express-validator'
import AppError from '../utils/AppError.util.js';
export const validationHandlerMiddleware = (req, res, next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty())return next();
    const firstError = errors.array()[0];
    return next(new AppError(400, firstError.msg));
};

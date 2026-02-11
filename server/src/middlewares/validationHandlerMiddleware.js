import {validationResult} from 'express-validator'
export const validationHandlerMiddleware = (req, res, next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty())return next();
    const firstError = errors.array()[0];
    return res.respond(400, firstError.msg);
};

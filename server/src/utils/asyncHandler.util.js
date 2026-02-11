import AppError from "./AppError.util.js";

export const asyncHandler = (fn)=> async (req, res, next)=>{
    try {
        await fn(req, res, next);
    } catch (error) {
        return next(new AppError(error.status || 500, error.message || "Internal Server Error"));
    }
}
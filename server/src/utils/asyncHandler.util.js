import AppError from "./AppError.util.js";
// Async handler
export const asyncHandler = (fn)=> async (req, res, next)=>{
    try {
        await fn(req, res, next);
    } catch (error) {
        return res.respond(error.status || 500, error.message || "Internal Server Error");
    }
}
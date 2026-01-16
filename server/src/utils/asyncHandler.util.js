import ErrorHandler from "./errorHandler.util.js"
// Handle the async functions 
export const asyncHanlder = (fn)=> async(req, res, next)=>{
    try {
        await fn(req, res, next)
    } catch (error) {
        return next(new ErrorHandler(error.code, error.message))
    }
}
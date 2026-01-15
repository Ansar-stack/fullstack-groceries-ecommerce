export const ErrorMiddlware = (err, req, res)=>{
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    return res.status(statusCode).json({success: false, message})
}
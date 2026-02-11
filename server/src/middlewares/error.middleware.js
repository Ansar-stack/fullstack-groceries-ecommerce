
export const ErrorMiddleware = (err, req, res)=>{
    const status = err.statusCode || err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({
        success:false, 
        message
    })
}

export const ResponseMiddleware  = (req, res, next)=>{
    res.respond = function(statusCode = 200, message = "Success", resource = {}){
        res.status(statusCode).json({
            success: true, 
            message: message,
            data: resource
        })
    }

    next();
}
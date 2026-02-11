
// Error Handler
class AppError extends Error {
    constructor(statusCode, message = "Something Went Wrong"){
        super(message);
        this.success = false;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError
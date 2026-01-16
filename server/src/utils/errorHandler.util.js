// Custom Error Handler
class ErrorHandler extends Error{
    constructor(statusCode, message = "Something went wrong"){
        super(message), 
        this.statusCode = statusCode;
        this.success = false
    }
}
export default ErrorHandler

class ErrorHandler extends Error{
    constructor(statusCode, message){
        this.statusCode = statusCode;
        this.message = message;
    }
}
export default ErrorHandler
import { asyncHandler } from "../utils/asyncHandler.util.js";

export const verifyUser = (req, res, next)=>{
    res.respond(200, "User verified successfully");
};

// Foggot password 
export const forgetPassword = asyncHandler(async (req, res, next)=>{
    
})
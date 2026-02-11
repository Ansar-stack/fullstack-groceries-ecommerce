import { asyncHandler } from "./asyncHandler.util.js";
import jwt from 'jsonwebtoken'
// Access token generator
export const generateAccessToken = (payload)=>{
    return jwt.sign({payload}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "59m"
    });
}

// Refresh token generator
export const generateRefreshToken = (payload)=>{
    return jwt.sign({payload}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '29d'
    });
}
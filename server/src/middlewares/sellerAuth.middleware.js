import { Seller } from "../models/seller.model";
import ErrorHandler from "../utils/errorHandler.util.js";
import jwt from 'jsonwebtoken'
import { generateRefreshToken } from "../utils/genToken.util.js";
import { sentTokenToClient } from "../utils/sentTokenToClient.util.js";
// Seller jwt authentication middleware
export const sellerAuthMiddleware = async(req, res, next) => {
  const { sellerAccToken, sellerRefToken } = req.cookies;
  if (!sellerAccToken && !sellerRefToken)
    return next(new ErrorHandler(401, "Unauthorized"));
  if (sellerAccToken) {
    // Validate the refresh token
    try {
        const payload = jwt.verify(sellerAccToken, process.env.REFRESH_TOKEN_SECRET);
        const sellerFound = await Seller.findOne(payload.id);
        if(!sellerFound)return new ErrorHandler(401, "Invalid access token");
        req.sellerId = payload.id;
        next();
    } catch (error) {
        // Skip and check the refresh token in DB
    }
  }
  // Check the refresh token in DB
  const sellerFound = await Seller.findOne({refreshToken: sellerRefToken});
  if(!sellerFound)return next(new ErrorHandler(401, 'Invalide refresh token'));
  // Validate the seller refresh token 
  try {
    const payload = jwt.verify(sellerRefToken, process.env.REFRESH_TOKEN_SECRET);
    if(payload.id !== sellerFound.id)return next(new ErrorHandler(401, 'Invalid refresh token'));
    const newSellerAccessToken = generateRefreshToken(sellerFound.id);
    sentTokenToClient('sellerAccToken', newSellerAccessToken); // Sent token to client
    req.sellerId = userFound.id;
    next()
  } catch (error) {
    return next(new ErrorHandler(401, 'Invalid or expire refresh token'));
  }
};

import { Seller } from "../models/seller.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import ErrorHandler from "../utils/errorHandler.util.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/genToken.util.js";
import { sentTokenToClient } from "../utils/sentTokenToClient.util.js";

// Register the seller
export const registerSeller = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  // Check the email if it exists already in DB
  const sellerFound = await Seller.findOne({ email });
  if (sellerFound) return next(new ErrorHandler(400, "Email already exists"));
  // Register seller in DB
  const seller = await Seller.create({ name, email, password });
  // Generate Tokens
  const accessToken = generateAccessToken(seller.id);
  const refreshToken = generateRefreshToken(seller.id);
  // Save refresh token in DB
  seller.refreshToken = refreshToken;
  seller.save();
  // Sent token to client cookei both
  sentTokenToClient("sellerAccToken", accessToken, res);
  sentTokenToClient("sellerRefToken", refreshToken, res);
  res.respond(201, "Seller register successfully", { seller: seller.name });
});

// login the seller
export const loginSeller = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Check email in DB
  const sellerFound = await Seller.findOne({ email });
  if (!sellerFound) return next(new ErrorHandler(400, "Email does not exists"));
  // Compare the password
  const isPasswordMatch = await sellerFound.comparePassword(password);
  if (!isPasswordMatch)
    return next(new ErrorHandler(400, "Incorrect password"));
  // Generate Tokens
  const accessToken = generateAccessToken(sellerFound.id);
  const refreshToken = generateRefreshToken(sellerFound.id);
  // Save refresh token in DB
  sellerFound.refreshToken = refreshToken;
  sellerFound.save();
  // Sent token to client cookei both
  sentTokenToClient("sellerAccToken", accessToken, res);
  sentTokenToClient("sellerRefToken", refreshToken, res);
  res.respond(200, 'Seller logged in successfully', {seller: sellerFound.name});
});

// Logout the seller
export const logoutSeller = asyncHandler(async (req, res, next) => {
  res.clearCookie("sellerAccToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
  });
  res.clearCookie("sellerRefToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
  });
  res.respond(200, "Logged out successfully");
});

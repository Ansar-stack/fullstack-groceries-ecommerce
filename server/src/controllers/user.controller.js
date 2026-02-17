import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.util.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokens.util.js';
import { sentTokenToClient } from '../utils/sentTokenToClient.util.js';
import AppError  from '../utils/AppError.util.js';

// Helper: create a user (for both user & seller)
const createUser = async ({ name, email, password, role = 'user' }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError(400, "Email already exists"); // generic message

  const user = await User.create({ name, email, password, role });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  // Store refresh token in DB
  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

// Register user
export const handleRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const { user, accessToken, refreshToken } = await createUser({ name, email, password });

  // Send tokens in cookies
  sentTokenToClient('acc_token', accessToken, res);
  sentTokenToClient('ref_token', refreshToken, res);

  res.respond(201, "User registered successfully");
});

// Register seller
export const handleSellerRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const { user, accessToken, refreshToken } = await createUser({ name, email, password, role: 'seller' });

  // Send tokens in cookies
  sentTokenToClient('acc_token', accessToken, res);
  sentTokenToClient('ref_token', refreshToken, res);

  res.respond(201, "Seller registration submitted for approval");
});

// Login
export const handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new AppError(400, "Invalid credentials"); // generic message
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  user.refreshToken = refreshToken;
  await user.save();

  sentTokenToClient('acc_token', accessToken, res);
  sentTokenToClient('ref_token', refreshToken, res);

  res.respond(200, "User logged in successfully");
});

// Logout
export const handleLogout = asyncHandler(async (req, res) => {
  res.clearCookie('acc_token', { httpOnly: true });
  res.clearCookie('ref_token', { httpOnly: true });
  res.respond(200, "User logged out successfully");
});

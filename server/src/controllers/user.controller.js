import { User } from '../models/user.model.js';
import {asyncHandler} from '../utils/asyncHandler.util.js'
import {generateAccessToken, generateRefreshToken} from '../utils/tokens.util.js'
import {sentTokenToClient} from '../utils/sentTokenToClient.util.js'
// Register a new user 
export const handleRegister = asyncHandler(async (req, res, next)=>{
    const {name, email, password} = req.body;
    // Check the email if it exists
    const userFound = await User.findOne({email});
    if(userFound)return res.respond(400, "Email already exists");
    // register the user
    const user = await User.create({name, email, password});
    // Generate the access and refresh token
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    // Store the refresh token in db
    user.refreshToken = refreshToken
    await user.save();
    // Sent access token to client
    sentTokenToClient('acc_token', accessToken, res);
    sentTokenToClient('ref_token', refreshToken, res);
    res.respond(201, "User registered successfully");
});
// Logged in the user
export const handleLogin = asyncHandler(async (req, res, next)=>{
    const {email, password} = req.body;
    const userFound = await User.findOne({email});
    if(!userFound)return res.respond(400, "Email does not exists");
    const isPasswordMatch = userFound.comparePassword(password);
    if(!isPasswordMatch)return res.respond(400, "Incorrect password");
     // Generate the access and refresh token
    const accessToken = generateAccessToken(userFound.id);
    const refreshToken = generateRefreshToken(userFound.id);
    // Store the refresh token in db
    userFound.refreshToken = refreshToken
    await userFound.save();
    // Sent access token to client
    sentTokenToClient('acc_token', accessToken, res);
    sentTokenToClient('ref_token', refreshToken, res);
    res.respond(201, "User Logged in successfully");
});

// Logout the user
export const handleLogout = asyncHandler(async (req, res)=>{
    res.clearCookie('acc_token');
    res.clearCookie('ref_token');
    res.respond(200, "User logged out successfully");
});

// Register a new seller
export const handleSellerRegister = asyncHandler(async (req, res, next)=>{
    const {name, email, password} = req.body;
    // Check the email if it exists
    const userFound = await User.findOne({email});
    if(userFound)return res.respond(400, "Email already exists");
    // register the user
    const user = await User.create({name, email, password, role: "seller"});
    // Generate the access and refresh token
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    // Store the refresh token in db
    user.refreshToken = refreshToken
    await user.save();
    // Sent access token to client
    sentTokenToClient('acc_token', accessToken, res);
    sentTokenToClient('ref_token', refreshToken, res);
    res.respond(201, "Added successfully seller for approvel");
});

import { User } from "../models/user.model.js";
import { asyncHanlder } from "../utils/asyncHandler.utils.js"
import ErrorHandler from "../utils/errorHanlder.util.js";

// Handle register 
export const handleRegister = asyncHanlder(async (req, res, next)=>{
    const {name, email, password} = req.body;
    // Check does email exist
    const userFound = await User.findOne({email});
    if(userFound)return next(new ErrorHandler(400, 'Email already exists'));
    // Register a new user in DB
    const user = await User.create({name, email, password});
    // Generate tokens 
    res.respond(201, "User register successfully", {user: user.name});
})

// Handle Login
export const handleLogin = async (req, res, next)=>{
    const {email, password} = req.body;
    // Check email in DB
    const userFound = await User.findOne({email});
    if(!userFound)return next(new ErrorHandler(400, 'Email does not exists'));
    // Compare password 
    const isMatchPassword = await userFound.comparePassword(password);
    if(!isMatchPassword)return next(new ErrorHandler(400, 'Incorrect password'));
    // Generate the Tokens

}

// Handle Logout
export const handleLogout = (req, res)=>{

}
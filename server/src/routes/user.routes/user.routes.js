import express from 'express'
import { handleLogin, handleLogout, handleRegister, handleSellerRegister } from '../../controllers/user.controller.js';
import { UserLoginValidations, UserValidations } from '../../validators/user.validator.js';
import { validationHandlerMiddleware } from '../../middlewares/validationHandlerMiddleware.js';
const userRouter = express.Router();

userRouter.post('/register', UserValidations, validationHandlerMiddleware, handleRegister)
userRouter.post('/login', UserLoginValidations, validationHandlerMiddleware, handleLogin);
userRouter.get('/logout', handleLogout);
userRouter.post('/apply-seller', UserValidations, validationHandlerMiddleware, handleSellerRegister);
export default userRouter;
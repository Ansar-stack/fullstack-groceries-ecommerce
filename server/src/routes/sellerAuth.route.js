import express from 'express'
import { loginValidations, registerValidations } from '../validators/auth.validator.js';
import { HandleValidationError } from '../middlewares/validationError.middleware.js';
import { loginSeller, logoutSeller, registerSeller } from '../controllers/sellerAuth.controller.js';
import { sellerAuthMiddleware } from '../middlewares/sellerAuth.middleware.js';
const sellerAuthRouter = express.Router();
sellerAuthRouter.post('/register', registerValidations, HandleValidationError, registerSeller);
sellerAuthRouter.post('/login', loginValidations, HandleValidationError, loginSeller);
sellerAuthRouter.get('/logout', sellerAuthMiddleware, logoutSeller)
export default sellerAuthRouter
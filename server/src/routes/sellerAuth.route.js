import express from 'express'
import { loginValidations, registerValidations } from '../validators/auth.validator.js';
import { HandleValidationError } from '../middlewares/validationError.middleware.js';
import { loginSeller, registerSeller } from '../controllers/sellerAuth.controller.js';
const sellerAuthRouter = express.Router();
sellerAuthRouter.post('/register', registerValidations, HandleValidationError, registerSeller);
sellerAuthRouter.post('/login', loginValidations, HandleValidationError, loginSeller);

export default sellerAuthRouter
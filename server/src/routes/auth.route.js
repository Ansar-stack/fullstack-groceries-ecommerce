import expres from 'express'
import { handleLogin, handleRegister } from '../controllers/auth.controller.js';
import { HandleValidationError } from '../middlewares/validationError.middleware.js';
import { loginValidations, registerValidations } from '../validators/auth.validator.js';
const authRouter = expres.Router();
authRouter.post('/register', registerValidations, HandleValidationError, handleRegister)
authRouter.post('/login', loginValidations, HandleValidationError, handleLogin)
export default authRouter
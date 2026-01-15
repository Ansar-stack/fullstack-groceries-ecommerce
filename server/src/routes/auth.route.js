import expres from 'express'
import { handleRegister } from '../controllers/auth.controller.js';
import { HandleValidationError } from '../middlewares/validationError.middleware.js';
import { registerValidations } from '../validators/auth.validator.js';
const authRouter = expres.Router();
authRouter.post('/register', registerValidations, HandleValidationError, handleRegister)

export default authRouter
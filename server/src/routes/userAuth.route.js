import expres from 'express'
import { loginUser, logoutUser, registerUser } from '../controllers/userAuth.controller.js';
import { HandleValidationError } from '../middlewares/validationError.middleware.js';
import { loginValidations, registerValidations } from '../validators/auth.validator.js';
import { userAuthMiddleware } from '../middlewares/userAuth.middleware.js';
const userAuthRouter = expres.Router();
userAuthRouter.post('/register', registerValidations, HandleValidationError, registerUser);
userAuthRouter.post('/login', loginValidations, HandleValidationError, loginUser);
userAuthRouter.get('/logout', userAuthMiddleware, logoutUser)
export default userAuthRouter
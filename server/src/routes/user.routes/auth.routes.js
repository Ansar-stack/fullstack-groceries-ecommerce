import express from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { verifyUser } from '../../controllers/auth.controller.js';
const authRouter = express.Router();

authRouter.get('/verify', authMiddleware, verifyUser);

export default authRouter;

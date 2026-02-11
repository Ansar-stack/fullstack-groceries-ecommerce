import express from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';
const productRouter = express.Router();

productRouter.post('/add', authMiddleware, authorize('seller'),  (req, res)=>res.respond(200, "Product Added successfully"));

export default productRouter;
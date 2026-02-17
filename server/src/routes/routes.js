import productCategoryRouter from "./product.routes.js/product.category.routes.js";
import productRouter from "./product.routes.js/product.routes.js";
import authRouter from "./user.routes/auth.routes.js";
import userRouter from "./user.routes/user.routes.js";
import express from 'express';
const router = express.Router();

// User Routes
router.use('/api/v1/user/', userRouter);
router.use('/api/v1/auth/', authRouter);

// Product Route
router.use('/api/v1/products/', productRouter)
// Product category route
router.use('/api/v1/products/category', productCategoryRouter);
export default router
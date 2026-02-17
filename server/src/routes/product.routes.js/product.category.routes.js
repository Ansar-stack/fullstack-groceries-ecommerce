import express from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { authorize } from '../../middlewares/role.middleware.js';
import { addCategory, deleteCategory, fetchCategories, updateCategory } from '../../controllers/product.category.controller.js';
const productCategoryRouter = express.Router();

productCategoryRouter.post('/add', authMiddleware, authorize('admin'), addCategory);
productCategoryRouter.get('/all', authMiddleware, authorize('admin', 'seller'), fetchCategories);
productCategoryRouter.delete('/delete', authMiddleware, authorize('admin'), deleteCategory);
productCategoryRouter.put('/update', authMiddleware, authorize('admin'), updateCategory);
export default productCategoryRouter
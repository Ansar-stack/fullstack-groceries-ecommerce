import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import {
  addProduct,
  allProducts,
  sellerProducts,
} from "../../controllers/product.controller.js";
import { upload } from "../../configs/multer.configs/multer.configs.js";
import { isSellerApproved } from "../../middlewares/isSellerProved.middleware.js";
import { productValidations } from "../../validators/product.validator.js";
import { validationHandlerMiddleware } from "../../middlewares/validationHandlerMiddleware.js";
const productRouter = express.Router();

productRouter.post(
  "/add",
  authMiddleware,
  authorize("seller"),
  isSellerApproved,
  upload.array("images", 5),
  productValidations,
  validationHandlerMiddleware,
  addProduct,
);
productRouter.get(
  "/seller",
  authMiddleware,
  authorize("seller"),
  sellerProducts,
);
productRouter.get("/all", authMiddleware, authorize("admin"), allProducts);

export default productRouter;

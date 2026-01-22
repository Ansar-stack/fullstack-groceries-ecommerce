import express from "express";
import { addressValidations } from "../validators/address.validator.js";
import { HandleValidationError } from "../middlewares/validationError.middleware.js";
import { addAddress } from "../controllers/address.controller.js";
import { userAuthMiddleware } from "../middlewares/userAuth.middleware.js";
const addressRouter = express.Router();
addressRouter.post(
  "/add",
  addressValidations,
  HandleValidationError,
  addAddress,
);

export default addressRouter

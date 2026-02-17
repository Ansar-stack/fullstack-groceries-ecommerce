import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [
        {
          name: {
            type: String,
            ref: "Product",
            required: true,
          },
          category: {
            type: mongoose.Types.ObjectId,
            ref: "ProductCategory",
          },
        },
      ],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: mongoose.Types.ObjectId,
      ref: "Address",
    },
    status: {
      type: String,
      enum: ["processing", "pending", "shipped", "done", "cancelled"],
    },
    paymentType: {
      type: String,
      default: "COD",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);

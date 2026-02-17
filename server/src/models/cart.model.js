import mongoose from "mongoose";
const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    items: {
      type: [cartItemSchema],
    },
    totelItems: {
        type: Number, 
        default: 0
    },
    totelPrice: {
        type: Number, 
        default: 0
    }
  },
  { timestamps: true },
);

export const Cart = mongoose.model("Cart", cartSchema);

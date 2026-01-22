import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    catagory: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "Seller"
    }
  },
  { timestamps: true },
);
export const Product = mongoose.model('Product', productSchema);
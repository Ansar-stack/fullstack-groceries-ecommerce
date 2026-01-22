import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    items: {
        type: mongoose.Types.ObjectId,
        required: true, 
        ref: "Product"
    }
}, {timestamps: true});

export const Cart = mongoose.model('Cart', cartSchema);
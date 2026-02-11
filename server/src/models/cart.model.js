import mongoose from 'mongoose'
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }, 
    items: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    }
}, {timestamps: true});

export const Cart = mongoose.model('Cart', cartSchema);

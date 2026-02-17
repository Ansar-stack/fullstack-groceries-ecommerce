import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User", 
        required: true
    },
    name: {
        type: String, 
        required: true
    }, 
    description:{
        type: String, 
        required: true
    },
    category: {
        type: String, 
        required:true
    }, 
    price: {
        type: Number, 
        required: true
    },
    offerPrice: {
        type: Number, 
        required: true
    },
    images: {
        type: Array,   // Base64 of image because cloudinary is not available in our country
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean, 
        default: false
    }

}, {timestamps: true});


export const Product = mongoose.model('Product', productSchema);
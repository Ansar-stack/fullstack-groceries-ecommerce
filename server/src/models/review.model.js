import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    rating: {
        type: Number, 
        min: 1, 
        max: 5
    },
    comment: {
        type: String
    }
}, {timestamps: true});

export const Review = mongoose.model('Review', reviewSchema);

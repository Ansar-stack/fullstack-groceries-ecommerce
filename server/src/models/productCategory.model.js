import mongoose from 'mongoose';

const productCategorySchema  = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String
    }
}, {timestamps: true});

export const ProductCetagory = mongoose.model('ProductCategory', productCategorySchema)
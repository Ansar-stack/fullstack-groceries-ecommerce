import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String
    }, 
    email:{
        type: String, 
        required: true
    },
    street: {
        type: String, 
        required: true, 
    }, 
    city: {
        type: String, 
        required: true
    },
    zipCode: {
        type: Number, 
        required: true,
    },
    country: {
        type: String, 
        required: true
    },
    phone: {
        type: Number, 
        required: true
    }
}, {timestamps: true});

export const Address = mongoose.model('Address', addressSchema);



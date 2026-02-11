import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String
    }, 
    email: {
        type: String, 
        required: true
    },
    street: {
        type: String, 
        required: true
    },
    city: {
        type: String, 
        required: true
    }, 
    zipCode: {
        type: String,
        required: true
    }, 
    country: {
        type: String, 
        required: true
    }, 
    isDeleted: {
        type: Boolean, 
        default: false
    },
    phone: {
        type: String, 
        required: true
    }
}, {timestamps: true});

export const Address = mongoose.model("Address", addressSchema);
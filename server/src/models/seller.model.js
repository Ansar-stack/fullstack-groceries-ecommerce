import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const sellerSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    }, 
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    }, 
    refreshToken: String,
    isEmailVarified: String, 
    resetPasswordToken: String,
    resetPasswordExpired: Date, 
    varificationCode: Number, 
    varificationCodeExpire: Date
});


// Hash password before saving
sellerSchema.pre("save", async function () {
  const seller = this;
  if (!seller.isModified("password")) return;
  // Hash the password
  const hashPassword = await bcrypt.hash(seller.password, 10);
  seller.password = hashPassword;
});

// Compare password method
sellerSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const Seller = mongoose.model("Seller", sellerSchema);

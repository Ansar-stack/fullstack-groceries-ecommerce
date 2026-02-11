import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "seller", "admin"],
    },
    isDeleted: {
        type: Boolean, 
        default: false
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpire: {
      type: Date,
    },
    emailVerificationCode: Number,
    emailVerfiicationCOdeExpire: Date,
    refreshToken: String,
    isSellerApproved: {
      type: String,
      enum: ["none", "pending", "approved", "rejected"], 
      default: "none"
    },
  },
  { timestamps: true },
);

// Encrypt the password of user before saving
userSchema.pre('save', async function(){
  const user = this;
  if(!user.isModified('password'))return
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword){
      return await bcrypt.compare(this.password, candidatePassword);
}

export const User = mongoose.model("User", userSchema);
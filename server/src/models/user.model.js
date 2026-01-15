import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: String, 
    passwordToken: String
  },
  { timestamps: true },
);

// Hash password before saving
userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) return;
  // Hash the password
  const hashPassword = await bcrypt.hash(user.password, 10);
  user.password = hashPassword;
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);

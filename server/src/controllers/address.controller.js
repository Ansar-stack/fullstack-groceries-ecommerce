import { Address } from "../models/address.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
// Add the address
export const addAddress = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { firstName, lastName, email, street, city, country,zipCode,  phone } = req.body;
  await Address.create({
    userId,
    firstName,
    lastName,
    email,
    street,
    city,
    zipCode,
    country,
    phone,
  });
  res.respond(201, "Address added successfully");
});

// Update the address
export const updateAddress = asyncHandler(async (req, res) => {
     const userId = req.userId;
     await Address.findOneAndUpdate({userId}, req.body);
     res.respond(200, "Address updated successfully");
});
// Delete the address
export const deleteAddress = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const deleted = await Address.findOneAndDelete({userId});
  console.log(deleted);
  if(deleted)res.respond(200, "Address deleted successfully");
});

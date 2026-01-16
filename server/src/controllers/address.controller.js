import {asyncHandler} from '../utils/asyncHandler.util.js'
// Add the address
export const addAddress = asyncHandler(async (req, res)=>{
});

// Update the address
export const updateAddress = asyncHandler(async (req, res)=>{
})
// Delete the address
export const deleteAddress = asyncHandler(async (req, res)=>{
     res.status(201).json({success: true, message: "Delete Address"});
})
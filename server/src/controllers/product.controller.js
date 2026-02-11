import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

// Add the new product
export const addProduct = asyncHandler(async (req, res)=>{
    const {name, description, category, price, offerPrice} = req.body;
    const image = "ads;fljasdl;fjasd;"  // Base64 of Image
    // Check the if the product already exists
    const productFound = await Product.findOne({name});
    if(productFound)return res.respond(400, "Product already exists");
    // Create the product 
    const product = await Product.create({name, description, category, price, offerPrice});
    res.respond(200, "Product added successfully", product);
});


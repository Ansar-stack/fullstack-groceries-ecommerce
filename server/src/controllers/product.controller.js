import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

export const addProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price, offerPrice } = req.body;
  const owner = req.user.id;
  // Check images
  if (!req.files || req.files.length === 0) {
    return res.respond(400, "At least one image is required");
  }

  if (req.files.length > 5) {
    return res.respond(400, "Maximum 5 images allowed");
  }

  // 3️⃣ Check if product already exists
  const productFound = await Product.findOne({ name });
  if (productFound) {
    return res.respond(400, "Product already exists");
  }
  const images = req.files.map((file) => {
    const base64 = file.buffer.toString("base64");
    return `data:${file.mimetype};base64,${base64}`;
  });

  const product = await Product.create({
    name,
    description,
    category,
    price: Number(price),
    offerPrice: offerPrice,
    images,
    owner,
    description
  });

  return res.respond(201, "Product added successfully", product);
});
// Deltete the product by id
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) return res.respond(400, "Product not found");
  res.respond(200, "Product deleted successfully", deletedProduct);
});
// Update the products
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price, offerPrice } = req.body;
  const images = []; // Base64 of Images
  console.log(req.files);
  const { id } = req.params;
  await Product.findByIdAndUpdate(id, {
    name,
    description,
    category,
    price,
    offerPrice,
    images,
  });
  res.respond(200, "Product update successfully");
});
// Fetch the seller products
export const sellerProducts = asyncHandler(async (req, res)=>{
    const {id} = req.user;
    const products = await Product.find({id});
    res.respond(200, "Seller products fetch successfully", products);
});

// Fetch all product for admin
export const allProducts = asyncHandler(async (req, res)=>{
    const products = await Product.find({});
    res.respond(200, "Product fetch successfully", products);
});


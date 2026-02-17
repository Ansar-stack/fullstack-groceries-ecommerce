import { ProductCetagory } from '../models/productCategory.model.js';
import {asyncHandler} from '../utils/asyncHandler.util.js';
// Add the product category 
export const addCategory = asyncHandler(async (req, res)=>{
    const {name, description} = req.body;
    await ProductCetagory.create({name, description});
    res.respond(200, "Product category added successfully");    
});

// Fetch all the categories 
export const fetchCategories = asyncHandler(async (req, res)=>{
    const categories = await ProductCetagory.find();
    res.respond(200, "Category fetched successfully", categories);
});

// Delete category by id
export const deleteCategory = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    const deletedCategory = await ProductCetagory.findByIdAndDelete(id);
    if(!deletedCategory)return res.repond(400, "Category not found");
    res.respond(200, "Category deleted successfully", deletedCategory);
});

// Update the catgory 
export const updateCategory = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    const {name, description} = req.body;
    await ProductCetagory.findByIdAndUpdate(id, {name, description});
    res.respond(200, "Category update successfully");
});


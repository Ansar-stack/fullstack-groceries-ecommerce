import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const { id } = req.user;
  const product = await Product.findById(productId);
  if (!product) return res.respond(400, "Product not found");
  let cart = await Cart.findById({ user: id });
  if (!cart) {
    cart = new Cart({ user: id, items: [] });
  }
  const itemIndex = cart.itemsfindIndex(
    (item) => item.product.toString() === productId,
  );
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
      price: product.price,
    });
  }
  // Recalculate the totals
  cart.totelItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  await cart.save();
  res.respond(200, "Cart saved", cart);
});

// Remove the item from cart
export const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { id } = req.user;
  const cart = await Cart.findOne({
    user: id,
  });
  cart.items = cart.items.filter(items => item.product.toString !== productId);
  cart.totelItems = cart.items.reduce((acc, item)=> acc + item.quantity, 0);
  await cart.save();
  res.respond(200, "Cart removed", cart);
});
// Update the item in cart
export const updateCart = asyncHandler(async (req, res)=>{
    const {id} = user.id;
    const {productId} = req.params;
    const cart = await Cart.findOne({user: id});
    const item = cart.items.find(item =>item.product.toString()=== productId);
    item.quantity = quanity;
    cart.totelPrice = cart.items.reduce((acc, item)=> acc + item.quantity, 0);
    cart.totelItems = cart.items.reduce((acc, item)=>acc + item.quantity * item.price,0);
    await cart.save();
    res.repond(200, "Cart update successfully", cart);
});



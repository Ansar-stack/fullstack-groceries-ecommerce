import { Cart } from "../models/cart.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { Order } from "../models/order.model.js";

// Place the order
export const placeOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { shippingAddress, paymentMethod } = req.body;
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart || cart.items.length === 0)
    return res.status(400).json({ message: "Cart is empty" });
  let totalPrice = 0;
  const orderItems = [];
  for (let item of cart.items) {
    if (item.product.stock < item.quantity)
      res.respond(400, `Not enough stock for ${item.product.name}`);
    totalPrice += item.quantity * item.price;
    orderItems.push({
      product: item.product._id,
      name: item.product.name,
      price: item.price,
      quantity: item.quantity,
    });
  }
  const order = await Order.create({
    user: userId,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
  });
  for (let item of cart.items) {
    item.product.stock -= item.quantity;
    await item.product.save();
  }
  cart.items = [];
  cart.totelItems = 0;
  cart.totelPrice = 0;
  await cart.save();
  res.respond(201, "Order placed successfully", order);
});

// Get user orders
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({
    createdAt: -1,
  });
  res.respond(200, "", orders);
});

// Get a single order
export const getSingleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );
  if (!order) res.respoon(400, "Order not found");
  if (order.user._id.toString() !== req.user.id && req.user.role !== "admin")
    return res.status(403).json({ message: "Not authorized" });
  res.respond(200, "", order);
});
// GEt all orders
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  res.respond(200, "Fetched successfuly", {
    totalRevenue,
    count: orders.length,
    orders,
  });
});
// Update the order status admin only
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.respond(404, "Order not found");
  order.status = req.body.status;
  await order.save();
  res.respond(200, order);
});

// Cancel the order
export const cancelOrder = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "orderItems.product",
  );
  if (!order) res.respond(400, "Order not found");
  if (order.status !== "processing") res.respond(400, 'Order cannot be cancelled');
  for (let item of order.orderItems) {
    item.product.stock += item.quantity;
    await item.product.save();
  }
  order.orderStatus = "cancelled";
  await order.save();
  res.respond(200, "Order cancelled successfully", order);
};

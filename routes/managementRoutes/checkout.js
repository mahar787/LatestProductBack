const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
const Order = require("../../models/order.model.js");
const OrderItem = require("../../models/orderItem.model.js");
const Product = require("../../models/product.model.js");

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    let ids = [];

    for (const item of data.data.cartItems) {
      let product = await Product.findById(item.id);
      if (!product) {
        return res
          .status(400)
          .json({ message: `Product ${item.name} not found` });
      }

      // Check if enough stock is available
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for product: ${product.productName}`,
        });
      }

      // Reduce stock quantity
      product.stock -= item.quantity;
      await product.save();

      let newOrderItem = new OrderItem({
        productId: new mongoose.Types.ObjectId(item.id),
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        color: item.color,
        size: item.size,
      });

      let newSavedOrderItem = await newOrderItem.save(); // Await the save operation
      ids.push(newSavedOrderItem._id); // Now _id will be available
    }

    if (data.data.paymentMethod === "cash") {
      const newOrder = new Order({
        contact: data.data.contact,
        country: data.data.country,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        address: data.data.address,
        apartment: data.data.apartment,
        city: data.data.city,
        postalCode: data.data.postalCode,
        paymentMethod: data.data.paymentMethod,
        items: ids.map((id) => ({ orderItemId: id })),
        totalPrice: data.data.totalAmount,
        deliveryCharges: data.data.deliveryCharges,
      });
      let newSavedOrder = await newOrder.save();
      res.json({
        message: `Your Order Placed Successfully! and Your Order Id is ${newSavedOrder._id}`,
        cash: true,
      });
    } else {
      const newOrder = new Order({
        contact: data.data.contact,
        country: data.data.country,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        address: data.data.address,
        apartment: data.data.apartment,
        city: data.data.city,
        postalCode: data.data.postalCode,
        paymentMethod: data.data.paymentMethod,
        items: ids.map((id) => ({ orderItemId: id })),
        totalPrice: data.data.totalAmount,
        deliveryCharges: data.data.deliveryCharges,
      });
      let newSavedOrder = await newOrder.save();

      res.json({ id: newSavedOrder._id, card: true });
    }
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

module.exports = router;

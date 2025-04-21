const express = require("express");
const router = express.Router();
const Product = require("../models/product.model.js");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: "Invalid product IDs array" });
    }

    // Filter out invalid ObjectIds
    const validObjectIds = [...new Set(ids)]
      .filter((id) => mongoose.Types.ObjectId.isValid(id)) // ✅ Only valid IDs
      .map((id) => new mongoose.Types.ObjectId(id));

    // Fetch unique products from DB
    const products = await Product.find({ _id: { $in: validObjectIds } });

    // Create a map of products
    const productMap = products.reduce((acc, product) => {
      acc[product._id.toString()] = product;
      return acc;
    }, {});

    // Maintain duplicate IDs in response
    const finalProducts = ids
      .map((id) => productMap[id] || null) // Map original order
      .filter(Boolean); // Remove null values

    res.status(200).json({ success: true, data: finalProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Product = require("../models/product.model.js");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  try {
    const { id } = req.body;
    const productId = new mongoose.Types.ObjectId(id);

    // Find the requested product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find other products in the same category (excluding the current product)
    const otherProducts = await Product.find({
      category: product.category, // Same category
      _id: { $ne: productId }, // Exclude the current product
    })
      .limit(8) // Limit to 8 products
      .exec();

    res.status(200).json({ data: product, otherProducts });
  } catch (error) {
    console.error("Error in fetching product", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

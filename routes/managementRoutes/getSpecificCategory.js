const express = require("express");
const router = express.Router();
const Category = require("../../models/category.model.js");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  try {
    const { categoryId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ error: "Invalid categoryId" });
    }

    const product = await Category.findById(categoryId).populate(
      "parentCategory"
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      product,
      collection: product.parentCategory || null,
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ error: "Failed to fetch product details" });
  }
});
module.exports = router;

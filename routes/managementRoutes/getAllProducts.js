const express = require("express");
const router = express.Router();
const Product = require("../../models/product.model.js");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 30;
    const skip = (page - 1) * limit;
    const categoryId = req.query.categoryId; // Get collection ID from query params

    let query = {};
    if (categoryId) {
      query.category = categoryId; // Filter by collection
    }

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query).skip(skip).limit(limit);

    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});
module.exports = router;

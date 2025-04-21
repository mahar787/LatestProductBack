const express = require("express");
const router = express.Router();
const Category = require("../models/category.model");
router.get("/", async (req, res) => {
  try {
    let categories = await Category.find({ parentCategory: null });
    res.status(200).json({ data: categories });
  } catch (error) {
    console.log("error in fetching collections", error);
    res.status(500);
  }
});

module.exports = router;

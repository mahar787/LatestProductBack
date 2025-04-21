const express = require("express");
const router = express.Router();
const Category = require("../../models/category.model.js");
const Product = require("../../models/product.model.js");
const cloudinary = require("cloudinary").v2; // Cloudinary for image handling
const mongoose = require("mongoose");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_DATABASE,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
router.post("/", async (req, res) => {
  try {
    let { itemId, model } = req.body.data;
    if (model == "product") {
      let newId = new mongoose.Types.ObjectId(itemId);
      let product = await Product.findById(newId);
      if (!product) {
        return res.status(400).json({ msg: "No Product Found!" });
      }

      // Delete images from Cloudinary
      for (let image of product.images) {
        await cloudinary.uploader.destroy(image.publicId);
      }

      let deletedItem = await Product.findByIdAndDelete(newId);
      if (!deletedItem) {
        return res.status(400).json({ msg: "No Product Found!" });
      }
      return res.status(200).json({ msg: "Product Deleted Successfully!" });
    } else if (model == "category") {
      let newId = new mongoose.Types.ObjectId(itemId);
      let category = await Category.findById(newId);
      if (!category) {
        return res.status(400).json({ msg: "No Category Found!" });
      }

      // Delete category image from Cloudinary
      await cloudinary.uploader.destroy(category.image.publicId);

      // Delete category from database
      let deletedItem = await Category.findByIdAndDelete(newId);
      if (!deletedItem) {
        return res.status(400).json({ msg: "No Category Found!" });
      }
      return res.status(200).json({ msg: "Category Deleted Successfully!" });
    }
  } catch (error) {
    console.log("Error in deleting product", error);
    res.status(500).json({ msg: "Error in deleting product in server side!" });
  }
});

module.exports = router;

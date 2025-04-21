const express = require("express");
const router = express.Router();
const Category = require("../../models/category.model.js");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const mongoose = require("mongoose");
const upload = multer({ storage: multer.memoryStorage() });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_DATABASE,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { categoryId, name, parentCategory } = req.body;
    let id = new mongoose.Types.ObjectId(categoryId);
    const category = await Category.findById(id);

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    // Update name and parentCategory if provided
    if (name) category.name = name;
    if (parentCategory) category.parentCategory = parentCategory;

    // If new image is provided, replace the existing one
    if (req.file) {
      // Delete old image from Cloudinary
      await cloudinary.uploader.destroy(category.image.publicId);

      // Upload new image
      const result = await cloudinary.uploader.upload(
        req.file.buffer.toString("base64"),
        {
          folder: "categories",
        }
      );

      category.image = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    await category.save();
    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;

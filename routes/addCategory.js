const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Category = require("../models/category.model.js");
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_DATABASE,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // ✅ 10MB limit (10 * 1024 * 1024 bytes)
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    let { name, parentCategory } = req.body;
    if (parentCategory == "Select Category") {
      parentCategory = null;
    }
    // Upload File (Image or PDF) to Cloudinary
    cloudinary.uploader
      .upload_stream(
        {
          folder: "categories",
          resource_type: "auto", // Supports both images & PDFs
        },
        async (error, uploadedFile) => {
          if (error) return res.status(500).json({ error: "Upload Failed" });

          // Convert PDF to PNG (if PDF is uploaded)
          let imageUrl = uploadedFile.secure_url;
          if (uploadedFile.format === "pdf") {
            imageUrl = imageUrl.replace(".pdf", ".png") + "?pg=1&dpi_300";
          }

          // Save to MongoDB
          let savedImage = { url: imageUrl, publicId: uploadedFile.public_id };
          const newCollection = new Category({
            name,
            image: savedImage,
            parentCategory,
          });

          await newCollection.save();
          res.status(200).json({ message: "Category Added Successfully!" });
        }
      )
      .end(req.file.buffer);
  } catch (err) {
    console.log("Error in adding category", err);
    res.status(500).json({ message: "Server error. Try again later!" });
  }
});

module.exports = router;

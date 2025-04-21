const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productName: { type: String, required: true, index: true },
  descriptionPoints: [{ type: String }],
  brandName: { type: String },
  originalPrice: { type: Number },
  discountedPrice: { type: Number, required: true },
  stock: { type: Number, required: true },
  allowBackorders: {
    type: String,
    default: false,
  },
  colors: [{ type: String, default: null }],
  sizes: [{ type: String, default: null }],
  showStockToUser: {
    type: String,
    default: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  images: [
    {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
  ],
  sizeType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

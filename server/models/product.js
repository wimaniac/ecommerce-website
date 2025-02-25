const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }, // 📝 Mô tả ngắn
  details: { type: String, required: true }, // 📝 Thông tin chi tiết sản phẩm
  brand: { type: String, default: "" },
  price: { type: Number, default: 0.0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  categoryAncestors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }], // 🏷️ Lưu danh mục cha & con
  countInStock: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  numReview: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  image: { type: String, default: "" }, // Ảnh chính của sản phẩm
  images: [{ type: String }], // Danh sách ảnh phụ
  dateCreate: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }, // 📝 Mô tả ngắn
  details: { type: String, required: true }, // 📝 Thông tin chi tiết sản phẩm
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" }, // Reference to Brand model
  price: { type: Number, default: 1000 }, // Giá mặc định là 1000
  categoryAncestors: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  ], // 🏷️ Lưu danh mục cha & con
  countInStock: { type: Number, default: 1 }, // Số lượng mặc định là 1
  rating: { type: Number, default: 0 },
  sale: { type: Number, default: 0 }, // % giảm giá
  numReview: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  image: { type: String, required: true }, // Ảnh chính của sản phẩm
  images: [{ type: String }], // Danh sách ảnh phụ
  dateCreate: { type: Date, default: Date.now },
  comment: { type: String, default: "Chưa có bình luận" },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

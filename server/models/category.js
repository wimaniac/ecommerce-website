const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Thêm unique: true để đảm bảo tên danh mục không trùng lặp
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Tham chiếu đến danh mục cha
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }], // Tham chiếu đến chính nó
});

module.exports = mongoose.model("Category", categorySchema);

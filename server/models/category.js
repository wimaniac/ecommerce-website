const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }] // Tham chiếu đến chính nó
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

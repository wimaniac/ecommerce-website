const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }] // Tham chiếu đến chính nó
});

module.exports = mongoose.model("Category", categorySchema);

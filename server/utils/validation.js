const Category = require("../models/category");

async function validateCategories(categories, res) {
  try {
    const existingCategories = await Category.find({ _id: { $in: categories } });
    if (existingCategories.length !== categories.length) {
      res.status(400).json({ success: false, message: "Danh mục không hợp lệ" });
      return false;
    }
    return true;
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi kiểm tra danh mục", error: error.message });
    return false;
  }
}

module.exports = { validateCategories };

const { Category } = require("../models/category.js");
const express = require("express");
const router = express.Router();

// Lấy tất cả danh mục
router.get("/", async (req, res) => {
  try {
    const categoryList = await Category.find();
    res.status(200).json(categoryList);
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi server", error: err });
  }
});

// Lấy danh mục theo ID
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Không tìm thấy danh mục" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi server", error: err });
  }
});

// Thêm danh mục mới
router.post("/", async (req, res) => {
  try {
    let category = new Category({
      name: req.body.name
    });
    category = await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ success: false, message: "Không thể tạo danh mục", error: err });
  }
});

// Cập nhật danh mục theo ID
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true } // Trả về bản ghi đã cập nhật
    );
    if (!category) {
      return res.status(404).json({ success: false, message: "Không tìm thấy danh mục" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi cập nhật danh mục", error: err });
  }
});

// Xóa danh mục theo ID
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Không tìm thấy danh mục" });
    }
    res.status(200).json({ success: true, message: "Xóa danh mục thành công" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi khi xóa danh mục", error: err });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Brand = require("../models/brand");

// Thêm thương hiệu mới
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const brand = new Brand({ name });
    await brand.save();
    res.status(201).json(brand);
  } catch (err) {
    res.status(500).json({ success: false, message: "Không thể tạo thương hiệu", error: err.message });
  }
});

// Lấy tất cả thương hiệu
router.get("/", async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
});

// Lấy thương hiệu theo ID
router.get("/:id", async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ success: false, message: "Không tìm thấy thương hiệu" });
    }
    res.status(200).json(brand);
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
});

// Cập nhật thương hiệu theo ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID không hợp lệ" });
    }

    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ success: false, message: "Không tìm thấy thương hiệu" });
    }

    brand.name = name;
    await brand.save();
    res.status(200).json({ success: true, message: "Cập nhật thương hiệu thành công", data: brand });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi khi cập nhật thương hiệu", error: err.message });
  }
});

// Xóa thương hiệu theo ID
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "ID không hợp lệ" });
    }

    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      return res.status(404).json({ success: false, message: "Không tìm thấy thương hiệu" });
    }

    res.status(200).json({ success: true, message: "Xóa thương hiệu thành công" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi khi xóa thương hiệu", error: err.message });
  }
});

module.exports = router;

const Category = require("../models/category.js"); // Import đúng model
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Lấy tất cả danh mục
router.get("/", async (req, res) => {
  try {
    const categoryList = await Category.find({
      _id: { $nin: await Category.distinct("subcategories") } // Loại bỏ danh mục con khỏi danh sách gốc
    }).populate("subcategories");
    if (!categoryList) {
      return res.status(404).json({ success: false, message: "Không tìm thấy danh mục" });
    }
    res.status(200).json(categoryList);
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
});



// Lấy danh mục theo ID
router.get("/:id", async (req, res) => {
  try {
    // Kiểm tra xem ID có hợp lệ không (tránh lỗi crash nếu ID sai format)
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "ID không hợp lệ" });
    }

    // Tìm danh mục theo ID và populate danh mục con
    const category = await Category.findById(req.params.id).populate("subcategories");

    if (!category) {
      return res.status(404).json({ success: false, message: "Không tìm thấy danh mục" });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
});


// Thêm danh mục mới
router.post("/", async (req, res) => {
  try {
    // Tạo danh mục con trước nếu có
    const subcategories = [];
    if (req.body.subcategories && req.body.subcategories.length > 0) {
      for (const sub of req.body.subcategories) {
        const subCategory = new Category({ name: sub.name });
        await subCategory.save();
        subcategories.push(subCategory._id); // Lưu ObjectId vào danh mục cha
      }
    }

    // Tạo danh mục cha
    let category = new Category({
      name: req.body.name,
      subcategories: subcategories, // Gán danh mục con dưới dạng ObjectId
    });

    category = await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ success: false, message: "Không thể tạo danh mục", error: err.message });
  }
});


// Cập nhật danh mục theo ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, subcategories } = req.body;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID không hợp lệ" });
    }

    // Tìm danh mục cha
    const parentCategory = await Category.findById(id);
    if (!parentCategory) {
      return res.status(404).json({ success: false, message: "Không tìm thấy danh mục cha" });
    }

    // Xử lý danh mục con
    let updatedSubcategories = [];

    for (const sub of subcategories) {
      let existingSubcategory = await Category.findOne({ name: sub.name });

      if (!existingSubcategory) {
        // Nếu danh mục con chưa tồn tại, tạo mới
        existingSubcategory = new Category({ name: sub.name, subcategories: [] });
        await existingSubcategory.save();
      }

      updatedSubcategories.push(existingSubcategory._id);
    }

    // Cập nhật danh mục cha
    parentCategory.name = name;
    parentCategory.subcategories = updatedSubcategories;
    await parentCategory.save();

    // Populate để lấy danh mục con đầy đủ
    const updatedCategory = await Category.findById(id).populate("subcategories");

    res.status(200).json({ success: true, message: "Cập nhật danh mục thành công", data: updatedCategory });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
});


// Xóa danh mục theo ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra ID hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID không hợp lệ" });
    }

    // Tìm danh mục cần xóa
    const categoryToDelete = await Category.findById(id);
    if (!categoryToDelete) {
      return res.status(404).json({ success: false, message: "Không tìm thấy danh mục" });
    }

    // Xóa danh mục khỏi danh mục cha (nếu có)
    await Category.updateMany(
      { subcategories: id },
      { $pull: { subcategories: id } }
    );

    // Xóa danh mục
    await Category.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Xóa danh mục thành công" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi khi xóa danh mục", error: err.message });
  }
});



module.exports = router;

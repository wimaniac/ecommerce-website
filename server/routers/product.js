const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const Category = require("../models/category");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { validateCategories } = require("../utils/validation");

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cấu hình multer với Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage: storage });

// 📌 Lấy tất cả sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate({
        path: "categoryAncestors",
        populate: { path: "subcategories" }, // ✅ Load danh mục con
      })
      .populate("brand");

    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi server", error: err.message });
  }
});

// 📌 Lấy sản phẩm theo ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate({
        path: "categoryAncestors",
        populate: { path: "subcategories" }, // ✅ Load danh mục con
      })
      .populate("brand");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy sản phẩm" });
    }
    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi server", error: err.message });
  }
});

router.post("/", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 5 },
]), async (req, res) => {
  try {
    console.log("🔄 Dữ liệu nhận từ frontend:", req.body);
    console.log("📂 File upload:", req.files);

    const { name, description, details, price, countInStock, sale, brand, categoryAncestors } = req.body;

    if (!name || !price || !categoryAncestors || !brand || !details) {
      return res.status(400).json({ success: false, message: "Thiếu thông tin sản phẩm!" });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ success: false, message: "Ảnh chính là bắt buộc!" });
    }

    const product = new Product({
      name,
      description,
      details,
      price: Number(price),
      countInStock: Number(countInStock),
      sale: Number(sale) || 0,
      brand: new mongoose.Types.ObjectId(brand),
      categoryAncestors: Array.isArray(categoryAncestors)
        ? categoryAncestors.map((id) => new mongoose.Types.ObjectId(id))
        : [new mongoose.Types.ObjectId(categoryAncestors)],
      image: req.files.image[0].path,
      images: req.files.images ? req.files.images.map((file) => file.path) : [],
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Lỗi khi tạo sản phẩm:", err);
    res.status(500).json({ success: false, message: "Không thể tạo sản phẩm", error: err.message });
  }
});

router.put("/:id", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 5 },
]), async (req, res) => {
  try {
    console.log("🔄 Dữ liệu nhận từ frontend:", req.body);
    console.log("📂 File upload:", req.files);

    const { name, description, price, countInStock, sale, brand, categories, subcategories, oldImages } = req.body;

    if (!name || !price || !categories) {
      return res.status(400).json({ success: false, message: "Thiếu thông tin sản phẩm!" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    product.set({
      name,
      description,
      price,
      countInStock,
      sale: sale != null ? sale : 0,
      brand,
      categoryAncestors: Array.isArray(categories) ? categories : [categories],
      subcategories: subcategories 
        ? (Array.isArray(subcategories) ? subcategories : [subcategories]) // ✅ Đảm bảo subcategories là mảng
        : [],
    });

    // ✅ Giữ nguyên ảnh cũ nếu không thay đổi
    if (req.files?.image) {
      product.image = req.files.image[0].path;
    }

    let updatedImages = oldImages ? JSON.parse(oldImages) : product.images;
    if (req.files?.images) {
      updatedImages = [...updatedImages, ...req.files.images.map((file) => file.path)];
    }
    product.images = updatedImages;

    await product.save();
    res.status(200).json({ success: true, message: "Cập nhật sản phẩm thành công!", product });
  } catch (err) {
    console.error("❌ Lỗi cập nhật sản phẩm:", err);
    res.status(500).json({ success: false, message: "Lỗi khi cập nhật sản phẩm", error: err.message });
  }
});






// 📌 Xóa sản phẩm
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "ID không hợp lệ" });
    }

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    res.status(200).json({ success: true, message: "Xóa sản phẩm thành công" });
  } catch (err) {
    console.error("Error deleting product:", err); // Log the error
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa sản phẩm",
      error: err.message,
    });
  }
});

// 📌 Lấy sản phẩm theo danh mục
router.get("/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res
      .status(400)
      .json({ success: false, message: "ID danh mục không hợp lệ" });
  }

  const products = await Product.find({
    categoryAncestors: categoryId,
  }).populate("categoryAncestors");

  if (products.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "Không tìm thấy sản phẩm" });
  }

  res.status(200).json({ success: true, data: products });
});

module.exports = router;

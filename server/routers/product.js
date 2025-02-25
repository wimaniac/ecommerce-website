const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const Category = require("../models/category");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

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
    const products = await Product.find().populate("category", "name");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
});

// 📌 Lấy sản phẩm theo ID
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "ID không hợp lệ" });
    }

    const product = await Product.findById(req.params.id).populate("category", "name");

    if (!product) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
});

// 📌 Thêm sản phẩm mới (Upload 1 ảnh chính và nhiều ảnh phụ)
router.post("/", upload.fields([{ name: "image", maxCount: 1 }, { name: "images", maxCount: 5 }]), async (req, res) => {
  try {
    const { name, description, details, brand, price, category, countInStock } = req.body;

    // Kiểm tra danh mục hợp lệ
    const categories = category ? category.split(",").map(id => id.trim()) : [];
    for (let catId of categories) {
      if (!mongoose.Types.ObjectId.isValid(catId) || !(await Category.findById(catId))) {
        return res.status(400).json({ success: false, message: `Danh mục không hợp lệ: ${catId}` });
      }
    }

    // Lưu ảnh chính và danh sách ảnh phụ lên Cloudinary
    const mainImage = req.files["image"] ? req.files["image"][0].path : "";
    const extraImages = req.files["images"] ? req.files["images"].map(file => file.path) : [];

    let product = new Product({
      name,
      description,
      details,
      brand,
      price,
      category: categories,
      countInStock,
      image: mainImage,
      images: extraImages,
    });

    product = await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ success: false, message: "Không thể tạo sản phẩm", error: err.message });
  }
});

// 📌 Cập nhật sản phẩm
router.put("/:id", upload.fields([{ name: "image", maxCount: 1 }, { name: "images", maxCount: 5 }]), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, details, brand, price, category, countInStock } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID không hợp lệ" });
    }

    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    // Kiểm tra danh mục hợp lệ
    const categories = category ? category.split(",").map(id => id.trim()) : [];
    for (let catId of categories) {
      if (!mongoose.Types.ObjectId.isValid(catId) || !(await Category.findById(catId))) {
        return res.status(400).json({ success: false, message: `Danh mục không hợp lệ: ${catId}` });
      }
    }

    // Cập nhật ảnh nếu có
    const mainImage = req.files["image"] ? req.files["image"][0].path : product.image;
    const extraImages = req.files["images"] ? req.files["images"].map(file => file.path) : product.images;

    product.name = name;
    product.description = description;
    product.details = details;
    product.brand = brand;
    product.price = price;
    product.category = categories;
    product.countInStock = countInStock;
    product.image = mainImage;
    product.images = extraImages;

    await product.save();
    res.status(200).json({ success: true, message: "Cập nhật sản phẩm thành công", data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi khi cập nhật sản phẩm", error: err.message });
  }
});

// 📌 Xóa sản phẩm
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "ID không hợp lệ" });
    }

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
    }

    res.status(200).json({ success: true, message: "Xóa sản phẩm thành công" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi khi xóa sản phẩm", error: err.message });
  }
});

// 📌 Lấy sản phẩm theo danh mục
router.get("/category/:categoryId", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.categoryId)) {
      return res.status(400).json({ success: false, message: "ID danh mục không hợp lệ" });
    }

    const products = await Product.find({ category: req.params.categoryId }).populate("category", "name");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
});

module.exports = router;

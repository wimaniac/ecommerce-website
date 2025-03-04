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
      const products = await Product.find().populate("categoryAncestors");
      res.status(200).json(products);
  } catch (err) {
      res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
});


// 📌 Lấy sản phẩm theo ID
router.get("/:id", async (req, res) => {
  try {
      const product = await Product.findById(req.params.id).populate('categoryAncestors');
      if (!product) {
          return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
      }
      res.status(200).json(product);
  } catch (err) {
      res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
});

async function validateCategories(categories, res) {
  for (let catId of categories) {
      if (!mongoose.Types.ObjectId.isValid(catId)) {
          res.status(400).json({ success: false, message: `Danh mục không hợp lệ: ${catId}` });
          return false;
      }
      const category = await Category.findById(catId);
      if (!category) {
          res.status(400).json({ success: false, message: `Danh mục không tồn tại: ${catId}` });
          return false;
      }
  }
  return true;
}


router.post("/", upload.fields([{ name: "image", maxCount: 1 }, { name: "images", maxCount: 5 }]), async (req, res) => {
  try {
      const { name, description, details, brand, price, categoryAncestors, countInStock, sale } = req.body;

      if (!name || name.trim() === "") {
          return res.status(400).json({ success: false, message: "Tên sản phẩm là bắt buộc" });
      }

      // Xử lý categoryAncestors tùy loại request
      let categories = typeof categoryAncestors === "string"
          ? categoryAncestors.split(",").map(id => id.trim())
          : categoryAncestors;

      if (!(await validateCategories(categories, res))) return;

      const mainImage = req.files["image"] ? req.files["image"][0].path : "";
      const extraImages = req.files["images"] ? req.files["images"].map(file => file.path) : [];

      const product = new Product({
          name, description, details, brand, price,
          categoryAncestors: categories,
          countInStock, sale,
          image: mainImage,
          images: extraImages
      });

      await product.save();
      res.status(201).json(product);

  } catch (err) {
      res.status(500).json({ success: false, message: "Không thể tạo sản phẩm", error: err.message });
  }
});


router.put("/:id", upload.fields([{ name: "image", maxCount: 1 }, { name: "images", maxCount: 5 }]), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, details, brand, price, categoryAncestors, countInStock, sale } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "ID không hợp lệ" });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });

    let categories = typeof categoryAncestors === "string" ? categoryAncestors.split(",").map(id => id.trim()) : categoryAncestors;
    if (!(await validateCategories(categories, res))) return;

    product.set({ name, description, details, brand, price, categoryAncestors: categories, countInStock, sale });

    if (req.files["image"]) product.image = req.files["image"][0].path;
    if (req.files["images"]) product.images = req.files["images"].map(file => file.path);

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
  const { categoryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ success: false, message: "ID danh mục không hợp lệ" });
  }

  const products = await Product.find({ categoryAncestors: categoryId }).populate('categoryAncestors');

  if (products.length === 0) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
  }

  res.status(200).json({ success: true, data: products });
});


module.exports = router;
  
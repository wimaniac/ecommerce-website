import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormLabel,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    details: "",
    brand: "",
    price: 1000,
    parentCategories: [],
    childCategories: [],
    countInStock: 1,
    sale: 0,
    numReview: 0,
    image: null,
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingBrands, setLoadingBrands] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/categories");
      const flatCategories = flattenCategories(response.data);
      setCategories(flatCategories);
      setLoadingCategories(false);
    } catch (error) {
      console.error("Lỗi lấy danh mục:", error);
      setLoadingCategories(false);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/brands");
      setBrands(response.data);
      setLoadingBrands(false);
    } catch (error) {
      console.error("Lỗi lấy thương hiệu:", error);
      setLoadingBrands(false);
    }
  };

  const flattenCategories = (categories) => {
    let flatCategories = [];
    categories.forEach((category) => {
      flatCategories.push(category);
      if (category.subcategories && category.subcategories.length > 0) {
        flatCategories = flatCategories.concat(
          flattenCategories(category.subcategories)
        );
      }
    });
    return flatCategories;
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === "image") {
      if (files.length > 0) {
        setProduct({ ...product, image: files[0] });
        setImagePreview(URL.createObjectURL(files[0]));
      }
    } else if (name === "images") {
      const newImages = Array.from(files);
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: [...(prevProduct.images || []), ...newImages],
      }));
      setImagesPreview((prevImagesPreview) => [
        ...prevImagesPreview,
        ...newImages.map((file) => URL.createObjectURL(file)),
      ]);
    } else if (name === "brand") {
      setProduct({ ...product, brand: brands.find(b => b._id === value) || value });
    } else if (name === "categoryAncestors") {
      setProduct({ ...product, categoryAncestors: categories.filter(c => value.includes(c._id)) });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };
  
  
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      if (!value || value < 1000) {
        setProduct({ ...product, price: 1000 });
      }
    } else if (name === "countInStock") {
      if (!value || value < 1) {
        setProduct({ ...product, countInStock: 1 });
      }
    }
  };

  const handleDeleteMainImage = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: null,
    }));
    setImagePreview(null);
  };

  const handleDeleteImage = (index) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.filter((_, i) => i !== index),
    }));
    setImagesPreview((prevImagesPreview) =>
      prevImagesPreview.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("🚀 Trạng thái sản phẩm trước khi gửi:", product);
  
    // ✅ Hợp nhất danh mục cha & con thành categoryAncestors
    const categoryAncestors = [...(product.parentCategories || []), ...(product.childCategories || [])];
  
    if (!product.name || !Number(product.price) || !product.details || !product.brand || !product.image || categoryAncestors.length === 0) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("details", product.details);
    formData.append("price", Number(product.price)); // ✅ Chuyển thành số
    formData.append("countInStock", Number(product.countInStock)); // ✅ Chuyển thành số
    formData.append("sale", Number(product.sale) || 0); // ✅ Chuyển thành số
    formData.append("brand", product.brand); // ✅ Gửi dưới dạng ID
  
    // ✅ Đảm bảo categoryAncestors là mảng ID hợp lệ
    categoryAncestors.forEach((catId) => formData.append("categoryAncestors", catId));
  
    formData.append("image", product.image instanceof File ? product.image : null);
    
    if (product.images?.length) {
      product.images.forEach((file) => formData.append("images", file));
    }
  
    console.log("🚀 Dữ liệu gửi lên Backend:", [...formData.entries()]);
  
    try {
      const response = await axios.post("http://localhost:4000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Thêm sản phẩm thành công:", response.data);
      alert("Thêm thành công");
    } catch (error) {
      console.error("❌ Lỗi thêm sản phẩm:", error.response?.data || error.message);
      alert("Lỗi thêm sản phẩm: " + (error.response?.data?.message || error.message));
    }
  };
  
  
  
  
  

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        label="Tên sản phẩm"
        name="name"
        fullWidth
        onChange={handleChange}
        required
      />
      <TextField
        label="Mô tả"
        name="description"
        fullWidth
        onChange={handleChange}
        required
      />
      <TextField
        label="Thông tin chi tiết"
        name="details"
        fullWidth
        onChange={handleChange}
        required
      />
<FormControl fullWidth variant="outlined">
  <InputLabel>Chọn thương hiệu</InputLabel>
  <Select
    name="brand"
    value={product.brand}
    onChange={(e) => setProduct({ ...product, brand: e.target.value })}
    label="Chọn thương hiệu"
  >
    {loadingBrands ? (
      <MenuItem disabled>
        <CircularProgress size={24} />
      </MenuItem>
    ) : (
      brands.map((brand) => (
        <MenuItem key={brand._id} value={brand._id}>
          {brand.name}
        </MenuItem>
      ))
    )}
  </Select>
</FormControl>

      <TextField
        label="Giá"
        type="number"
        name="price"
        fullWidth
        value={product.price}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        inputProps={{ min: 1000, step: 1000 }}
      />
      <TextField
        label="Tồn kho"
        type="number"
        name="countInStock"
        fullWidth
        value={product.countInStock}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        inputProps={{ min: 1 }}
      />
      <TextField
        label="Giảm giá (%)"
        type="number"
        name="sale"
        fullWidth
        value={product.sale}
        onChange={handleChange}
      />
      <FormControl fullWidth variant="outlined">
        <InputLabel>Chọn danh mục chính</InputLabel>
        <Select
          multiple
          name="childCategories"
          value={product.childCategories}
          onChange={handleChange}
          renderValue={(selected) =>
            selected
              .map((id) => {
                const cat = categories.find((c) => c._id === id);
                return cat ? cat.name : id;
              })
              .join(", ")
          }
          label="Chọn danh mục chính"
        >
          {loadingCategories ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            categories
              .filter(
                (cat) => cat.subcategories && cat.subcategories.length > 0
              )
              .map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))
          )}
        </Select>
      </FormControl>
      <FormControl fullWidth variant="outlined">
        <InputLabel>Chọn danh mục phụ</InputLabel>
        <Select
          multiple
          name="parentCategories"
          value={product.parentCategories}
          onChange={handleChange}
          renderValue={(selected) =>
            selected
              .map((id) => {
                const cat = categories.find((c) => c._id === id);
                return cat ? cat.name : id;
              })
              .join(", ")
          }
          label="Chọn danh mục phụ"
        >
          {loadingCategories ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            categories
              .filter(
                (cat) => !cat.subcategories || cat.subcategories.length === 0
              )
              .map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))
          )}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <FormLabel>Ảnh chính</FormLabel>
        <input name="image" type="file" onChange={handleChange} required />
        {imagePreview && (
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={imagePreview}
              alt="Ảnh chính"
              style={{ marginTop: "10px", maxWidth: "100px" }}
            />
            <IconButton
              onClick={handleDeleteMainImage}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                padding: "5px",
              }}
            >
              <DeleteIcon style={{ fontSize: "16px" }} />
            </IconButton>
          </div>
        )}
      </FormControl>
      <FormControl fullWidth>
        <FormLabel>Ảnh phụ (tối đa 3 ảnh)</FormLabel>
        <input name="images" type="file" multiple onChange={handleChange} />
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {imagesPreview.map((src, index) => (
            <div key={index} style={{ position: "relative" }}>
              <img
                src={src}
                alt={`Ảnh phụ ${index + 1}`}
                style={{ maxWidth: "100px" }}
              />
              <IconButton
                onClick={() => handleDeleteImage(index)}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  padding: "5px",
                }}
              >
                <DeleteIcon style={{ fontSize: "16px" }} />
              </IconButton>
            </div>
          ))}
        </div>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Thêm sản phẩm
      </Button>
    </form>
  );
}

export default AddProduct;

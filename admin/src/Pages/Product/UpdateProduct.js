import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Grid,
  Card,
  CardMedia,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";

function UpdateProduct() {
  const { id } = useParams();
  const history = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    details: "",
    price: 0,
    countInStock: 0,
    sale: 0,
    categories: [],
    subcategories: [],
    brand: "",
    image: "",
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/products/${id}`)
      .then((res) => {
        console.log("Dữ liệu sản phẩm nhận được:", res.data); // ✅ Kiểm tra dữ liệu API

        setProduct({
          ...res.data,
          name: res.data.name || "",
          description: res.data.description || "",
          details: res.data.details || "",
          price: res.data.price || 0,
          countInStock: res.data.countInStock || 0,
          sale: res.data.sale != null ? res.data.sale : 0,
          categories: res.data.categoryAncestors?.map((cat) => cat._id) || [], // ✅ Lấy ID danh mục chính
          subcategories:
            res.data.categoryAncestors?.flatMap(
              (cat) => cat.subcategories?.map((sub) => sub._id) || []
            ) || [], // ✅ Lấy ID danh mục phụ
          brand: res.data.brand?._id || "",
          image: res.data.image || "",
          images: res.data.images || [],
        });
      })
      .catch((err) => console.error("Lỗi khi lấy sản phẩm:", err));

    axios
      .get("http://localhost:4000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Lỗi khi lấy danh mục:", err));

    axios
      .get("http://localhost:4000/api/brands")
      .then((res) => setBrands(res.data))
      .catch((err) => console.error("Lỗi khi lấy thương hiệu:", err));
  }, [id]);

  useEffect(() => {
    if (product.categories.length > 0) {
      const selectedCategoryObjects = categories.filter((cat) =>
        product.categories.includes(cat._id)
      );
      const allSubcategories = selectedCategoryObjects.flatMap(
        (cat) => cat.subcategories
      );
      setSubcategories(allSubcategories);
    } else {
      setSubcategories([]);
    }
  }, [product.categories, categories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => {
      let newValue = value;

      if (name === "price" && value < 0) newValue = prevProduct.price;
      if (name === "countInStock" && value < 0)
        newValue = prevProduct.countInStock;
      if (name === "sale") {
        newValue = value === "" ? 0 : Math.max(0, Math.min(100, Number(value))); // ✅ Đảm bảo không rỗng, không âm, không vượt quá 100
      }

      return { ...prevProduct, [name]: newValue };
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = e.target.value;
    setProduct({ ...product, categories: selectedCategories });
  };

  const handleSubcategoryChange = (e) => {
    const selectedSubcategories = e.target.value;
    setProduct({ ...product, subcategories: selectedSubcategories });
  };

  const handleBrandChange = (e) => {
    setProduct({ ...product, brand: e.target.value });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // ✅ Tạo URL tạm thời từ File

      if (index === -1) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          image: imageUrl, // ✅ Hiển thị ảnh ngay lập tức
          imageFile: file, // ✅ Lưu file để gửi lên server
        }));
      } else {
        setProduct((prevProduct) => {
          const newImages = [...prevProduct.images];
          const newImageFiles = [...(prevProduct.imageFiles || [])];

          newImages[index] = imageUrl; // ✅ Hiển thị ảnh ngay lập tức
          newImageFiles[index] = file; // ✅ Lưu file để gửi lên server

          return {
            ...prevProduct,
            images: newImages,
            imageFiles: newImageFiles,
          };
        });
      }
    }
  };

  const handleDeleteImage = (index) => {
    setProduct((prevProduct) => {
      const newImages = [...prevProduct.images];
      const newImageFiles = [...(prevProduct.imageFiles || [])];

      newImages.splice(index, 1);
      newImageFiles.splice(index, 1);

      return {
        ...prevProduct,
        images: newImages,
        imageFiles: newImageFiles,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("details", product.details);
    formData.append("price", product.price);
    formData.append("countInStock", product.countInStock);
    formData.append("sale", product.sale ?? 0);
    formData.append("brand", product.brand);
  
    // ✅ Đảm bảo `categories` luôn là mảng
    if (Array.isArray(product.categories)) {
      product.categories.forEach((category) => formData.append("categories", category));
    } else if (product.categories) {
      formData.append("categories", product.categories);
    }
  
    // ✅ Đảm bảo `subcategories` luôn là mảng (kể cả khi chỉ chọn 1 mục)
    if (Array.isArray(product.subcategories)) {
      product.subcategories.forEach((subcategory) => formData.append("subcategories", subcategory));
    } else if (product.subcategories) {
      formData.append("subcategories", product.subcategories);
    }
  
    // ✅ Giữ ảnh cũ nếu không thay đổi
    formData.append("oldImages", JSON.stringify(product.images));
  
    if (product.imageFile) {
      formData.append("image", product.imageFile);
    }
    if (product.imageFiles?.length) {
      product.imageFiles.forEach((file) => formData.append("images", file));
    }
  
    console.log("🚀 Dữ liệu gửi lên Backend:", [...formData.entries()]);
  
    try {
      const response = await axios.put(
        `http://localhost:4000/api/products/${product._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("✅ Cập nhật thành công:", response.data);
    } catch (error) {
      console.error("❌ Lỗi cập nhật sản phẩm:", error.response?.data || error.message);
    }
  };
  

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Cập nhật sản phẩm
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h6">Hình ảnh chính</Typography>
            {product.image && (
              <Card
                sx={{ maxWidth: 300, mx: "auto", my: 2, position: "relative" }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt="Main product image"
                  sx={{ objectFit: "cover" }}
                />
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="main-image-upload"
                  type="file"
                  onChange={(e) => handleImageChange(e, -1)}
                />
                <label htmlFor="main-image-upload">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    sx={{ position: "absolute", top: 8, right: 8 }}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Card>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Hình ảnh phụ</Typography>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ gap: "10px" }}
            >
              {product.images.map((img, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card
                    sx={{
                      maxWidth: 200,
                      mx: "auto",
                      my: 2,
                      position: "relative",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="150"
                      image={img}
                      alt={`Extra product image ${index + 1}`}
                      sx={{ objectFit: "cover" }}
                    />
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id={`extra-image-upload-${index}`}
                      type="file"
                      onChange={(e) => handleImageChange(e, index)}
                    />
                    <label htmlFor={`extra-image-upload-${index}`}>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        sx={{ position: "absolute", top: 8, right: 8 }}
                      >
                        <PhotoCamera />
                      </IconButton>
                    </label>
                    <IconButton
                      color="error"
                      aria-label="delete picture"
                      component="span"
                      onClick={() => handleDeleteImage(index)}
                      sx={{ position: "absolute", top: 8, left: 8 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Card>
                </Grid>
              ))}
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    maxWidth: 200,
                    mx: "auto",
                    my: 2,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 150,
                    border: "2px dashed #ccc",
                  }}
                >
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="new-extra-image-upload"
                    type="file"
                    onChange={(e) =>
                      handleImageChange(e, product.images.length)
                    }
                  />
                  <label htmlFor="new-extra-image-upload">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <TextField
          fullWidth
          label="Tên sản phẩm"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Mô tả"
          name="description"
          value={product.description}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Chi tiết"
          name="details"
          value={product.details}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Giá"
          name="price"
          type="number"
          value={product.price}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          inputProps={{ min: 0 }}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel shrink>Danh mục chính</InputLabel>
          <Select
            multiple
            value={product.categories} // ✅ Fix lỗi không hiển thị
            onChange={handleCategoryChange}
            label="Danh mục"
            renderValue={(selected) =>
              selected
                .map((value) => {
                  const category = categories.find((cat) => cat._id === value);
                  return category ? category.name : "";
                })
                .join("")
            }
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel shrink>Danh mục phụ</InputLabel>
          <Select
            multiple
            value={product.subcategories || []} // ✅ Fix: Không được để undefined
            onChange={handleSubcategoryChange}
            label="Danh mục phụ"
            renderValue={(selected) =>
              selected
                .map((value) => {
                  const subcategory = categories
                    .flatMap((cat) => cat.subcategories || [])
                    .find((sub) => sub._id === value);
                  return subcategory ? subcategory.name : "";
                })
                .join(", ")
            }
          >
            {categories
              .flatMap((cat) => cat.subcategories || [])
              .map((subcategory) => (
                <MenuItem key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel shrink>Thương hiệu</InputLabel>
          <Select
            value={product.brand} // ✅ Fix lỗi không hiển thị
            onChange={handleBrandChange}
            label="Thương hiệu"
          >
            {brands.map((brand) => (
              <MenuItem key={brand._id} value={brand._id}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Tồn kho"
          name="countInStock"
          type="number"
          value={product.countInStock}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          inputProps={{ min: 0 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Giảm giá (%)"
          name="sale"
          type="number"
          value={product.sale}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          inputProps={{ min: 0, max: 100 }}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Cập nhật
        </Button>
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default UpdateProduct;

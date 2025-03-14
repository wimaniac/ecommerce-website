import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CardActions,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
} from "@mui/material";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState("");
  const [selectedChildCategory, setSelectedChildCategory] = useState(""); // Add state for subcategory
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(1);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const productsPerPage = 12;

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products")
      .then((res) => {
        console.log("Dữ liệu API trả về:", res.data); // 🛠 Kiểm tra dữ liệu
        setProducts(res.data);
      })
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:4000/api/categories")
      .then((res) => setCategories(flattenCategories(res.data)))
      .catch((err) => console.error(err));
  }, []);

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

  const handleParentCategoryChange = (event) => {
    setSelectedParentCategory(event.target.value);
  };

  const handleChildCategoryChange = (event) => {
    setSelectedChildCategory(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenDeleteDialog = (productId) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      handleDeleteProduct(productToDelete);
      handleCloseDeleteDialog();
    }
  };

  const handleDeleteProduct = (productId) => {
    axios
      .delete(`http://localhost:4000/api/products/${productId}`)
      .then((res) => {
        setProducts(products.filter((product) => product._id !== productId));
        setSnackbar({
          open: true,
          message: "Sản phẩm đã được xóa thành công!",
          severity: "success",
        });
      })
      .catch((err) => {
        console.error(err);
        setSnackbar({
          open: true,
          message: "Có lỗi xảy ra khi xóa sản phẩm!",
          severity: "error",
        });
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const filteredProducts = products.filter((product) => {
    if (
      selectedParentCategory &&
      !product.categoryAncestors.some(
        (cat) => cat._id === selectedParentCategory
      )
    ) {
      return false;
    }
    if (
      selectedChildCategory &&
      !product.categoryAncestors.some(
        (cat) => cat._id === selectedChildCategory
      )
    ) {
      return false;
    }
    return true;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.dateCreate) - new Date(a.dateCreate);
    } else if (sortOrder === "oldest") {
      return new Date(a.dateCreate) - new Date(b.dateCreate);
    }
    return 0;
  });

  const paginatedProducts = sortedProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return Math.round(total / ratings.length);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Quản lý sản phẩm
      </Typography>
      <Button
        component={Link}
        to="/add-product"
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
      >
        Thêm sản phẩm
      </Button>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel shrink>Danh mục chính</InputLabel>
            <Select
              value={selectedParentCategory}
              onChange={handleParentCategoryChange}
              label="Danh mục chính"
              displayEmpty
            >
              <MenuItem value="">Tất cả</MenuItem>
              {categories
                .filter(
                  (cat) => cat.subcategories && cat.subcategories.length > 0
                )
                .map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel shrink>Danh mục phụ</InputLabel>
            <Select
              value={selectedChildCategory}
              onChange={handleChildCategoryChange}
              label="Danh mục phụ"
              displayEmpty
            >
              <MenuItem value="">Tất cả</MenuItem>
              {categories
                .filter(
                  (cat) => !cat.subcategories || cat.subcategories.length === 0
                )
                .map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel shrink>Sắp xếp theo</InputLabel>
            <Select
              value={sortOrder}
              onChange={handleSortOrderChange}
              label="Sắp xếp theo"
              displayEmpty
            >
              <MenuItem value="">Mặc định</MenuItem>
              <MenuItem value="newest">Mới nhất</MenuItem>
              <MenuItem value="oldest">Cũ nhất</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {paginatedProducts.map((p) => (
          <Grid item xs={12} sm={4} md={3} key={p._id}>
            <Card sx={{ width: 290, height: "auto", overflow: "hidden" }}>
              <CardMedia
                component="img"
                height="200"
                image={p.image}
                alt={p.name}
                sx={{ objectFit: "cover" }}
              />
              {p.images && p.images.length > 0 && (
                <Box display="flex" flexWrap="wrap" mt={2}>
                  {p.images.map((img, index) => (
                    <CardMedia
                      key={index}
                      component="img"
                      image={img}
                      alt={`${p.name} - ${index + 1}`}
                      sx={{
                        objectFit: "cover",
                        marginRight: 1,
                        marginBottom: 1,
                        width: "100px",
                        height: "80px",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                  ))}
                </Box>
              )}
              <CardContent
                sx={{ maxWidth: 300, maxHeight: 400, overflowY: "auto" }}
              >
                <Typography variant="h6" component="div" gutterBottom>
                  {p.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {p.description}
                </Typography>
                <Divider />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  paragraph
                  sx={{ marginTop: 2 }}
                >
                  <strong>Thông tin chi tiết:</strong> {p.details}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Giá:</strong> {p.price.toLocaleString()} đ
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Danh mục chính:</strong>{" "}
                  {p.categoryAncestors?.map((cat) => cat.name).join(", ")}
                </Typography>

                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Danh mục phụ:</strong>{" "}
                  {p.categoryAncestors
                    ?.flatMap(
                      (cat) => cat.subcategories?.map((sub) => sub.name) || []
                    )
                    .join(", ")}
                </Typography>

                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Thương hiệu:</strong>{" "}
                  {p.brand?.name || "Không có thương hiệu"}
                </Typography>

                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Tồn kho:</strong> {p.countInStock}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Số lượt đánh giá:</strong> {p.rating}
                </Typography>
                <Box display="flex" alignItems="center" marginBottom={2}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Trung bình số sao:</strong>
                  </Typography>
                  <Rating
                    value={calculateAverageRating(p.ratings)}
                    readOnly
                    sx={{ marginLeft: 1, fontSize: "1.3rem" }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Giảm giá:</strong> {p.sale}%
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Ngày tạo:</strong>{" "}
                  {new Date(p.dateCreate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Bình luận:</strong>{" "}
                  {Array.isArray(p.comment)
                    ? `${p.comment.length} bình luận`
                    : p.comment || "Không có bình luận"}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  component={Link}
                  to={`/update-product/${p._id}`}
                >
                  Sửa
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleOpenDeleteDialog(p._id)}
                >
                  Xóa
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredProducts.length / productsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa sản phẩm này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          "& .MuiAlert-root": {
            backgroundColor:
              snackbar.severity === "success" ? "#4caf50" : "#f44336",
            color: "#fff",
            fontWeight: "bold",
            boxShadow:
              "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
          },
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ManageProducts;

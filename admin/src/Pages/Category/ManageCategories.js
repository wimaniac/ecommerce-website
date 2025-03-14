import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
  Paper,
  Box,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const CategoryItem = ({
  category,
  onEdit,
  onDelete,
  onAddSubcategory,
  isTopLevel,
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={handleClick} key={category._id}>
        <ListItemText primary={category.name} />
        {category.subcategories?.length > 0 ? (
          open ? (
            <ExpandLessIcon onClick={handleClick} />
          ) : (
            <ExpandMoreIcon onClick={handleClick} />
          )
        ) : null}
        <IconButton color="primary" onClick={() => onEdit(category)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(category._id)}>
          <DeleteIcon />
        </IconButton>
        {isTopLevel && (
          <IconButton
            color="primary"
            onClick={() => onAddSubcategory(category)}
          >
            <AddIcon />
          </IconButton>
        )}
      </ListItem>
      {category.subcategories?.length > 0 && (
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          key={`collapse-${category._id}`}
        >
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {category.subcategories.map((sub) => (
              <CategoryItem
                key={sub._id}
                category={sub}
                onEdit={onEdit}
                onDelete={onDelete}
                onAddSubcategory={onAddSubcategory}
                isTopLevel={false}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    name: "",
    _id: "",
    parentId: null,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("http://localhost:4000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Lỗi khi lấy danh mục:", err));
  };

  const handleOpenDialog = (category = { name: "", parentId: null }) => {
    setCurrentCategory(category);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCategory({ name: "", _id: "", parentId: null });
  };

  const handleSaveCategory = () => {
    if (currentCategory._id) {
      // Cập nhật danh mục
      axios
        .put(`http://localhost:4000/api/categories/${currentCategory._id}`, {
          name: currentCategory.name,
          parentId: currentCategory.parentId,
          subcategories: [], // Nếu cần sửa subcategories thì thêm logic ở đây
        })
        .then(fetchCategories)
        .catch((err) => alert("Lỗi khi cập nhật danh mục"));
    } else {
      // Thêm mới danh mục
      axios
        .post("http://localhost:4000/api/categories", {
          name: currentCategory.name,
          parentId: currentCategory.parentId,
          subcategories: [],
        })
        .then(fetchCategories)
        .catch((err) => alert("Lỗi khi thêm danh mục"));
    }
    handleCloseDialog();
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
      axios
        .delete(`http://localhost:4000/api/categories/${id}`)
        .then(fetchCategories)
        .catch((err) => alert("Lỗi khi xóa danh mục"));
    }
  };

  const handleAddSubcategory = (parentCategory) => {
    handleOpenDialog({ name: "", parentId: parentCategory._id });
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Quản lý danh mục
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog()}
        sx={{ marginBottom: 2 }}
      >
        Thêm danh mục mới
      </Button>

      <Paper elevation={3} sx={{ padding: 2 }}>
        <List>
          {categories.map((category) => (
            <CategoryItem
              key={category._id}
              category={category}
              onEdit={handleOpenDialog}
              onDelete={handleDeleteCategory}
              onAddSubcategory={handleAddSubcategory}
              isTopLevel={true}
            />
          ))}
        </List>
      </Paper>

      {/* Dialog Thêm/Sửa */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {currentCategory._id ? "Cập nhật danh mục" : "Thêm danh mục phụ"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhập tên danh mục cần {currentCategory._id ? "cập nhật" : "thêm"}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Tên danh mục"
            fullWidth
            value={currentCategory.name}
            onChange={(e) =>
              setCurrentCategory({ ...currentCategory, name: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSaveCategory} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageCategories;

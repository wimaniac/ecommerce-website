import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit as EditIcon } from '@mui/icons-material';

function ManageBrands() {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState("");
  const [editingBrand, setEditingBrand] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    const response = await axios.get("/api/brand"); // Updated endpoint
    setBrands(response.data);
  };

  const handleAddBrand = async () => {
    if (editingBrand) {
      await axios.put(`/api/brand/${editingBrand._id}`, { name }); // Updated endpoint
      setEditingBrand(null);
    } else {
      await axios.post("/api/brand", { name }); // Updated endpoint
    }
    setName("");
    fetchBrands();
  };

  const handleEditBrand = (brand) => {
    setName(brand.name);
    setEditingBrand(brand);
  };

  const handleDeleteBrand = async (id) => {
    await axios.delete(`/api/brand/${id}`); // Updated endpoint
    fetchBrands();
  };

  return (
    <div>
      <h1>Quản lý thương hiệu</h1>
      <TextField
        label="Tên thương hiệu"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={handleAddBrand}>
        {editingBrand ? "Cập nhật" : "Thêm"}
      </Button>
      <List>
        {brands.map((brand) => (
          <ListItem key={brand._id}>
            <ListItemText primary={brand.name} />
            <IconButton onClick={() => handleEditBrand(brand)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteBrand(brand._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ManageBrands;

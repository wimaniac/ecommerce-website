import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark"; // Import icon for brands

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        Admin Panel
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/manage-products">
            <InventoryIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Quản lý sản phẩm" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/manage-categories">
            <CategoryIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Quản lý danh mục" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/manage-brands">
            <BrandingWatermarkIcon sx={{ marginRight: 1 }} />
            <ListItemText primary="Quản lý thương hiệu" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;

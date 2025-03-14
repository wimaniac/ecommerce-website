import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ManageProducts from "./Pages/Product/ManageProduct";
import AddProduct from "./Pages/Product/AddProduct";
import ManageCategories from "./Pages/Category/ManageCategories";
import UpdateProduct from "./Pages/Product/UpdateProduct";
import ManageBrands from "./Pages/Brand/ManageBrands"; // Import ManageBrands component

import { ThemeProvider, createTheme } from "@mui/material/styles";

// Tạo theme cơ bản
const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<ManageProducts />} />
              <Route path="/manage-products" element={<ManageProducts />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/manage-categories" element={<ManageCategories />} />
              <Route path="/update-product/:id" element={<UpdateProduct />} />
              <Route path="/manage-brands" element={<ManageBrands />} />{" "}
              {/* Add route for managing brands */}
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

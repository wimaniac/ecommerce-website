import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ManageProducts from "./Pages/Product/ManageProducts";
import AddProduct from "./Pages/Product/AddProduct";
// import UpdateProduct from "./Pages/Product/UpdateProduct";
// import DeleteProduct from "./Pages/Product/DeleteProduct";
import ManageCategories from "./Pages/Category/ManageCategories";
// import AddCategory from "./Pages/Category/AddCategory";
// import UpdateCategory from "./Pages/Category/UpdateCategory";
// import DeleteCategory from "./Pages/Category/DeleteCategory";

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<ManageProducts />} />
            <Route path="/manage-products" element={<ManageProducts />} />
            <Route path="/add-product" element={<AddProduct />} />
            {/* <Route path="/update-product/:id" element={<UpdateProduct />} />
            <Route path="/delete-product/:id" element={<DeleteProduct />} /> */}
            <Route path="/manage-categories" element={<ManageCategories />} />
            {/* <Route path="/add-category" element={<AddCategory />} />
            <Route path="/update-category/:id" element={<UpdateCategory />} />
            <Route path="/delete-category/:id" element={<DeleteCategory />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

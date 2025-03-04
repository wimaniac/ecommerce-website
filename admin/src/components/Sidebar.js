import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Admin Panel</h3>
      <ul>
        <li><Link to="/manage-products">Quản lý sản phẩm</Link></li>
        <li><Link to="/manage-categories">Quản lý danh mục</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;

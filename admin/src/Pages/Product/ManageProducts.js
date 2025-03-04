import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ManageProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Quản lý sản phẩm</h2>
      <Link to="/add-product">➕ Thêm sản phẩm</Link>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Mô tả</th>
            <th>Thông tin chi tiết</th>
            <th>Thương hiệu</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Tồn kho</th>
            <th>Đánh giá</th>
            <th>Giảm giá</th>
            <th>Ảnh chính</th>
            <th>Ảnh phụ</th>
            <th>Ngày tạo</th>
            <th>Bình luận</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.details}</td>
              <td>{p.brand}</td>
              <td>{p.price}</td>
              <td>{p.categoryAncestors?.map(cat => cat.name).join(", ")}</td>
              <td>{p.countInStock}</td>
              <td>{p.rating}</td>
              <td>{p.sale}%</td>
              <td>
                <img src={p.image} alt={p.name} width="50" height="50" />
              </td>
              <td>
                {p.images.map((img, index) => (
                  <img key={index} src={img} alt={`Phụ ${index}`} width="30" height="30" />
                ))}
              </td>
              <td>{new Date(p.dateCreate).toLocaleDateString()}</td>
              <td>{p.comment}</td>
              <td>
                <Link to={`/update-product/${p._id}`}>✏️ Sửa</Link> | 
                <Link to={`/delete-product/${p._id}`}>❌ Xóa</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageProducts;

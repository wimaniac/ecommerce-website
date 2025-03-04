import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/api/products", product)
      .then(() => alert("Thêm thành công"))
      .catch((err) => alert("Lỗi thêm sản phẩm"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Tên sản phẩm" onChange={handleChange} required />
      <input name="description" placeholder="Mô tả" onChange={handleChange} required />
      <input name="price" type="number" placeholder="Giá" onChange={handleChange} required />
      <input name="countInStock" type="number" placeholder="Số lượng" onChange={handleChange} required />
      <button type="submit">Thêm sản phẩm</button>
    </form>
  );
}

export default AddProduct;

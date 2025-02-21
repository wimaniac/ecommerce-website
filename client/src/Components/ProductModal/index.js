import React from "react";
import { Dialog, Button } from "@mui/material";
import { MdClose } from "react-icons/md";
import Rating from "@mui/material/Rating";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { useState } from "react";
import QuantityBox from "../QuantityBox";
import { GoHeart } from "react-icons/go";
import ProductZoom from "../ProductZoom";

const ProductModal = ({ closeModal }) => {

  
  return (
    <Dialog
      open={true}
      onClose={closeModal}
      className="productModal"
      sx={{ "& .MuiDialog-container": { overflow: "hidden" } }}
    >
      {" "}
      <Button className="closeBtn" onClick={closeModal}>
        <MdClose />
      </Button>
      <div className="quickview-product container">
        <div className="quickview-product-wrapper">
          <h4>Bánh Bao Nhân Thịt 400g</h4>
          <div className="d-flex product-meta ">
            <div className="d-flex product-brand">
              <span className="brand">Thương hiệu:</span>
              <span className="brand-name">Cholimex</span>
            </div>
            <div className="product-rating d-flex">
              <Rating
                name="read-only"
                value={5}
                size="small"
                precision={0.5}
                readOnly
              />
            </div>
          </div>
          <div className="row imgPro-quickview">
            <div className="col-md-5">
              <div className="productZoom">
                <ProductZoom></ProductZoom>
              </div>
            </div>
            <div className="col-md-7">
              <div
                className="d-flex info align-items-center"
                style={{ gap: "7px" }}
              >
                <span className="old-price lg">20.000 đ</span>
                <span className="new-price lg ">15.000 ₫</span>
              </div>
              <span className="badge bg-success">Còn hàng</span>
              <div className="product-descibe">
                <p>
                  Sản xuất theo tiêu chuẩn hữu cơ Nhật Bản. Không sử dụng hóa
                  chất tổng hợp. Không sử dụng giống biến đổi gen. Chỉ sử dụng
                  phân bón hữu cơ
                </p>
              </div>
              <div className="d-flex align-items-center">
                <QuantityBox></QuantityBox>
                <Button className="btn-blue btn-lg btn-big btn-round">
                  Thêm vào giỏ hàng
                </Button>
              </div>
              <div className="d-flex align-items-center addtoFav">
                <Button variant="outlined" className="btn-round">
                  <GoHeart /> Thêm vào danh sách yêu thích
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductModal;

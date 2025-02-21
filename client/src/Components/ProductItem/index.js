import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { SlSizeFullscreen } from "react-icons/sl";
import { GoHeart } from "react-icons/go";
import ProductModal from "../ProductModal";
import Rating from "@mui/material/Rating";
import rauden1 from "../../assets/rauden1.jpg";
const ProductItem = (props) => {
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);
  const [value, setValue] = useState(0);

  const viewProductDetail = () => {
    setIsOpenProductModal(true);
  };

  return (
    <>
      <div className={`item productItem ${props.itemView}`}>
        <div className="imgWrapper">
          <span className="badge badge-primary">10%</span>
          <div className="actions">
            <Button onClick={viewProductDetail}>
              <SlSizeFullscreen />
            </Button>
            <Button>
              <GoHeart style={{ fontSize: "19px" }} />
            </Button>
          </div>
          <div className="img-container">
          <Link to={"/"}>
            <div className="productImg">
              <img src={rauden1} alt="product" />
            </div>
          </Link>
          </div>
        </div>

        <div className="product-content">
          <Link to={"/"}>
            <h3 className="product-title">Rau dền</h3>
          </Link>
          <div className="text-sussess">Còn hàng</div>
          <Rating
            name="read-only"
            value={value}
            readOnly
            size="small"
            precision={0.5}
            style={{ padding: 0, display: "flex", marginBottom: "5px" }}
          />
          <div className="d-flex product-price">
            <span className="old-price">20.000 đ</span>
            <span className="new-price">15.000 ₫</span>
          </div>
          <div className="addToCart">
            <Button>
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>

      {isOpenProductModal && <ProductModal closeModal={() => setIsOpenProductModal(false)} />}
    </>
  );
};

export default ProductItem;

import React from "react";
import { Dialog, Button } from "@mui/material";
import { MdClose } from "react-icons/md";
import Rating from "@mui/material/Rating";
import Slider from "react-slick";
import { useRef } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import rauden1 from "../../assets/rauden1.jpg";
import rauden2 from "../../assets/rauden2.jpg";
import rauden3 from "../../assets/canhrauden.jpg";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import QuantityBox from "../QuantityBox";
import { GoHeart } from "react-icons/go";

const ProductModal = ({ closeModal }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  var settings2 = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: false,
  };
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
  };
  const zoomSliderBig = useRef();
  const zoomSlider = useRef();
  const goto = (index) => {
    if (zoomSliderBig.current) {
      zoomSliderBig.current.slickGoTo(index);
    }
    if (zoomSlider.current) {
      zoomSlider.current.slickGoTo(index);
    }
    setSelectedIndex(index); // Cập nhật trạng thái ảnh đang được chọn
  };

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
                <Slider
                  {...settings2}
                  className="zoomSliderBig"
                  ref={zoomSliderBig}
                >
                  <div className="item">
                    <InnerImageZoom
                      zoomType="hover"
                      zoomScale={1}
                      src={rauden1}
                    />
                  </div>
                  <div className="item">
                    <InnerImageZoom
                      zoomType="hover"
                      zoomScale={1}
                      src={rauden2}
                    />
                  </div>
                  <div className="item">
                    <InnerImageZoom
                      zoomType="hover"
                      zoomScale={1}
                      src={rauden3}
                    />
                  </div>
                </Slider>

                <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
                  <div
                    className={`item ${selectedIndex === 0 ? "active" : ""}`}
                  >
                    <img src={rauden1} onClick={() => goto(0)} />
                  </div>
                  <div
                    className={`item ${selectedIndex === 1 ? "active" : ""}`}
                  >
                    <img src={rauden2} onClick={() => goto(1)} />
                  </div>
                  <div
                    className={`item ${selectedIndex === 2 ? "active" : ""}`}
                  >
                    <img src={rauden3} onClick={() => goto(2)} />
                  </div>
                </Slider>
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

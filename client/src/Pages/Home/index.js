import HomeBanner from "../../Components/HomeBanner";
import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "@mui/material/Rating";
import { SlSizeFullscreen } from "react-icons/sl";
import coupon from "../../assets/coupon.png";
import ProductItem from "../../Components/ProductItem";
import { IoMailOutline } from "react-icons/io5";
import Footer from "../../Components/Footer";

const Home = () => {
  const [value, setValue] = React.useState(0);

  return (
    <>
      <HomeBanner />
      <section className="homeProduct">
        <div className="container">
          <div className="row" style={{ maxWidth: "1200px" }}>
            <div className="col-md-3">
              <div className="banner mb-5">
                <img
                  src="https://www.circlek.com.vn/wp-content/uploads/2025/02/PO_Monthly-T2_HCM_VN-scaled.jpg"
                  className="cursor"
                />
              </div>
              <div className="banner">
                <img
                  src="https://www.bigc.vn/files/banners/cover-home-right-go-v4.jpeg"
                  className="cursor"
                />
              </div>
            </div>
            <div className="col-md-9 productRow">
              <div className="d-flex align-items-center">
                <div className="entry-title">
                  <h4>Sản phẩm bán chạy</h4>
                  <p className="entry-description">
                    Đừng bỏ lỡ các ưu đãi hiện tại cho đến cuối tháng.
                  </p>
                </div>
                <div className="view-all">
                  <Button className="view-allBtn">
                    Xem tất cả <IoIosArrowRoundForward />
                  </Button>
                </div>
              </div>
              <div className="product_row w-100 mt-3 mb-5 position-relative">
                {/* Nút Previous */}
                <button className="custom-prev">❮</button>

                <Swiper
                  slidesPerView={4}
                  spaceBetween={0}
                  navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                  }}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <ProductItem />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductItem />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductItem />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductItem />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductItem />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductItem />
                  </SwiperSlide>
                </Swiper>

                <button className="custom-next">❯</button>
              </div>
              <div className="d-flex align-items-center">
                <div className="entry-title">
                  <h4>Sản phẩm mới</h4>
                  <p className="entry-description"></p>
                </div>
                <div className="view-all">
                  <Button className="view-allBtn">
                    Xem tất cả <IoIosArrowRoundForward />
                  </Button>
                </div>
              </div>
              <div className="product_row product_2 w-100 mt-3 mb-5 position-relative d-flex">
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
              </div>
              <div className="d-flex mb-5" style={{ gap: "15px" }}>
                <div className="banner ">
                  <img
                    src="https://klbtheme.com/bacola/wp-content/uploads/2021/08/bacola-banner-01.jpg"
                    className="cursor w-100"
                  />
                </div>
                <div className="banner ">
                  <img
                    src="https://klbtheme.com/bacola/wp-content/uploads/2021/08/bacola-banner-02.jpg"
                    className="cursor w-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsLetterSection d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="text-white mb-0">
                Giảm giá 50% cho đơn hàng đầu tiên
              </p>
              <h3 className="text-white">
                Tham gia bản tin của chúng tôi và nhận...
              </h3>
              <p className="text-light">
                Đăng ký nhận email của chúng tôi ngay để nhận thông tin cập nhật
                <br />
                về chương trình khuyến mãi và phiếu giảm giá.
              </p>
              <form>
                <IoMailOutline></IoMailOutline>
                <input type="text" placeholder="Nhập email của bạn" />
                <Button>Đăng ký</Button>
              </form>
            </div>
            <div className="col-md-6 coupon-img">
              <img src={coupon} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;

import Rating from "@mui/material/Rating";
import ProductZoom from "../../Components/ProductZoom";
import QuantityBox from "../../Components/QuantityBox";
import { GoHeart } from "react-icons/go";
import { Button } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import ProductItem from "../../Components/ProductItem";

const ProductDetails = () => {
  const [activeTab, setActiTab] = useState(0);
  const [value, setValue] = useState(0);

  return (
    <>
      <section className="productDetails section">
        <div className="container">
          <div className="row productDetails-content">
            <div className="col-md-4">
              <ProductZoom />
            </div>
            <div className="col-md-7">
              <div className="product-header">
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
                <div
                  className="d-flex align-items-center mb-2"
                  style={{ fontSize: "13px" }}
                >
                  <span>Khối lượng</span>
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
          <div className="card mt-5 p-4 detailsPageTabs">
            <div className="customTabs">
              <ul className="list list-inline tablist">
                <li className="list-inline-item">
                  <Button
                    className={activeTab === 0 ? "active" : ""}
                    onClick={() => setActiTab(0)}
                  >
                    Thông tin chi tiết
                  </Button>
                </li>
                <li className="list-inline-item">
                  <Button
                    className={activeTab === 1 ? "active" : ""}
                    onClick={() => setActiTab(1)}
                  >
                    Đánh giá sản phẩm
                  </Button>
                </li>
              </ul>

              <br />
              {activeTab == 0 && (
                <div className="tabContent pro-descrip">
                  <p>Rau dền là một trong những loại rau thường xuyên góp mặt trong mâm cơm của người Việt với đa dạng cách chế biến như xào, luộc, nấu canh,…
                  </p>
                  <p>Giàu niacin và canxi, loại rau ăn lá này là câu trả lời cuối cùng giúp mang lại cuộc sống khỏe mạnh cho con người.
                    </p>
                  <p>
                  Cải thiện tiêu hóa
                  </p>
                  <p>
                  Điều trị ung thư
                  </p>
                  <p>
                  Hỗ trợ giảm cân
                  </p>
                  <p>
                  Điều trị thiếu máu
                  </p>
                  <p>
                  Cải thiện chức năng thận
                  </p>
                  <p>
                  Chữa kiết lỵ
                  </p>
                </div>
              )}
              {activeTab == 1 && (
                <div className="tabContent review">
                  <div className="comments">
                    <h2>1 Bình luận</h2>
                    <uL className="commentList">
                      <li>
                        <div className="comment_container">
                          <img src="https://secure.gravatar.com/avatar/dd28514c9a8cfba334e05f21703be28e?s=60&d=mm&r=g" />
                        </div>
                        <div className="comment-text">
                          <div className="rating mb-2  ">
                            <Rating size="small" value={4} />
                          </div>
                          <p className="meta d-flex">
                            <strong className="review-author">admin</strong>
                            <span>-</span>
                            <div className="review-time">13/2/2025</div>
                          </p>
                          <div className="description">
                            <p>Today's beautiful</p>
                          </div>
                        </div>
                      </li>
                    </uL>
                    <div className="review_form_wrapper">
                <span className="comment-reply-title">Thêm đánh giá</span>
                <div className="comment-form-rating">
                      <label className="review-title">Xếp hạng của bạn *</label>
                      <div>
                      <Rating
                        size="small"
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                      </div>
                  </div>
                  <div className="comment-form-rating">
                        <label className="review-title">Đánh giá của bạn *</label>
                        <div>
                        <textarea class="form-control" placeholder="Viết đánh giá của bạn" name="review"></textarea>
                        </div>
                  </div>
                  <div className="form-submit">
                        <Button>Gửi</Button>
                  </div>
                </div>  
                  </div>
                </div>
              )}
              
            </div>
          </div>
          <div className='relate-product'>
            <div className="relate-title "><h4>Sản phẩm liên quan</h4></div>
             <div className="d-flex">
             <ProductItem/> 
             <ProductItem/> 
             <ProductItem/> 
             <ProductItem/> 
             </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;

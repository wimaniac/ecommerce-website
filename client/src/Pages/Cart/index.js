import rauden from "../../assets/rauden1.jpg";
import { Link } from "react-router-dom";
import QuantityBox from "../../Components/QuantityBox";
import { IoCloseSharp } from "react-icons/io5";
import { Button } from "@mui/material";
const Cart = () => {
  return (
    <>
      <section className="section cart-section">
        <div className="container cart-container d-flex">
          <div className="col-md-8">
            <div className="cart-wrapper">
              <div className="cart-content">
                <div className="free-progress-bar warning">
                  <div className="free-shipping-notice">
                    Thêm
                    <span className="Price-amount">100.000đ</span>
                    vào giỏ hàng để được miễn phí vận chuyển!
                  </div>
                  <div className="progress-bar">
                    <span className="process"></span>
                  </div>
                </div>
              </div>
              <table className="table-responsive cart-table">
                <thead>
                  <tr>
                    <th className="product-thumbnail">&nbsp;</th>
                    <th className="product-name">Sản phẩm</th>
                    <th className="product-price">Giá</th>
                    <th className="product-quantity">Số lượng</th>
                    <th className="product-subtotal">Tổng tiền</th>
                    <th className="product-remove">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="position-relative">
                    <td className="product-thumbnail">
                      <Link to={"/product/1"}>
                        <img src={rauden} />
                      </Link>
                    </td>
                    <td className="product-name">
                      <Link to={"/product/1"}>Rau dền</Link>
                    </td>
                    <td className="product-price">15.000đ</td>

                    <td className="product-quantity">
                      <QuantityBox />
                    </td>
                    <td className="product-subtotal">15.000đ</td>
                    <td className="product-remove">
                      <IoCloseSharp />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={6} style={{ border: "none" }}>
                      <div className="actions-wrapper d-flex">
                        <div className="coupon">
                          <input placeholder="Nhập mã giảm giá" type="text" />
                          <Button className="btn-blue">Áp dụng</Button>
                          <Button className="btn-blue remove-all">
                            Xóa tất cả
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-4">
            <div className="cart-collaterals">
              <div className="cart_totals">
                <h2>Tổng số giỏ hàng</h2>
                <table className="table-reponsive shop_table" cellspacing="0">
                  <tbody>
                    <tr className="cart-subtotal">
                      <th>Thành tiền</th>
                      <td>
                        <span className="amount">15.000đ</span>
                      </td>
                    </tr>
                    <tr className="shipping-totals ">
                      <th>Phương thức</th>
                      <td>
                        <ul className="shipping-methods">
                          <li>
                            <label>
                              Giao hàng nhanh:
                              <span className="Price-amount">30.000đ</span>
                            </label>
                            <input type="radio" name="shipping" value="fast" defaultChecked />
                          </li>
                          <li>
                            <label>
                              Giao hàng tiết kiệm:
                              <span className="Price-amount">18.000đ</span>
                            </label>
                            <input
                              type="radio"
                              name="shipping"
                              value="economy"
                            />
                          </li>
                          <li>
                            <label>
                              Giao hàng đến: <strong>HCM</strong>
                            </label>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="order-total">
                      <th>Tổng cộng</th>
                      <div className="order-total-wrapper">
                        <td>
                          <strong className="amount total-price">
                            15.000đ
                          </strong>
                        </td>
                      </div>
                    </tr>
                    <tr></tr>
                  </tbody>
                </table>
                <div className="GT-checkout">
                  <Link>
                    <Button>Tiến hành thanh toán</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Cart;
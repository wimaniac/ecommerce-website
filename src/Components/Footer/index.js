import { TbMilk } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import { RiDiscountPercentLine } from "react-icons/ri";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="topInfo row">
          <div className="col d-flex align-items-center icon-container">
            <span>
              <TbMilk />
            </span>
            <span className="icon-detail">Sản phẩm tươi mới hàng ngày</span>
          </div>
          <div className="col d-flex align-items-center icon-container">
            <span>
              <TbTruckDelivery />
            </span>
            <span className="icon-detail">Giao hàng miễn phí đơn hàng trên 200.000đ</span>
          </div>
          <div className="col d-flex align-items-center icon-container">
            <span>
              <RiDiscountPercentLine />
            </span>
            <span className="icon-detail">Giảm giá sản phẩm hàng ngày</span>
          </div>
          <div className="col d-flex align-items-center icon-container" style={{borderRight:'None'}}>
            <span>
              <RiMoneyDollarCircleLine />
            </span>
            <span className="icon-detail">Giá tốt nhất trên thị trường</span>
          </div>
        </div>
        <div className="row mt-4 linkwarp">
        <div className="col">
            <h5>Trái cây & Rau củ</h5>
            <ul>
                <li><Link to='#'>Trái cây tươi</Link></li>
                <li><Link to='#'>Rau củ tươi</Link></li>
                <li><Link to='#'>Nấm & rau gia vị</Link></li>
            </ul>
            </div>
            <div className="col">
            <h5>Thịt & hải sản</h5>
            <ul>
                <li><Link to='#'>Thịt tươi sống</Link></li>
                <li><Link to='#'>Hải sản tươi sống</Link></li>
                <li><Link to='#'>Hải sản đông lạnh</Link></li>


            </ul>
            </div>
            <div className="col">

            <h5>Đồ uống</h5>
            <ul>
                <li><Link to='#'>Nước ngọt</Link></li>
                <li><Link to='#'>Nước ép trái cây</Link></li>
                <li><Link to='#'>Sữa & các sản phẩm từ sữa</Link></li>
                <li><Link to='#'>Cà phê & trà</Link></li>
                <li><Link to='#'>Rượu & bia</Link></li>

            </ul>
            </div>
            <div className="col">

            <h5>Bánh & đồ ăn vặt</h5>
            <ul>
                <li><Link to='#'>Bánh ngọt</Link></li>
                <li><Link to='#'>Bánh quy & snack</Link></li>
                <li><Link to='#'>Kẹo & socola</Link></li>
            </ul>
            </div>
        </div>
        <div className="social-container d-flex align-items-center">
             <div><img src="https://www.aeon.com.vn/wp-content/themes/aeon/assets/img/bct.png"/></div>  
             <div className="copy-right" style={{marginLeft:'10px'}}>Copyright © AEON VIETNAM Co., Ltd </div> 
            <ul className="list list-inline social-icon">
                <li className="list-inline-item">
                    <Link to={''}>
                    <FaFacebookF/>
                    </Link>
                </li>
                <li className="list-inline-item">
                    <Link to={''}>
                    <FaTiktok/>
                    </Link>
                </li>
                <li className="list-inline-item">
                    <Link to={''}>
                    <FaInstagram/>
                    </Link>
                </li>
            </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

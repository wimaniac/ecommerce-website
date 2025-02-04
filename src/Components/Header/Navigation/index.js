import { IoMenu } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { IoStorefrontOutline } from "react-icons/io5";
import { LuBeef } from "react-icons/lu";
import { LuCakeSlice } from "react-icons/lu";
import { PiCoffeeThin } from "react-icons/pi";
import { GrContact } from "react-icons/gr";

const Navigation = () => {
  return (
    <nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-3 navPart1">
            <Button className="allCartTab">
              <span className="icon1 me-2">
                <IoMenu />
              </span>
              <span className="text">Tất cả danh mục</span>
              <span className="icon2 ms-2">
                <FaAngleDown />
              </span>
            </Button>
          </div>
          <div className="col-sm-9 navPart2 d-flex align-items-center">
            <ul className="list">
              <li className="list-inline-item">
                <Link to={"/"}><Button><IoHomeOutline/> &nbsp;Trang chủ</Button></Link>
              </li>
              <li className="list-inline-item">
                <Link to={"/"}><Button><IoStorefrontOutline/>&nbsp;Cửa hàng</Button></Link>
              </li>
              <li className="list-inline-item">
                <Link to={"/"}><Button><LuBeef/> &nbsp;Thực phẩm tươi</Button> </Link>
              </li>
              <li className="list-inline-item">
                <Link to={"/"}><Button><LuCakeSlice/> &nbsp;Tiệm bánh</Button></Link>
              </li>
              <li className="list-inline-item">
                <Link to={"/"}><Button><PiCoffeeThin/> &nbsp;Đồ uống</Button></Link>
              </li>
              <li className="list-inline-item">
                <Link to={"/"}><Button><GrContact/> &nbsp;Liên hệ</Button></Link>
              </li>
              
            </ul>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

import { IoMenu } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { LuApple } from "react-icons/lu";
import { LuBeef } from "react-icons/lu";
import { LuCoffee } from "react-icons/lu";
import { LuSnowflake } from "react-icons/lu";
import { LuCookie } from "react-icons/lu";
import { GrFormNext } from "react-icons/gr";

import { useState } from "react";
const Navigation = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleSlidebar = () => {
    setIsOpenModal(!isOpenModal);
  }
  return (
    <nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-3 navPart1">
            <div className="catWrapper">
            <Button className="allCartTab" onClick={toggleSlidebar}>
              <span className="icon1 me-2"><IoMenu /></span>
              <span className="text">Tất cả danh mục</span>
              <span className="icon2 ms-2"><FaAngleDown /></span>
            </Button>
            <div className={`slidebar ${isOpenModal ? "active" : ""}`}>
            <ul className="catagory1">
                <li className="nav-item"><Link to={"/"}><Button><LuApple/>Trái cây & rau quả<GrFormNext style={{ marginLeft: "auto", opacity: 0.9 }} size={16} /></Button> </Link>
                <div className="subMenu">
                <Link to={"/"}><Button>Trái cây tươi</Button> </Link>
                <Link to={"/"}><Button>Rau củ tươi</Button> </Link>
                </div>
                </li>
                <li className="nav-item"><Link to={"/"}><Button><LuBeef/>Thịt & hải sản</Button> </Link></li>
                <li className="nav-item"><Link to={"/"}><Button><LuCoffee/>Đồ uống<GrFormNext style={{ marginLeft: "auto", opacity: 0.9 }} size={16}/></Button> </Link>
                <div className="subMenu">
                <Link to={"/"}><Button>Cà phê</Button> </Link>
                <Link to={"/"}><Button>Sữa</Button> </Link>
                <Link to={"/"}><Button>Nước</Button> </Link>
                <Link to={"/"}><Button>Soda & nước ngọt</Button> </Link>
                <Link to={"/"}><Button>Bia & Rượu </Button> </Link>

                </div>
                
                </li>
                <li className="nav-item"><Link to={"/"}><Button><LuSnowflake/>Thực phẩm đông lạnh</Button> </Link></li>
                <li className="nav-item"><Link to={"/"}><Button><LuCookie/>Bánh quy & Snack</Button> </Link></li>
              </ul>
              <ul className="catagory2">
                <li className="nav-item"><Link to={"/"}><Button>Sản phẩm bán chạy</Button> </Link></li>
                <li className="nav-item"><Link to={"/"}><Button>Sản phẩm mới</Button> </Link></li>
              </ul>
            </div>
            </div>
          </div>
          <div className="col-sm-9 navPart2 d-flex align-items-center">
            <ul className="list">
              <li className="list-inline-item ">
                <Link to={"/"}><Button>Trang chủ</Button></Link>
              </li>
              <li className="list-inline-item">
                <Link to={"/"}><Button>Cửa hàng</Button></Link>
                <div className="subMenu">
                <Link to={"/"}><Button>Sản Phẩm 1</Button> </Link>
                <Link to={"/"}><Button>Sản Phẩm 2</Button> </Link>
                <Link to={"/"}><Button>Sản phẩm 3</Button> </Link>
                </div>
              </li>
              <li className="list-inline-item">
                <Link to={"/"}><Button>Thịt & Hải Sản</Button> </Link>
                <div className="subMenu">
                
                </div>
              </li>
              <li className="list-inline-item">
                <Link to={"/"}><Button>Tiệm bánh</Button></Link>
              
              </li>
              <li className="list-inline-item">
                <Link to={"/"}><Button>Đồ uống</Button></Link>
               
              </li>
              <li className="list-inline-item">
                <Link to={"/"}><Button>Khuyến mãi</Button></Link>
              
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

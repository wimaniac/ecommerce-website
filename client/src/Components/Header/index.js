import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CountryDropdown from "../CountryDrop";
import { FiUser } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { MyContext } from "../../App";
import { useContext } from "react";
const Header = () => {
  const context = useContext(MyContext);
  return (
    <div className="headerWrapper">
      <div className="top-strip bg-blue">
        <div className="container">
          <p className="mb-0 mt-0 text-center">
            Chúc quý khách mua hàng vui vẻ
          </p>
        </div>
      </div>
      <header className="header ">
        <div className="container">
          <div className="row">
            <div className="logoWrapper d-flex align-items-center col-sm-2">
              <Link to={"/"}>
                <img src={Logo} alt="logo" className="img-fluid" />
              </Link>
            </div>
            <div className="col-sm-10 d-flex align-items-center part2">
              {
                context.cityList.length > 0 && <CountryDropdown />
              }
              <SearchBox />

              <div className="part3 d-flex  align-items-center ml-auto">
                <Link to={'/signin'}>
                <Button className="circle mr-3">
                  <FiUser />
                </Button>
                </Link>
                <div className="ml-auto cartTab">
                  <span className="price"> 0đ</span>
                  <div className="position-relative">
                    <Button className="circle ml-2">
                      <IoBagOutline />
                    </Button>
                    <span className="count d-flex align-items-center justify-content-center">
                      0
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Navigation />
    </div>
  );
};
export default Header;

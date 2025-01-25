import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CountryDropdown from '../CountryDrop';
import { FaSearch } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";

const Header = () => {
  return (   
    <div className ="headerWrapper">
        <div className= "top-strip bg-blue">
            <div className="container"> 
                <p className ="mb-0 mt-0 text-center">
                    Chúc quý khách mua hàng vui vẻ
                </p>
            </div>
        </div>
        <header className="header">
        <div className="container">
            <div className="row">
            <div className="logoWrapper d-flex align-items-center col-sm-2">
                <Link to={'/'}>
                <img src={Logo} alt="logo" className="img-fluid"/>
                </Link>
            </div>
            <div className="col-sm-10 d-flex align-items-center part2">
                <CountryDropdown />
                <div className="searchBox ml-3 mr-3">
                <input type="text" placeholder="Tìm kiếm sản phẩm" />
                <Button>
                    <FaSearch />
                </Button>
                </div>

                <div className='part3 d-flex  align-items-center ml-auto'>
                    <Button className='circle mr-3' style={{marginLeft: '10px'}} >
                        <FiUser />
                    </Button>
                    <div className='ml-auto cartTab'>
                        <span className='price'> 0đ</span>
                        <div className='position-relative'>
                            <Button className='circle ml-2'>
                                <IoBagOutline />
                            </Button>
                            <span className='count d-flex align-items-center justify-content-center'>
                                0
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </header>

    </div>
  );
}
export default Header;
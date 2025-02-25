import Sidebar from "../../Components/Sidebar";
import { CgMenu } from "react-icons/cg";
import { HiViewGrid } from "react-icons/hi";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { Button } from "@mui/material";
import { BiSolidGrid } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa6";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState,React } from "react";
import ProductItem from '../../Components/ProductItem'
import Pagination from '@mui/material/Pagination';
const Listing = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openDropdown = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [productView, setProductView] = useState('four')
  return (
    <>
      <section className="product_Listing_page">
        <div className="container">
          <div className="productListing d-flex">
            <Sidebar></Sidebar>
            <div className="content-right">
              <div className="Showby d-flex align-items-center">
                <div className="d-flex btn-Wrapper align-items-center">
                  <Button className={productView=='one' && 'act'} onClick={() => setProductView('one')}><CgMenu />
                  </Button>
                  <Button className={productView=='two' && 'act'} onClick={() => setProductView('two')}><HiViewGrid />
                  </Button>
                  <Button className={productView=='three' && 'act'} onClick={() => setProductView('three')}><BiSolidGrid />
                  </Button>
                  <Button className={productView=='four' && 'act'} onClick={() => setProductView('four')}><TfiLayoutGrid4Alt />
                  </Button>
                </div>
                <div className="showByFillter">
                  <Button onClick={handleClick}>
                    Show
                    <FaAngleDown />
                    
                  </Button>
                  <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openDropdown}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleClose}>10</MenuItem>
                      <MenuItem onClick={handleClose}>20</MenuItem>
                      <MenuItem onClick={handleClose}>30</MenuItem>
                      <MenuItem onClick={handleClose}>40</MenuItem>
                    </Menu>
                </div>
              </div>
              <div className='ProductListing'>
                <ProductItem itemView = {productView}/>
                <ProductItem itemView = {productView}/>
                <ProductItem itemView = {productView}/>
                <ProductItem itemView = {productView}/>
                <ProductItem itemView = {productView}/>
                <ProductItem itemView = {productView}/>
                <ProductItem itemView = {productView}/>
                <ProductItem itemView = {productView}/>
              </div>
              <div className='d-flex align-items-center justify-content-center mt-5'>
              <Pagination count={10} color="primary" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Listing;

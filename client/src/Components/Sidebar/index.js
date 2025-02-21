import FormGroup from "@mui/material/FormGroup";
import { FormControlLabel, Checkbox, Button } from "@mui/material";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useState } from "react";
const Sidebar = () => {
  const [Value, setValue] = useState([10000, 100000]);
  const [Value2, setValue2] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const brands = [
    "Dalat Hasfarm",
    "An Lạc",
    "VietGAP",
    "Hữu Cơ",
    "FreshFarm",
    "Organica",
  ];
  const visibleBrands = showAll ? brands : brands.slice(0, 2); // Chỉ hiển thị 2 dòng đầu nếu chưa mở rộng

  return (
    <>
      <div className="sideBar">
        <div className="filterBox">
          <h5>DANH MỤC SẢN PHẨM</h5>
          <div className="scroll">
            <ul>
              <li>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Trái cây & rau quả"
                />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Label" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Label" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Label" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Label" />
              </li>
              <li>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Trái cây & rau quả"
                />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Label" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Label" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Label" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Label" />
              </li>
              <li>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Trái cây & rau quả"
                />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Label" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Label" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Label" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Label" />
              </li>
            </ul>
          </div>
        </div>
        <div className="filterBox filter-price">
          <h5>Lọc theo giá</h5>
          <RangeSlider
            value={Value}
            onInput={setValue}
            min={0}
            max={100000}
            step={1000}
          />
          <div className="d-flex pt-2 pb-2 priceRange">
            <span>Từ: </span>
            <span>{Value[0]}</span>
            <span style={{ margin: "0 5px" }}>-</span>
            <span style={{ textTransform: "none" }}>{Value[1]}đ</span>
          </div>
        </div>
        <div className="filterBox">
          <h5>Tình trạng sản phẩm</h5>
          <div className="scroll">
            <ul>
              <li>
                <FormControlLabel control={<Checkbox />} label="Còn hàng" />
              </li>
              <li>
                <FormControlLabel control={<Checkbox />} label="Đang sale" />
              </li>
            </ul>
          </div>
        </div>
        <div className="filterBox">
        <h5>Thương hiệu nổi bật</h5>

          <div style={{paddingLeft:'10px'}}>
          <ul>
            {visibleBrands.map((brand, index) => (
              <li key={index}>
                <FormControlLabel control={<Checkbox />} label={brand} />
              </li>
            ))}
          </ul>
          <Button onClick={() => setShowAll(!showAll)} variant="text">
            {showAll ? "Ẩn bớt" : "Xem thêm"}
          </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;

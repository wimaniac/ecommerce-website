import React, { useContext, useState, useEffect } from "react";
import removeAccents from "remove-accents";
import { MyContext } from "../../App";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { FaAngleDown } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { MdClose } from "react-icons/md";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CountryDropdown = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectTab, setselectTab] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Chọn vị trí"); // ✅ Lưu tên tỉnh/thành phố được chọn
  const context = useContext(MyContext);
  const [cityList, setcityList] = useState([]);

  useEffect(() => {
    setcityList(context.cityList);
  }, [context.cityList]);

  const selectCity = (index) => {
    setselectTab(index);
    setSelectedCity(cityList[index].name); // ✅ Cập nhật tên tỉnh/thành phố đã chọn
    setIsOpenModal(false);
  };

  const filterList = (e) => {
    const keyword = removeAccents(e.target.value.toLowerCase());

    if (keyword === "") {
      setcityList(context.cityList);
    } else {
      const filtered = context.cityList.filter((item) =>
        removeAccents(item.name.toLowerCase()).includes(keyword)
      );
      setcityList(filtered);
    }
  };

  return (
    <>
      <Button className="countryDrop" onClick={() => setIsOpenModal(true)}>
        <div className="info d-flex flex-column">
          <span className="label">Vị trí của bạn</span>
          <span className="country-name">{selectedCity}</span> {/* ✅ Hiển thị tỉnh thành đã chọn */}
        </div>
        <span className="ml-auto">
          <FaAngleDown />
        </span>
      </Button>
      <Dialog
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        className="locationDialog"
        TransitionComponent={Transition}
      >
        <h4 className="mb-0"> Chọn địa điểm giao hàng của bạn</h4>
        <p>
          Nhập địa chỉ của bạn và chúng tôi sẽ chỉ định ưu đãi cho khu vực của bạn.
        </p>
        <Button className="closeBtn" onClick={() => setIsOpenModal(false)}>
          <MdClose />
        </Button>
        <div className="searchBox" style={{ width: "100%" }}>
          <input type="text" placeholder="Tìm kiếm khu vực của bạn" onChange={filterList} />
          <Button>
            <CiSearch />
          </Button>
        </div>
        <ul className="CountryList">
          {cityList.map((item, index) => (
            <li key={index}>
              <Button
                onClick={() => selectCity(index)}
                className={`${selectTab === index ? "active" : ""}`}
              >
                <span>{item.name}</span>
              </Button>
            </li>
          ))}
        </ul>
      </Dialog>
    </>
  );
};

export default CountryDropdown;

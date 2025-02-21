
import Slider from "react-slick";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import { Navigation } from "@mui/icons-material";
import rauden1 from "../../assets/rauden1.jpg";
import rauden2 from "../../assets/rauden2.jpg";
import rauden3 from "../../assets/canhrauden.jpg";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useRef } from "react";
import { useState } from "react";
const ProductZoom =() =>{
    const [selectedIndex, setSelectedIndex] = useState(0);
    var settings2 = {
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows: false,
      };
      var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
      };
      const zoomSliderBig = useRef();
      const zoomSlider = useRef();
      const goto = (index) => {
        if (zoomSliderBig.current) {
          zoomSliderBig.current.slickGoTo(index);
        }
        if (zoomSlider.current) {
          zoomSlider.current.slickGoTo(index);
        }
        setSelectedIndex(index); // Cập nhật trạng thái ảnh đang được chọn
      };
    
    return(
        <div className="productZoom">
                <Slider
                  {...settings2}
                  className="zoomSliderBig"
                  ref={zoomSliderBig}
                >
                  <div className="item">
                    <InnerImageZoom
                      zoomType="hover"
                      zoomScale={1}
                      src={rauden1}
                    />
                  </div>
                  <div className="item">
                    <InnerImageZoom
                      zoomType="hover"
                      zoomScale={1}
                      src={rauden2}
                    />
                  </div>
                  <div className="item">
                    <InnerImageZoom
                      zoomType="hover"
                      zoomScale={1}
                      src={rauden3}
                    />
                  </div>
                </Slider>

                <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
                  <div
                    className={`item ${selectedIndex === 0 ? "active" : ""}`}
                  >
                    <img src={rauden1} onClick={() => goto(0)} />
                  </div>
                  <div
                    className={`item ${selectedIndex === 1 ? "active" : ""}`}
                  >
                    <img src={rauden2} onClick={() => goto(1)} />
                  </div>
                  <div
                    className={`item ${selectedIndex === 2 ? "active" : ""}`}
                  >
                    <img src={rauden3} onClick={() => goto(2)} />
                  </div>
                </Slider>
              </div>
    )
}
export default ProductZoom
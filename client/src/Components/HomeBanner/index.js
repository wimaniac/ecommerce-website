import React from "react";
import Slider from "react-slick";

const HomeBanner = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 600, 
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true, 
        autoplaySpeed: 3000, 
        cssEase: "linear", 
      };
      
  return (
    <>
      <div className='container'>
      <div className="banner-container">
        <div className="left-homebanner">
        
        </div>
        <div className="homeBanner">
          <Slider {...settings} className="homeBannerSlider">
            <div className="item">
              <img
                src="https://www.bigc.vn/files/omni-banner-31-07-2023-14-47-58/feb-2025-24-01-2025-10-49-44/banner-website-1486x692.jpg"
                alt="banner"
              />
            </div>
            <div className="item">
              <img
                src="https://www.bigc.vn/files/omni-banner-31-07-2023-14-47-58/feb-2025-24-01-2025-10-49-44/6-web-home-banner-1486-x-692.png"
                alt="banner"
              />
            </div>
            <div className="item">
              <img
                src="https://www.bigc.vn/files/c/2025-07-01-2025-09-48-55/c503-23-01-2025-10-27-28/c503-banner-web-1486x692.jpg"
                alt="banner"
              />
            </div>
          </Slider>
        </div>
      </div>
      </div>
    </>
  );
};
export default HomeBanner;

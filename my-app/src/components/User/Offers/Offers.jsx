import React from 'react';
import './Offers.css';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import exclusive_product from '../../Assets/exclusive_image';

const Offers = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: null,
    nextArrow: null,
  };
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCTS</p>
        <button>Check Now</button>
      </div>
      <div className="offers-right">
        <Slider {...settings}>
          {exclusive_product.map((item,i)=>{
              return <img key={i} src={item} alt="" />
            })}
        </Slider>
      </div>
    </div>
  );
};

export default Offers;
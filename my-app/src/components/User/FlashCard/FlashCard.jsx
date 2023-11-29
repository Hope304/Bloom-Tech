import React, { useEffect ,useState} from 'react';
import './FlashCard.css'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Item from '../Item/Item';
// import new_collections from '../../Assets/new_collections';
import next_icon from '../../Assets/angle-right.png';
import prev_icon from '../../Assets/angle-left.png';
import ProductService from '../../../services/product.service';
// import all_product from '../../Assets/all_product';
import { useData } from '../../../Context/DataContext';
import { Link } from 'react-router-dom';
const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <img src={next_icon} alt="" />
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <img src={prev_icon} alt="" />
      </button>
    </div>
  )
}

const FlashCard = () => {
  const {data} = useData();
  const flashSaleDienThoaiData = [];
  const flashSaleLapTopData = [];
  if (data) {
    data.forEach((e) => {
      if (e.promotion && e.promotion.name === 'Sale' && e.type==="Điện Thoại") {
        flashSaleDienThoaiData.push(e);
      }
      else if(e.promotion && e.promotion.name === 'Sale' && e.type==="Laptop") {
        flashSaleLapTopData.push(e);
      }
    });
  }
  const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      autoplay: true,
      autoplaySpeed: 2000,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]    
  }
  return (
    <div className='flashcard'>
    <div className="flashcard-head">
      <h1>Flash Sale</h1> 
      <hr/>
    </div>
      <Link to='/telephone' className='button-17'>Điện Thoại</Link>
      <div className='flashcard-item'>
      <Slider {...settings}>
        {flashSaleDienThoaiData && flashSaleDienThoaiData.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={`data:image/jpeg;base64,${item.imageData}`} price={item.price} discount={item.promotion} />
        ))}
      </Slider>
      <Link to='/laptop' className='button-17'>Laptop</Link>
      </div>
      <div className='flashcard-item'>
      <Slider {...settings}>
        {flashSaleLapTopData && flashSaleLapTopData.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={`data:image/jpeg;base64,${item.imageData}`} price={item.price} discount={item.promotion} />
        ))}
      </Slider>
      </div>
    </div>
  );
};

export default FlashCard;
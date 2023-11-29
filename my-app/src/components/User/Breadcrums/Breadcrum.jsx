import React from 'react';
import './Breadcrum.css'
import arr_icon from '../../Assets/breadcrum_arrow.png'
const Breadcrum = (props) => {
  const {product} = props;
  console.log(product);
  return (
    <>
      <div className='breadcrum container'>
        HOME <img src={arr_icon} alt=""/> SHOP <img src={arr_icon} alt="" /> {product.name}
      </div>
    </>
  );
};

export default Breadcrum;
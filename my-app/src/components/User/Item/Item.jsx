import React from 'react';
import './Item.css'
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
const Item = (props) => {
  console.log(props);
  return (
    <Link to={`/product/${props.id}`}>
      <div className='item' >
        <img src={props.image} alt="" />
        <p>{props.name}</p>
          {props.discount && props.discount.discount !== undefined ? (
              props.discount.discount !== 0 ? (
              <div className="item-prices">
                <div className="item-price-new">
                  <CurrencyFormat
                    value={props.price * (100 - props.discount.discount) / 100}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={' VND'}
                  />
                </div>
                <div className="item-price-old">
                  {props.price}VND
                </div>
              </div>
                
              ) : (
                <div className="item-prices">
                  <div className="item-price-new">
                    <CurrencyFormat
                      value={props.price}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' VND'}
                    />
                  </div>
                </div>
              )
            ) : (
              <span>No discount available</span>
            )}
      </div>
    </Link>
  );
};

export default Item;
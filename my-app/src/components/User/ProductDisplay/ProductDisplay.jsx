import React, { useContext,useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductDisplay.css'
import star_icon from "../../Assets/star_icon.png"
import star_dull_icon from "../../Assets/star_dull_icon.png"
import { ShopContext } from '../../../Context/ShopContext';
import { UserContext } from '../../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
const ProductDisplay = (props) => {
  const {product} = props;
  const {addToCart} = useContext(ShopContext);
  const {setUrl} = useContext(UserContext);
  const navigate = useNavigate();
  const showToastMessage = () => {
    toast.success("Đã thêm vào giỏ hàng !", {
      position: toast.POSITION.TOP_RIGHT,
    });
    
  };
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);

    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <img src={`data:image/jpeg;base64,${product.imageData}`} alt="" />
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className='productdisplay-rate-start'>
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <span>(100)</span>
        </div>
        {product.promotion && product.promotion.discount !== undefined ? (
              product.promotion.discount !== 0 ? (
              <div className="productdisplay-pice">
                <div className="productdisplay-pice-new">
                  <CurrencyFormat
                    value={product.price * (100 - product.promotion.discount) / 100}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={' VND'}
                  />
                </div>
                <div className="productdisplay-pice-old">
                  {product.price}VND
                </div>
              </div>
                
              ) : (
                <div className="productdisplay-pice">
                  <div className="productdisplay-pice-new">
                    <CurrencyFormat
                      value={product.price}
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
        <div className="productdisplay-quantity">
          <button className='productdisplay-button' onClick={handleIncrease}>+</button>
          <input
            type="number"
            id="quantityInput"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
          <button className='productdisplay-button' onClick={handleDecrease}>-</button>

        </div>
        <button onClick={()=>{
          if(localStorage.getItem("Role") === 'Public'){
            navigate('/login'); // Change this to the correct route
            setUrl(()=>`/product/${product.id}`);
          }
          else {
            addToCart({
              productId: product.id,
              quantity: quantity,
            });
            showToastMessage();
          }
          }}>ADD TO CARD</button>
      </div>
    </div>
  );
};

export default ProductDisplay;
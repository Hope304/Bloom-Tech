import React, { useContext, useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CartItems.css'
import { ShopContext } from '../../../Context/ShopContext';
import remove_icon from '../../Assets/cart_cross_icon.png'
import CurrencyFormat from 'react-currency-format';

const itemsPerPage = 4;

const CartItems = () => {
  const {removeFromCart,cartItems,totalCost,order,removeAllFromCart} = useContext(ShopContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =cartItems ? cartItems.slice(indexOfFirstItem, indexOfLastItem) : [];
  useEffect(() => {
    // Calculate total pages whenever cartItems changes
    setTotalPages(currentItems.length > 0 ? Math.ceil(cartItems.length / itemsPerPage) : 1);
  }, [currentItems]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const showToastMessage = () => {
    toast.success("Đã đăng ký mua hàng !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastMessageDelete = () => {
    toast.warning("Đã xóa đơn hàng !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr/>
      {currentItems.length > 0 ? (
        currentItems.map((e) => (
          <div key={e.product.id} className="cartitems-format cartitems-format-main">
            {e.product ? (
              <>
                <img src={`data:image/jpeg;base64,${e.product.imageData}`} alt="" className='cartitems-product-icon'/>
                <p>{e.product.name}</p>
                <p><CurrencyFormat
                    value={e.product.price}
                    displayType={'text'}
                    thousandSeparator={true}
                  />VND</p>
                <button className='cartitems-quantity'>{e.quantity}</button>
                <p><CurrencyFormat
                    value={e.product.price * e.quantity}
                    displayType={'text'}
                    thousandSeparator={true}
                  />VND</p>
                
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => {removeFromCart(e.product.id);showToastMessageDelete()}} alt="" />
              </>
            ) : (
              <p>Loading...</p>
            )}
            <hr />
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div className="pagination">
        <button
          className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt; Previous
        </button>
        <span className="pagination-current-page">{currentPage}</span>
        <button
          className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </button>
      </div>
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subatal</p>
              <p><CurrencyFormat
                    value={totalCost}
                    displayType={'text'}
                    thousandSeparator={true}
                  />VND</p>
            </div>
            <hr />
            <div className='cartitems-total-item'>
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className='cartitems-total-item'>
              <h3>Total</h3>
              <h3><CurrencyFormat
                    value={totalCost}
                    displayType={'text'}
                    thousandSeparator={true}
                  />VND</h3>
            </div>
          </div>
            <button onClick={() => {showToastMessage();order();removeAllFromCart()}}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems_promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='promo code'/>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
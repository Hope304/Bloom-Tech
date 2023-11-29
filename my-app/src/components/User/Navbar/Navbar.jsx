import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../../Assets/logoHome.png';
import cart_icon from '../../Assets/cart_icon.png';
import user_icon from '../../Assets/user_icon.png';
import logout_icon from '../../Assets/logout_icon.png';
import shipping_icon from '../../Assets/shipping_ico.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../../Context/ShopContext';
import { UserContext } from '../../../Context/UserContext';
import AuthService from '../../../services/auth.service';
const Navbar = () => {
  const [menu,setMenu] = useState("home");
  const {totalCartItems} = useContext(ShopContext);
  const {logOut} = useContext(UserContext);
  const currentUser = AuthService.getCurrentUser();
  const handleScrollTo = (id) => {
    const Section = document.getElementById(id);

    if (Section) {
      Section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className='navbar container'>
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <ul className="nav-menu">
        <li onClick={()=> {setMenu("home")}}><Link to='/home'>Home{menu==="home" ? <hr/>:<></>}</Link> </li>
        {/* <li onClick={()=> {setMenu("sale")}}> <Link to='/sale'>Sale{menu==="sale" ? <hr/>:<></>}</Link></li> */}
        <li onClick={() => { setMenu("sale"); handleScrollTo("sale"); }}>
          <Link to='/home#sale'>Sale{menu === "sale" ? <hr /> : <></>}</Link>
        </li>
        <li onClick={() => { setMenu("new"); handleScrollTo("new"); }}>
          <Link to='/home#new'>New{menu === "new" ? <hr /> : <></>}</Link>
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to='/ship'><img src={shipping_icon} alt="" /></Link>
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{totalCartItems}</div>
        {!currentUser?
          <Link to='/login'><button>Login</button></Link>
          :
            <div className="nav-logout-cart">
              <Link to='/profile'><img src={user_icon} alt="" /></Link>
              <a className='nav-logout-button' href="/home" onClick={logOut}><img src={logout_icon} alt="" /></a>
            </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
import React, { useContext} from 'react';
import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import logo_home from "../../Assets/logoHome.png"
import { UserContext } from '../../../Context/UserContext';
const Sidebar = () => {
  const {currentUser,logOut} = useContext(UserContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <img className="logo" src={logo_home} alt="" />
        </Link>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admin">
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/admin/product" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to='/admin/order'>
            <li>
              <CreditCardIcon className="icon" />
              <span>Orders</span>
            </li>

          </Link>
        </ul>
      </div>
      <div className="bottom">
        <Link to="/" 
        onClick={logOut}
        >
          <ExitToAppIcon className="icon" />
          </Link>
      </div>
    </div>
  );
};

export default Sidebar;

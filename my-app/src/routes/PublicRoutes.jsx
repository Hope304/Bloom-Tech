import { Routes, Route } from 'react-router-dom';
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Profile from "../pages/public/Profile";
import Home from "../pages/public/Home";
import Cart from "../common/Cart/Cart";
import Ship from "../components/User/Ship/Ship";
import Product from "../pages/public/Product";
import Footer from "../common/Footer/Footer";
import Header from "../common/Header/Header";
import { ToastContainer } from 'react-toastify';
import ScrollToTopOnMount from '../common/ScrollToTopOnMount';
import FlashCard from '../components/User/FlashCard/FlashCard';
import Telephone from '../components/User/Telephone/Telephone';
import Laptop from '../components/User/Laptop/Laptop';

const Layout = ({ children }) => (
  <>
    <ScrollToTopOnMount/>
    <Header />
    <ToastContainer />
    {children}
    <Footer />
  </>
);

const PublicRoutes = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path='/telephone' element={<Telephone/>}/>
          <Route path='/laptop' element={<Laptop/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/ship' element={<Ship/>}/>
        </Routes>
      </Layout>
    </div>
  );
};

export default PublicRoutes;
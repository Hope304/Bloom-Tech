import React from 'react';
import './admin.css';
import Sidebar from '../../components/Admin/sidebar/Sidebar';
import {  Routes, Route, Router  } from "react-router-dom";
import New from '../../components/Admin/new/New';
import ProductDatatable from '../../components/Admin/Product/ProductDatatable';
import { ToastContainer} from 'react-toastify';
import OrderDatable from '../../components/Admin/Order/OrderDatatable';
import ViewProduct from '../../components/Admin/viewProduct/ViewProduct';
const AdminPage = ({children}) => {
  return (
    <div className="home">
      <Sidebar/>
    <div className="homeContainer" >
    <ToastContainer />
    <Routes>
        <Route path='/product/new' element={<New/>}/>
        <Route path='/product' element={<ProductDatatable/>}/>
        <Route path='/order' element={<OrderDatable/>}/>
        <Route path='/product/view' element={<ViewProduct/>}>
          <Route path=':id' element={<ViewProduct/>}/>
        </Route>
        {/* <Route path="/admin/product/view/:id" component={ViewProduct} /> */}

    </Routes>
    </div>
  </div>
  );
};

export default AdminPage;
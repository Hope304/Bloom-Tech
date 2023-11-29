import React from 'react';

import {  Routes, Route, Router  } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
// import OrderDatatable from '../components/Admin/Order/OrderDatatable';
// import ProductDatatable from '../components/Admin/Product/ProductDatatable';
import Sidebar from '../components/Admin/sidebar/Sidebar';
import New from '../components/Admin/new/New';
import AdminPage from '../pages/Admin/AdminPage';
import ProductDatatable from '../components/Admin/Product/ProductDatatable';
import ViewProduct from '../components/Admin/viewProduct/ViewProduct';
const AdminRouter = () => {
  return (
    <AdminPage>
      <Routes>
        <Route path='admin/new' element={<New/>}/>
        <Route path='admin/product' element={<ProductDatatable/>}/>
        <Route path='admin/product/view' element={<ViewProduct/>}/>
      </Routes>
    </AdminPage>
  );
};

export default AdminRouter;
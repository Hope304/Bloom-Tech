import React, { useState, useEffect, useContext } from "react";
import { useLocation,Router,Route, Routes } from "react-router-dom";
import MainRoutes from './routes/PublicRoutes';

import './styles/style.css'
import ProductService from "./services/product.service";
import AdminRouter from "./routes/AdminRouter";
import { useData } from './Context/DataContext';



const App = () => {
  const {data, updateData } = useData();
  const {pathname} = useLocation();
  useEffect(()=>{
    window.scrollTo(0,0);
  },[pathname])
  const role = localStorage.getItem("Role");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductService.productGetAll();
        // Lấy dữ liệu từ phản hồi và cập nhật context
        updateData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // Gọi hàm fetchData khi component được mount
    fetchData();
  }, []); 
  console.log(data);
  return (
    <div>
        <Routes>
            {role === 'ROLE_ADMIN' ? 
              <Route path='/admin/*' element={<AdminRouter/>}/>
              :
              <Route path='/*' element={<MainRoutes/>}/>
            }
        </Routes>
      
    </div>
  );
};


export default App;
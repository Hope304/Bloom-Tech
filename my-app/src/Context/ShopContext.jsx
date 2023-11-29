import React, {useEffect, createContext, useState } from "react";
// import all_product from "../components/Assets/all_product"
import CartService from "../services/cart.service";
import OrderService from "../services/order.service";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [totalCartItems,setTotalCartItems] = useState(0);
  const fetchData = async () => {
    try {
      const response = await CartService.cartGet();
      // Lấy dữ liệu từ phản hồi và cập nhật context
      setCartItems(response.data.cartItems);
      setTotalCost(response.data.totalCost);
      if (response.data.cartItems) setTotalCartItems(response.data.cartItems.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchDataAndOrder = async () => {
      try {
        // Await fetchData
        await fetchData();
  
        // Await getOrder
        await getOrder();

        await getOrderInfo();
      } catch (error) {
        console.error("Error in useEffect:", error.message);
      }
    };
  
    // Call the asynchronous function
    fetchDataAndOrder();
  }, []);
  
  // console.log(cartItems)
  const addToCart = async (data) => {
    try {
      await CartService.cartAdd(data);
      fetchData();
      console.log("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };


  const removeFromCart = async (productId) =>{
    try {
      await CartService.cartDelete(productId);
      console.log("Product deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  }
  const removeAllFromCart = async () =>{
    try {
      await CartService.cartDeleteAll();
      console.log("Product deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  }

  const order = async () =>{
    try {
      await OrderService.orderAdd();
      console.log("Product order successfully!");
      getOrder();
      getOrderInfo();
    } catch (error) {
      console.error("Error ordering product:", error.message);
    }
  }
  const getOrder = async () =>{
    try {
      const response = await OrderService.orderGet();
      setOrderItems(response.data);
      console.log("Product Getorder successfully!");
    } catch (error) {
      console.error("Error getting product:", error.message);
    }
  }
  const getOrderInfo = async () =>{
    try {
      const response = await OrderService.orderGetAll();
      setOrderInfo(response.data);
      console.log("Product GetorderInfo successfully!");
    } catch (error) {
      console.error("Error gettingInfo product:", error.message);
    }
  }
  const updateOrder = async (orderId,data) =>{
    try {
      await OrderService.orderUpdate(orderId,data);
      console.log("Product update successfully!");
    } catch (error) {
      console.error("Error updateing product:", error.message);
    }
  }

  
  const contextValue = {cartItems,totalCartItems,addToCart,removeFromCart,totalCost,order,orderItems,removeAllFromCart,orderInfo,updateOrder};
  return (
    <ShopContext.Provider value={contextValue} >
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider ;
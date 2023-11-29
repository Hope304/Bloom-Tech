import axios from "axios";

const API_URL = "http://localhost:3000/api/cart";
const token = localStorage.getItem('token');
if (token) {
  // Gửi token trong header của mọi yêu cầu tương lai
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
const cartAdd = (data) => {
  return axios.post(API_URL + "/add",data);
};


const cartGet = () => {
  return axios.get(API_URL + "/get",{
  });
};


const cartUpdate = (cartItemId,data) => {
  return axios.put(API_URL + `/update/${cartItemId}`,data);
};
const cartDelete = (cartItemId) => {
  return axios.delete(API_URL + `/delete/${cartItemId}`);
};
const cartDeleteAll = () => {
  return axios.delete(API_URL + "/deleteAll");
};

const CartService = {
  cartAdd,
  cartGet,
  cartUpdate,
  cartDelete,
  cartDeleteAll
}

export default CartService;
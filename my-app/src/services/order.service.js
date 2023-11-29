import axios from "axios";

const API_URL = "http://localhost:3000/api/order/";

const token = localStorage.getItem('token');
if (token) {
  // Gửi token trong header của mọi yêu cầu tương lai
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const orderAdd = () => {
  return axios.post(API_URL + "add");
};
const orderGet = () => {
  return axios.get(API_URL + "get");
};
const orderGetAll = () => {
  return axios.get(API_URL + "getAll");
};
const orderUpdate = (orderId,data) => {
  return axios.put(API_URL + `update/${orderId}`,data);
};


const OrderService = {
  orderAdd,
  orderGet,
  orderUpdate,
  orderGetAll
}
export default OrderService;
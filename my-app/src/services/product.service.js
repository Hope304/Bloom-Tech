import axios from "axios";

const API_URL = "http://localhost:3000/api/product";


const productAdd = (data) => {
  return axios.post(API_URL + "/add",data);
};

const productGetAll = () => {
  return axios.get(API_URL + "/" );
};
const productGet = (productId ) => {
  return axios.get(API_URL + `/get/${productId}`);
};
const productUpdate = (data) => {
  return axios.put(API_URL + `/update`,data );
};
const productDelete = (productId) => {
  return axios.delete(API_URL + `/delete/${productId}`);
};

const ProductService =  {
  productAdd,
  productGetAll,
  productGet,
  productUpdate,
  productDelete
}
export default ProductService;
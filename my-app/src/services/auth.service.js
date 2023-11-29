import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const register = (data) => {
  return axios.post(API_URL + "signup",data);
};

const login = (data) => {
  return axios
    .post(API_URL + "signin", data)
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};


const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import AuthService from "../../services/auth.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import IconEyeClose from "../../components/User/icon/IconEyeClose";
import IconEyeOpen from "../../components/User/icon/IconEyeOpen";
import CartService from "../../services/cart.service";


const Login = () => {
  const schema = yup.object().shape({
    username: yup.string().required("Please enter your username."),
    password: yup.string().required("Please enter your password."),
  });

  const [isShowPassword,setIsShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const {getCart} = useContext(ShopContext);
  const navigate = useNavigate();
  
  const {register , handleSubmit, formState} = useForm({ 
    mode:"onChange",
    resolver: yupResolver(schema),}
    );
    const {isSubmitting,errors} = formState;
  const handleLogin = async (data) => {
    setMessage('');
    try {
      const response = await AuthService.login(data);
      if (response.roles) {
        localStorage.setItem("Role", response.roles[0]);
        if (response.roles[0] === 'ROLE_ADMIN') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
        window.location.reload();
      } else {
        const resMessage = response.data?.message || 'Đăng nhập không thành công';
        setMessage(resMessage);
      }
    } catch (error) {
      const resMessage = error.response?.data?.message || error.message || error.toString();
      setMessage(resMessage);
    }
  };

  return (
    <div className="container">
    <div className="box">
    <img srcSet="/logo.png 2x" alt="bloomTech-shoppin" className='logo-form'/>
      <form onSubmit={handleSubmit(handleLogin)}  className="form">
          <div>
          <div className="fied">
          <span className="text">Username</span>
          <input 
            type="text"
            name="username"
            placeholder="Username"
            {...register("username")}
          />
          <div className="error_message">{errors.username?.message}</div>
        </div>
        <div className="fied">
          <span className="text">Password</span>
          <div className="fied-password">
            <input type={isShowPassword === true ? "text" : "password"}
            placeholder="Password..."
            {...register("password")}
            />
            <div className="input-icon">
              {!isShowPassword? <IconEyeClose  
                  onClick={() => setIsShowPassword(true)}
                  ></IconEyeClose> :
                  <IconEyeOpen  
                  onClick={() => setIsShowPassword(false)}
                  ></IconEyeOpen>}
            </div>
          </div>
          <div className="error_message">{errors.password?.message}</div>
        </div>
        <button
        type="submit"
        className={`button-form disabled ${isSubmitting? "active": ""}`}
        disabled={isSubmitting}
      >
        {isSubmitting && <img srcSet="/loading.png 20x" className="icon-button" />}
        <span className={`text-button ${isSubmitting ? "isLoading":""}`}>LogIn</span>
      </button>
      <div className="have-account" >
        <p>Don’t you have an account? </p>
        <Link to='/Register'>Sign up</Link>
      </div>
      </div>
          <p className="error_message">{message}</p>
      </form>
    </div>

  </div>
  );
};

export default Login;
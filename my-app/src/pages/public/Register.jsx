import React, { useState } from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import  IconEyeOpen from '../../components/User/icon/IconEyeOpen';
import IconEyeClose  from '../../components/User/icon/IconEyeClose';
import AuthService from "../../services/auth.service";
import * as yup from 'yup';
import { Link } from "react-router-dom";



export const Register = (props) => {
  const [isShowPassword,setIsShowPassword] = useState(false);
  const [message,setMessage] = useState("");

  const [successful,setSuccessful] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().min(3).max(20).required("Please enter your username."),
    email: yup.string().email("Please enter valid email address.").required("Please enter your email."),
    password: yup.string().min(6).max(40).required("Please enter your password."),
    confirmPassword: yup.string().oneOf([yup.ref('password'),null],'Password must match').required("required"),
  });
  const {register, handleSubmit , formState} = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const {isSubmitting,errors,isValid}  = formState;
  
  const handleRegister = async (data) => {
    try{
      if(!isValid) return;
      let response = await AuthService.register(data);
      setMessage(response.data.message);
      setSuccessful(true);
    }catch(error){
      const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessful(false);
    }

  }
  return (
    <div className="container">
      <div className="box">
      <img srcSet="/logo.png 2x" alt="bloomTech-shoppin" className='logo-form'/>
        <form onSubmit={handleSubmit(handleRegister)}  className="form">
          {!successful && (
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
            <span className="text">Email</span>
            <input 
              type="email" 
              placeholder="Email..."
              {...register("email")}

            />
            <div className="error_message">{errors.email?.message}</div>
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
          <div className="fied">
          <span className="text">Confirm Password</span>
            <div className="fied-password">
              <input type={isShowPassword === true ? "text" : "password"}
              placeholder="Password..."
              {...register("confirmPassword")}
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
            <div className="error_message">{errors.confirmPassword?.message}</div>
          </div>
          <button
          type="submit"
          className={`button-form disabled ${isSubmitting? "active": ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting && <img srcSet="/loading.png 20x" className="icon-button" />}
          <span className={`text-button ${isSubmitting ? "isLoading":""}`}>SignUp</span>
        </button>
        </div>
        )}
        <div className="have-account" >
          <p>Already have an account? </p>
          <Link Link to='/Login'>Log in</Link>
        </div>
        {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </form>
      </div>

    </div>
  );
};

export default Register;


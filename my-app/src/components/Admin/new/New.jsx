import React from 'react';
import { useForm } from 'react-hook-form';
import "./new.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import ProductService from "../../../services/product.service";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { toast } from 'react-toastify';

const New = () => {
  const [file, setFile] = useState("");
  const schema = yup.object().shape({
    name: yup.string().required("Please enter your name."),
    price: yup.string().required("Please enter your price."),
    type: yup.string().required("Please enter your type."),
    brand: yup.string().required("Please enter your type."),
    description: yup.string().required("Please enter your description."),
  });
  const showToastMessage = () => {
    toast.success("Đã cập nhât hàng thành công !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const {register , handleSubmit, reset,setValue, formState} = useForm({
    resolver: yupResolver(schema)}
  );
  const {isValid,errors} = formState;
  const handleLogin = async (data) => {
    try {
      // Kiểm tra xem tất cả các trường đã được điền vào
      for (const key in data) {
        if (!data[key]) {
          throw new Error(`Please fill in all fields. ${key} is missing.`);
        }
      }

      // Kiểm tra xem đã chọn file ảnh hay chưa
      if (!file) {
        throw new Error("Please select an image.");
      }

      const formData = new FormData();
      formData.append('image', file);

      for (const key in data) {
        formData.append(key, data[key]);
      }
      // Gửi dữ liệu đến API
      showToastMessage();
      await ProductService.productAdd(formData);

      // Đặt lại form và giá trị file
      reset();
      setFile("");
      console.log("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  return (
      <div className='new'>
        <div className="top">
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={file instanceof Blob ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}

              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit(handleLogin)} >
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  {...register('file')}
                  onChange={(e) => {
                  setFile(e.target.files[0]);
                  setValue('file', e.target.files[0]);
                }}
                  style={{ display: "none" }}
                />
              </div>

                <div className="formInput">
                  <label className="text">Name</label>
                  <input 
                    type="text"
                    name="name"
                    placeholder="Name"
                    {...register("name")}
                  />
                  <div className="error_message">{errors.name?.message}</div>
                </div>
                <div className="formInput">
                  <label className="text">Price</label>
                  <input 
                    type="text"
                    name="price"
                    placeholder="Price"
                    {...register("price")}
                  />
                  <div className="error_message">{errors.price?.message}</div>
                </div>
                <div className="formInput">
                  <label className="text">Type</label>
                  <input 
                    type="text"
                    name="type"
                    placeholder="Type"
                    {...register("type")}
                  />
                  <div className="error_message">{errors.type?.message}</div>
                </div>
                <div className="formInput">
                  <label className="text">Brand</label>
                  <input 
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    {...register("brand")}
                  />
                  <div className="error_message">{errors.type?.message}</div>
                </div>
                {/* <div className="formInput">
                <label>
                  Promotion
                  <select name="promotion">
                    <option value="1">New</option>
                    <option value="2">Sale</option>
                    <option value="e">None</option>
                  </select>
                </label>
                </div> */}
                <div className="formInput description">
                  <label className="text">Description</label>
                  <textarea 
                    type="text"
                    name="description"
                    placeholder="Description"
                    {...register("description")}
                  />
                  <div className="error_message">{errors.description?.message}</div>
                </div>
                <div className='form-button' >
                  <button className='form-button'>Send</button>
                </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default New;

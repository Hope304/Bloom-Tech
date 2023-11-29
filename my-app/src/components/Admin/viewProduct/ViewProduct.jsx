import React ,{useEffect} from 'react';
import { useForm } from 'react-hook-form';
import "./ViewProduct.css";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useLocation} from 'react-router-dom';
import ProductService from "../../../services/product.service";

const ViewProduct = () => {
  const [file, setFile] = useState("");
  const location = useLocation();
  const product = location.state?.product;
  const schema = yup.object().shape({
    name: yup.string().required("Please enter your name."),
    price: yup.string().required("Please enter your price."),
    type: yup.string().required("Please enter your type."),
    description: yup.string().required("Please enter your description."),
  });
  const showToastMessage = () => {
    toast.success("Đã cập nhât hàng thành công !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const {register , handleSubmit,setValue, formState} = useForm({
    resolver: yupResolver(schema)}
  );
  const {errors} = formState;
  useEffect(() => {
    // Set form values after the component has rendered
    for (const key in product) {
      setValue(key, product[key]);
      setFile(product.imageData);
    }
    setValue('discount',product.promotion.id);
  }, [product, setValue]);
  const handleLogin = async (data) => {
    try {
      // Kiểm tra xem tất cả các trường đã được điền vào
      for (const key in data) {
        if (!data[key]) {
          throw new Error(`Please fill in all fields. ${key} is missing.`);
        }
      }
      const formData = new FormData();
      formData.append('id',data.id);
      formData.append('name',data.name);
      formData.append('description',data.description);
      formData.append('discount', parseInt(data.discount));
      formData.append('price',data.price);
      formData.append('type',data.type);
      formData.append('brand', data.brand);
      showToastMessage();
      await ProductService.productUpdate(formData);
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
              src={file ? (file instanceof File ? URL.createObjectURL(file) : `data:image/jpeg;base64,${file}`) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt=""
            />
          </div>
          <div className="right">
            <form  onSubmit={handleSubmit(handleLogin)}>
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
                <div className="formInput">
                <label htmlFor="discount">Promotion</label>
                  <select id="discount" {...register('discount')}>
                    <option value="1">New</option>
                    <option value="2">Sale</option>
                    <option value="3">None</option>
                  </select>
                </div>
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
                  <button className='form-button'>Update</button>
                </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default ViewProduct;

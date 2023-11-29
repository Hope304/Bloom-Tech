import React, { useContext, useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import Breadcrum from '../../components/User/Breadcrums/Breadcrum';
import ProductDisplay from '../../components/User/ProductDisplay/ProductDisplay';
import DescriptionBox from '../../components/User/DescriptionBox/DescriptionBox';
import RelatedProducts from '../../components/User/RelatedProducts/RelatedProducts'
import { useData } from '../../Context/DataContext';
const Product = () => {
  const { data} = useData();
  const {productId} = useParams();
  const product = data ? data.find((e) => e.id === Number(productId)) : null;
  console.log(data);
  return (
    <div>
      {product ? (
      <>
        <Breadcrum product={product} />
        <ProductDisplay product={product} />
        <DescriptionBox product={product} />
        <RelatedProducts product={product} />
      </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Product;
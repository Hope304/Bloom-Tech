import React from 'react';
import './RelatedProducts.css'
import data_product from '../../Assets/data'
import Item from '../Item/Item';
import { useData } from '../../../Context/DataContext';
const RelatedProducts = (props) => {
  const { data} = useData();
  const relatedData = [];
  if (data) {
    data.forEach((e) => {
      if (e.brand === props.product.brand && e.type=== props.product.type) {
        relatedData.push(e);
      }
    });
  }
  return (
    <div className='relatedproducts container'>
      <h1>Telated Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedData && relatedData.slice(0, 4).map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={`data:image/jpeg;base64,${item.imageData}`} price={item.price} discount={item.promotion} />
        ))}

      </div>
    </div>
  );
};

export default RelatedProducts;
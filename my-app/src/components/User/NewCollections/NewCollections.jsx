import React from 'react';
import './NewCollections.css'
import { useData } from '../../../Context/DataContext';
import Item from '../Item/Item';
const NewCollections = () => {
  const {data} = useData();
  const newData = [];
  if (data) {
    data.forEach((e) => {
      if (e.promotion && e.promotion.name === 'New') {
        newData.push(e);
      }
    });
  }
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr/>
      <div className="collections">
        {newData && newData.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={`data:image/jpeg;base64,${item.imageData}`} price={item.price} discount={item.promotion} />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
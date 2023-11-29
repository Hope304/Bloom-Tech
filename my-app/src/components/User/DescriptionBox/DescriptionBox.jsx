import React, {useState} from 'react';
import './DescriptionBox.css'
const DescriptionBox = (props) => {
  const [activeTab, setActiveTab] = useState('description');
  const {product} = props;
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
      <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
          <div
            className={`descriptionbox-nav-box ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => handleTabClick('description')}
          >
            Description
          </div>
          <div
            className={`descriptionbox-nav-box ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => handleTabClick('reviews')}
          >
            Reviews
          </div>
        </div>
        <div className="descriptionbox-des">
          {activeTab === 'description' && (
            <p>{product.description}</p>
          )}
          {activeTab === 'reviews' && (
            // Hiển thị dữ liệu đánh giá ở đây
            <p>Reviews content goes here</p>
          )}
        </div>
      </div>
  );
};

export default DescriptionBox;
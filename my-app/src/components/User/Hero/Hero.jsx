import React from 'react';
import './Hero.css';
import hand_image from '../../Assets/hand_image.png';
import arrow_right from '../../Assets/arrow-right.png'
import hero_icon1 from '../../Assets/hero-icon1.png'
import hero_icon2 from '../../Assets/hero-icon2.png'
const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>Buy your dream phone</h2>
        <div>
            <p>50%Off</p>
            <span>For First Shopping</span>
        </div>
        <div className="hero-visit-btn">
          <div>Visit Collection</div>
          <img src={arrow_right} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img className='hero-icon1' src={hero_icon1} alt="" />
        <img className='hero-icon2' src={hero_icon2} alt="" />
        <div className="hero-rectangle"><img src={hand_image} alt="" /></div>
      </div>
    </div>
  );
};

export default Hero;